const ValidationError = require("../errors/ValidationError");

const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ValidationError("Invalid Request Parameter", result.array());
  }

  next();
};

module.exports = validationMiddleware;
