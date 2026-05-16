const path = require("path");
const express = require("express");
const { env } = require("./config/env");
const connectDB = require("./Database/database");
const router = require("./Router/router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

const startServer = async () => {
  await connectDB();

  return app.listen(env.PORT, "127.0.0.1", () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

module.exports = app;

if (require.main === module) {
  startServer().catch((error) => {
    console.error(`[server] Failed to start: ${error.message}`);
    process.exit(1);
  });
}
