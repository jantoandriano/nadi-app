// Loads the configuration from config.env to process.env

const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/mongodb");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

userRoutes(app);
authRoutes(app);

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
