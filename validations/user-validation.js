const { checkSchema } = require("express-validator");
const User = require("../models/user.model");
const {
  getValidationParameters,
  validationParameters,
} = require("./all-validation");

const createValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: "email",
        include: {
          custom: {
            options: async (value) => {
              const checkingEmail = await User.findOne({ email: value });
              if (checkingEmail) {
                throw new Error("E-Mail is already registered.");
              }
              return true;
            },
          },
        },
      },
      {
        type: "name",
      },
      {
        type: "password",
      },
      {
        type: "confirm_password",
      },
      {
        type: "designation",
      },
    ],
    validationParameters
  ),
});

module.exports = {
  createValidation,
};
