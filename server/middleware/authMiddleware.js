const jwt = require("../config/jsonToken");

module.exports = async (req, res, next) => {
  try {
    req.userDataToken = await jwt.verifyToken(req.headers.token);

    next();
  } catch {
    res.send("send invalid token");
  }
};
