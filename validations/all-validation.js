const { checkSchema, validationResult } = require("express-validator");
const { isValidDate } = require("../helper/isValidDate");

// For All
module.exports.getValidationParameters = (getParams, paramsList) => {
  // v1
  let getData = [];
  Object.keys(paramsList).forEach((plf) => {
    if (getParams.find((gf) => gf?.type === plf)) {
      const getIndex = getParams.findIndex((gf) => gf?.type === plf);
      if (getIndex >= 0) {
        getData[plf] = { ...paramsList[plf], ...getParams[getIndex]?.include };
      } else {
        getData[plf] = paramsList[plf];
      }
    }
  });
  return getData;
};

module.exports.validationParameters = {
  name: {
    notEmpty: {
      errorMessage: "Please enter the name",
      bail: true,
    },
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage: "Name length should be MIN:3 and MAX:30",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Please enter the E-mail",
      bail: true,
    },
    isEmail: {
      errorMessage: "Please enter the valid E-mail",
    },
  },
  old_password: {
    notEmpty: {
      errorMessage: "Please enter the old password",
      bail: true,
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Please enter the password",
      bail: true,
    },
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage:
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8",
    },
  },
  confirm_password: {
    notEmpty: {
      errorMessage: "Please enter confirm password",
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm password is not matched .");
        }
        return true;
      },
    },
  },
  designation: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Designation is required",
      bail: true,
    },

    isIn: {
      options: [["MANAGER", "DEVELOPER"]],
      errorMessage: "Designation must be either MANAGER or DEVELOPER",
    },
  },
  id: {
    notEmpty: {
      errorMessage: "Id is missing.",
      bail: true,
    },
    isMongoId: {
      errorMessage: "Invalid Id.",
    },
  },
  start_date: {
    in: ["body"],
    custom: {
      options: (value, { req }) => {
        if (!value) {
          throw new Error("Start date is missing");
        }
        if (!isValidDate(value)) {
          throw new Error("Invalid start date");
        }

        return true;
      },
    },
  },
  end_date: {
    in: ["body"],

    custom: {
      options: (value, { req }) => {
        if (!value) {
          throw new Error("End date is missing");
        }
        if (!isValidDate(value)) {
          throw new Error("Invalid End date");
        }
        if (new Date(value) < new Date(req.body.start_date)) {
          throw new Error("End date must be later than start date");
        }

        return true;
      },
    },
  },
};

const a = checkSchema({});
