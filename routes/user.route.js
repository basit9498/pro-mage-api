const express = require("express");
const UserController = require("../controller/user.controller");
const UserValidations = require("../validations/user-validation");
const validationMiddleware = require("../middlewares/validation.middleware");
const route = express.Router();

// route: user/create
route.post(
  "/create",
  UserValidations.createValidation,
  validationMiddleware,
  UserController.createUser
);

// route: user/update
route.put("/update", UserController.userUpdate);

// route: user/get-managers
route.get("/get-managers", UserController.getManagers);

module.exports = route;
