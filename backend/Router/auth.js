const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const userModel = require("../Models/user");
const { env, hasMailConfig } = require("../config/env");

const auth = express.Router();

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL,
      pass: env.PASSWORD,
    },
  });

const verifyUser = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword ? user : null;
  } catch (error) {
    console.error("Credential verification failed:", error.message);
    return null;
  }
};

auth.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "USER ALREADY EXISTS",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      message: "REGISTRATION SUCCESSFUL",
      user: { name, email },
    });

    if (!hasMailConfig()) {
      console.warn("Welcome email skipped because EMAIL/PASSWORD are not configured.");
      return;
    }

    const transporter = createTransporter();
    const mailOptions = {
      from: env.EMAIL,
      to: email,
      subject: "Welcome to StreamSpace",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <h1 style="color: #333;">Welcome to StreamSpace</h1>
          <p style="color: #555;">Hello ${name},</p>
          <p style="color: #555;">We are excited to have you as a new member of our community. Thank you for joining.</p>
          <p style="color: #555;">Feel free to explore our platform and start sharing your videos with the world.</p>
          <p style="color: #555;">If you have any questions or need assistance, contact us any time.</p>
          <p style="color: #555;">Best regards,</p>
          <p style="color: #555;">Team StreamSpace</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Welcome email failed:", error.message);
        return;
      }

      console.log(`Welcome email sent: ${info.response}`);
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

auth.post("/login", async (req, res) => {
  try {
    const { email1, password1 } = req.body;

    const user = await userModel.findOne({ email: email1 });
    if (!user) {
      return res.status(404).json({
        message: "USER DOESN'T EXIST",
      });
    }

    const checkPassword = await bcrypt.compare(password1, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "INVALID CREDENTIALS",
      });
    }

    return res.status(200).json({
      message: "LOGIN SUCCESSFUL",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

auth.post("/resetlink", async (req, res) => {
  try {
    if (!hasMailConfig()) {
      return res.status(503).json({
        message: "Email service is not configured on this server",
      });
    }

    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "USER DOESN'T EXIST",
      });
    }

    const resetCode =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const resetLink = `${env.BACKEND_URL}/reset-password?email=${encodeURIComponent(
      email
    )}&code=${resetCode}`;

    user.resetCode = resetCode;
    user.resetCodeExpires = Date.now() + 30 * 60 * 1000;
    await user.save();

    const transporter = createTransporter();
    const mailOptions = {
      from: env.EMAIL,
      to: email,
      subject: "Password Reset Link",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <h2 style="color: #333;">Password Reset</h2>
          <p style="color: #555;">Hello,</p>
          <p style="color: #555;">Click the following link to reset your password:</p>
          <p style="margin: 20px 0;">
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </p>
          <p style="color: #555;">This link is only valid for 30 minutes.</p>
          <p style="color: #555;">If you did not request a password reset, please ignore this email.</p>
          <p style="color: #888;">Best regards,<br/>Team StreamSpace</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Password reset email failed:", error.message);
        return res.status(400).json({
          message: "Error sending email",
        });
      }

      console.log(`Password reset email sent: ${info.response}`);
      return res.status(200).json({
        message: "Password reset link sent to your email",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

auth.get("/reset-password", async (req, res) => {
  try {
    const { email, code } = req.query;

    if (!email || !code) {
      return res.status(400).send("Invalid password reset link.");
    }

    const user = await userModel.findOne({
      email,
      resetCode: code,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Password reset link is invalid or expired.");
    }

    return res.render("reset-password", {
      email,
      resetCode: code,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

auth.post("/userdata", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await verifyUser(email, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const safeUser = await userModel.findById(user._id).select("-password");

    return res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = auth;
