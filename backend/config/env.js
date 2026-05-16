const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || "5000";
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const DEV_JWT_SECRET = "streamspace-local-development-secret";
const DEFAULT_CORS_ORIGINS = [
  FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
];

const env = {
  NODE_ENV,
  PORT,
  BACKEND_URL,
  FRONTEND_URL,
  MONGODB_URI: (process.env.MONGODB_URI || "").trim(),
  EMAIL: process.env.EMAIL || "",
  PASSWORD: process.env.PASSWORD || "",
  JWT_SECRET: process.env.JWT_SECRET || process.env.SECRET_KEY || DEV_JWT_SECRET,
  SECRET_KEY: process.env.SECRET_KEY || process.env.JWT_SECRET || DEV_JWT_SECRET,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "",
  CORS_ORIGINS: (
    process.env.CORS_ORIGINS || DEFAULT_CORS_ORIGINS.join(",")
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

const isProduction = env.NODE_ENV === "production";

const isValidMongoUri = (value) =>
  /^mongodb(\+srv)?:\/\//.test(value || "");

const validateEnv = () => {
  const errors = [];
  const warnings = [];

  if (!env.MONGODB_URI) {
    errors.push("MONGODB_URI is required.");
  } else if (!isValidMongoUri(env.MONGODB_URI)) {
    errors.push('MONGODB_URI must start with "mongodb://" or "mongodb+srv://".');
  }

  if (!env.EMAIL || !env.PASSWORD) {
    warnings.push("EMAIL and PASSWORD are not set. Email features are disabled.");
  }

  if (!env.YOUTUBE_API_KEY) {
    warnings.push("YOUTUBE_API_KEY is not set. YouTube search is disabled.");
  }

  if (!process.env.BACKEND_URL) {
    warnings.push(`BACKEND_URL is not set. Falling back to ${env.BACKEND_URL}.`);
  }

  if (!process.env.FRONTEND_URL) {
    warnings.push(`FRONTEND_URL is not set. Falling back to ${env.FRONTEND_URL}.`);
  }

  if (!process.env.JWT_SECRET && !process.env.SECRET_KEY) {
    const message =
      "JWT_SECRET/SECRET_KEY is not set. Using a development-only secret.";
    if (isProduction) {
      errors.push("JWT_SECRET or SECRET_KEY must be set in production.");
    } else {
      warnings.push(message);
    }
  }

  return { errors, warnings };
};

const hasMailConfig = () => Boolean(env.EMAIL && env.PASSWORD);

module.exports = {
  env,
  hasMailConfig,
  isProduction,
  isValidMongoUri,
  validateEnv,
};
