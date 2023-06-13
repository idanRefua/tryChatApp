const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.URL_MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
