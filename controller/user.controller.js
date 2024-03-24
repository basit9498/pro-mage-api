const User = require("../models/user.model");
const CustomError = require("../errors/CustomError");

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, designation } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      status: 1,
      designation,
    });
    res.status(201).json({
      message: "User has been registered successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.userUpdate = async (req, res, next) => {
  try {
    const updateQuery = {};

    if (req.body.name) {
      if (req.body.name.length >= 3) {
        updateQuery.$set = { name: req.body.name };
      } else {
        throw new CustomError(
          400,
          "Name Should be at least more then 3 characters"
        );
      }
    }

    if (req.body.phone_number) {
      updateQuery.$set = {
        ...updateQuery.$set,
        phone_number: req.body.phone_number,
      };
    }

    if (Object.keys(updateQuery).length === 0) {
      throw new CustomError(400, "At least one field need to be edit !!!");
    }

    const user = await User.updateOne({ _id: req.user.id }, updateQuery);

    if (user.modifiedCount === 0) {
      throw new CustomError(404, "User not updated!!!");
    }

    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getManagers = async (req, res, next) => {
  try {
    const users = await User.find({ designation: "MANAGER" });
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
