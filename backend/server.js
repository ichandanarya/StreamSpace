const express = require("express");
const router = require("./Router/router");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ FIXED
const connectDB = require("./Database/database");

const app = express();
const PORT = process.env.PORT || 3000; // ✅ only once

// Connect DB
connectDB();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://youtube-clone-mern-backend.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // ✅ only once
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use(router);

// View engine (optional)
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
