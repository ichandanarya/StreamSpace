const mongoose = require("mongoose");
const { env, isProduction, validateEnv } = require("../config/env");

let connectionPromise = null;

const connectDB = async () => {
  if (connectionPromise) {
    return connectionPromise;
  }

  const { errors, warnings } = validateEnv();
  warnings.forEach((warning) => console.warn(`[env] ${warning}`));

  if (errors.length > 0) {
    const message = errors.join(" ");
    console.error(`[database] ${message}`);

    if (isProduction) {
      throw new Error(message);
    }

    return null;
  }

  connectionPromise = mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    const conn = await connectionPromise;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    connectionPromise = null;
    console.error(`[database] MongoDB connection failed: ${error.message}`);

    if (error.message.includes("ECONNREFUSED")) {
      console.error("[database] MongoDB server is not running or the port is wrong.");
    } else if (error.message.includes("authentication failed")) {
      console.error("[database] MongoDB username or password is invalid.");
    } else if (error.message.includes("getaddrinfo")) {
      console.error("[database] MongoDB host/cluster name cannot be resolved.");
    }

    if (isProduction) {
      throw error;
    }

    return null;
  }
};

module.exports = connectDB;
