const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat ", ChatSchema);

const createChat = (userOne, userTwo) => {
  const newChat = new ChatModel({
    members: [userOne, userTwo],
  });
  return newChat.save();
};

const allUserChats = (userid) => {
  const chatUser = ChatModel.find({ members: { $in: [userid] } });

  return chatUser;
};

const findChat = (userOne, userTwo) => {
  const chat = ChatModel.findOne({
    members: { $all: [userOne, userTwo] },
  });

  return chat;
};

module.exports = { createChat, allUserChats, findChat };
