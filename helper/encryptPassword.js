const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};

module.exports = encryptPassword;
