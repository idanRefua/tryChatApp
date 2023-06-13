const jwt = require("jsonwebtoken");

const generateToken = (info) => {
  return new Promise((resolve, reject) => {
    jwt.sign(info, process.env.JWT_KEY, { expiresIn: "8h" }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, tokenData) => {
      if (err) reject(err);
      else resolve(tokenData);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
