import "./chatbody.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";

export default function ChatBody({
  chat,
  currentUserId,
  setSenderMessage,
  recivetGetMessage,
}) {
  const [chatUserData, setChatUserData] = useState(null);
  const [chatMessages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const scrollBarAuto = useRef();

  useEffect(() => {
    const chatUserId = chat?.members?.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const user = await axios.get(`chat/finduser/${chatUserId}`);

        setChatUserData(user.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat) getUserData();
  }, [chat, currentUserId]);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const messages = await axios.get(`messages/getallmessages/${chat._id}`);
        setMessages(messages.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat) getAllMessages();
  }, [chat]);

  useEffect(() => {
    if (recivetGetMessage !== null && recivetGetMessage.chatId === chat._id) {
      setMessages([...chatMessages, recivetGetMessage]);
    }
  }, [recivetGetMessage]);

  const handleSendMessage = async () => {
    const newMessage = {
      userId: currentUserId,
      textMessage: message,
    };
    try {
      if (message === "") return alert("can't send empty message");
      const res = await axios.post(
        `messages/sendmessage/${chat._id}`,
        newMessage
      );
      setMessages([...chatMessages, res.data]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }

    const userGetMessageId = chat.members.find((id) => id !== currentUserId);
    setSenderMessage([...message, userGetMessageId]);
  };
  const hadnleMessage = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    scrollBarAuto.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <>
      {chat && (
        <>
          <div className="chat-body">
            <img
              src="https://cdn.pixabay.com/photo/2013/03/30/00/11/user-97890_960_720.png"
              alt=""
              className="img-profile-user"
            />
            <span className="span-username">{chatUserData?.name}</span>{" "}
          </div>
          <hr />
          <div className="chat-messages-body">
            <ul className="">
              {chatMessages.map((msg) => {
                return (
                  <li
                    ref={scrollBarAuto}
                    className={
                      msg.userId === currentUserId
                        ? " mb-4 my-messages-li"
                        : " mb-4 friend-messages-li"
                    }
                    key={msg._id}
                  >
                    <p
                      className={
                        msg.userId === currentUserId
                          ? "my-messages-p"
                          : "friend-messages-p"
                      }
                    >
                      <span className="text-msg ">{msg.textMessage}</span>{" "}
                      <br />
                      {format(msg.createdAt)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="send-message-input">
            <input
              type="text"
              placeholder="Write message here"
              value={message}
              onChange={hadnleMessage}
              className="input-msg"
            />
            <button className="send-msg-btn" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </>
      )}
    </>
  );
}
