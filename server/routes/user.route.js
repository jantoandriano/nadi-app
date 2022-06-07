const userController = require("../controllers/user.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");

module.exports = function (app) {
  app.get("/users", [jwtMiddleware.verifyToken], userController.getUsers);
  app.get(
    "/user/:id",
    [jwtMiddleware.verifyToken],
    userController.getUserDetail
  );
  app.delete(
    "/users/:id",
    [jwtMiddleware.verifyToken],
    userController.deleteUser
  );
  app.put("/user/:id", [jwtMiddleware.verifyToken], userController.editUser);
  app.post("/users/add", [jwtMiddleware.verifyToken], userController.addUser);
};
