const express = require("express");
const chatRoutes = require("./routes/chatRoutes");
const messagesRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authUserRoutes");
const mongoose = require("mongoose");
const app = express();
const connectToDB = require("./config/connectToDb");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/auth", authRoutes);
app.use("/messages", messagesRoutes);
mongoose.set("strictQuery", false);

connectToDB
  .then(() => {
    console.log("Connected to MongoDB !");
  })
  .catch(() => {
    console.log(`Could not connect to DB !`);
  });

app.listen(process.env.PORT, () => {
  console.log(`server lisetn to PORT 8000`);
});
