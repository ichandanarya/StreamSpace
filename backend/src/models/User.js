//This file defines how user data is stored in MongoDB.

import mongoose from "mongoose";    // Import the mongoose library to define the user schema and model

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true,
    },
    email: {    // Store the user's email, which must be unique and is required for registration
      type: String,
      required: true,
      unique: true,
    },
    password: {   // Store the hashed password, not the plain text password
      type: String,
      required: true,
    },
    avatar: {   
      type: String,
      default: "",
    },
    subscribers: {    
      type: Number,
      default: 0,
    },
    subscribedChannels: [    //Stores list of channels user follows
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    //It connects to other users


      },
    ],
  },
  {
    timestamps: true,   // Automatically add createdAt and updatedAt fields to the schema
  }
);

const User = mongoose.model("User", userSchema);    // Create a Mongoose model named "User" based on the defined userSchema

export default User;
