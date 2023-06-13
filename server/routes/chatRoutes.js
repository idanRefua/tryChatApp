const express = require("express");
const router = express.Router();
const chatModal = require("../models/chatModel");
const userModal = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

// create chat
router.post("/createchat/:friendId", authMiddleware, async (req, res) => {
  try {
    const friendId = req.params.friendId;
    const userId = req.userDataToken._id;

    const isChat = await chatModal.findChat(userId, friendId);
    if (!isChat) {
      const newChat = await chatModal.createChat(userId, friendId);

      const allChats = await chatModal.allUserChats(userId);

      res.status(200).json(allChats);
    } else {
      throw "there is also chat";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// find user chats
router.get(/* "/:userid" */ "/mychats", authMiddleware, async (req, res) => {
  try {
    /* const userid = req.params.userid; */
    const userId = req.userDataToken._id;
    const userChats = await chatModal.allUserChats(userId);

    res.status(200).json(userChats);
  } catch (error) {
    res.status(400).json(error);
  }
});

// find spesfic chat
router.get(
  "/findchat/:firstusername/:secondusername",
  authMiddleware,
  async (req, res) => {
    const firstusername = req.params.firstusername;
    const secondusername = req.params.secondusername;

    const chat = await chatModal.findChat(firstusername, secondusername);

    res.status(200).json(chat);
    try {
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get("/finduser/:userid", authMiddleware, async (req, res) => {
  const userid = req.params.userid;
  try {
    const user = await userModal.findUserById(userid);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
