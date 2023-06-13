const express = require("express");
const router = express.Router();
const messagesModel = require("../models/messageModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sendmessage/:chatid", authMiddleware, async (req, res) => {
  const body = req.body;
  const chatid = req.params.chatid;
  const userId = req.userDataToken._id;
  try {
    const addMessage = await messagesModel.sendMessage(
      chatid,
      userId,
      body.textMessage
    );

    res.status(200).json(addMessage);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/getallmessages/:chatid", async (req, res) => {
  try {
    const chatid = req.params.chatid;
    const messages = await messagesModel.getMessagesFromTheChat(chatid);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
