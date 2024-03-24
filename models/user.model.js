const encryptPassword = require("../helper/encryptPassword");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: false,
    },

    status: {
      type: Number,
      required: true,
      enum: [0, 1],
      default: 0,
    },
    designation: {
      type: String,
      required: false,
      enum: ["MANAGER", "DEVELOPER"],
      default: "DEVELOPER",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

/**
 * User Model Methods
 */
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const getHashPassword = await encryptPassword(this.get("password"));
      if (typeof getHashPassword === "string") {
        this.set("password", getHashPassword);
      }
    } catch (error) {
      throw new Error(
        "Encrypt Password Error Please Contact with Developer Team!!"
      );
    }
  }

  next();
});

UserSchema.methods.removeToken = async function (tokenToRemove) {
  this.tokens = this.tokens.filter(
    (tokenObj) => tokenObj.token !== tokenToRemove
  );
  await this.save();
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
