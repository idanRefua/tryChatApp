const bcrypt = require("bcryptjs");

const createPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = {
  createPassword,
  comparePassword,
};
