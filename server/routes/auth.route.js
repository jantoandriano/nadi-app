const authController = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/login", authController.login);
  app.post("/register", authController.register);
};
