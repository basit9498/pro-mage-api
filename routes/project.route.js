const express = require("express");
const ProjectController = require("../controller/project.controller");
const ProjectValidations = require("../validations/project-validation");
const validationMiddleware = require("../middlewares/validation.middleware");
const route = express.Router();

// route: project/create
route.post(
  "/create",
  ProjectValidations.createValidation,
  validationMiddleware,
  ProjectController.createProject
);

route.post(
  "/update",
  ProjectValidations.updateValidation,
  validationMiddleware,
  ProjectController.updateProject
);
//  route: project/all
route.get("/all", ProjectController.allProject);
//  route: project/:id
route.get("/:id", ProjectController.singleProject);
//  route: project/task/create
route.post(
  "/task/create",
  ProjectValidations.createProjectTaskValidation,
  validationMiddleware,
  ProjectController.projectTaskCreate
);
//  route: project/task/update
route.post(
  "/task/update",
  ProjectValidations.updateProjectTaskValidation,
  validationMiddleware,
  ProjectController.projectTaskUpdate
);

module.exports = route;
