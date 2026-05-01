const express = require("express");
const router = require("./Router/router");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./Database/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use(router);

// View engine (only if you're using hbs)
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
