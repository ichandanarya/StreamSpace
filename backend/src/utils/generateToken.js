//This file creates a JWT token when a user logs in or registers.


import jwt from "jsonwebtoken";   // Import the jsonwebtoken library to create JWT tokens

const generateToken = (id) => {   // Define a function takes user ID
  return jwt.sign({ id }, process.env.JWT_SECRET, {   // Create a JWT token with the user's ID as the payload, using a secret key from environment variables
    expiresIn: "7d",
  });
};

export default generateToken;
