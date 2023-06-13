const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    chatId: { type: String },
    userId: { type: String },
    textMessage: { type: String },
  },
  { timestamps: true }
);

const messageModal = mongoose.model("message", MessageSchema);

const getMessagesFromTheChat = (chatId) => {
  const chat = messageModal.find({ chatId });
  return chat;
};

const sendMessage = (chatId, userId, textMessage) => {
  const message = new messageModal({ chatId, userId, textMessage });

  return message.save();
};

module.exports = { sendMessage, getMessagesFromTheChat };
