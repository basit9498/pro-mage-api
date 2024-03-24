const { checkSchema } = require("express-validator");
const {
  getValidationParameters,
  validationParameters,
} = require("./all-validation");
const User = require("../models/user.model");

const createValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "name",
      },
      {
        type: "id",
        include: {
          custom: {
            options: async (value) => {
              const checkManager = await User.findById(value);
              if (!checkManager) {
                throw new Error("Manager Data is not founded.");
              }
              if (checkManager.designation !== "MANAGER") {
                throw new Error(
                  "Oh! Only managers are allowed to manage this project."
                );
              }
              return true;
            },
          },
        },
      },
      {
        type: "start_date",
      },
      {
        type: "end_date",
      },
    ],
    validationParameters
  ),
});

const updateValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "id",
      },
    ],
    validationParameters
  ),
});

const createProjectTaskValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "name",
      },
      {
        type: "id",
      },

      {
        type: "start_date",
      },
      {
        type: "end_date",
      },
    ],
    validationParameters
  ),
});

const updateProjectTaskValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "id",
      },
    ],
    validationParameters
  ),
});

module.exports = {
  createValidation,
  updateValidation,
  createProjectTaskValidation,
  updateProjectTaskValidation,
};
