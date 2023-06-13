import "./chat-page-style.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ChatRow from "../../components/ChatRow/ChatRow";
import ChatBody from "../../components/ChatBody/ChatBody";
import { io } from "socket.io-client";

export default function ChatPage() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [chatData, setChatData] = useState(null);
  const [onlineUsersInTheWebsite, setOnlineUsersInTheWebsite] = useState([]);
  const [senderMessage, setSenderMessage] = useState(null);
  const [recivetGetMessage, setReciverGetMessage] = useState(null);
  const [findUsersFilter, setFindUsersFilter] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [findUser, setFindUser] = useState("");

  // socket io
  useEffect(() => {
    socket.current = io("http://localhost:8001");
    socket.current.emit("add-new-user-to-socket", userInfo._id);
    socket.current.on("get-all-users", (users) => {
      setOnlineUsersInTheWebsite(users);
    });
  }, [userInfo]);

  // get all user chats
  useEffect(() => {
    const getAlluserChats = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/chat/mychats");
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAlluserChats();
  }, [userInfo]);

  useEffect(() => {
    if (senderMessage !== null) {
      socket.current.emit("send-new-message", senderMessage);
    }
  }, [senderMessage]);

  useEffect(() => {
    socket.current.on("recive-message", (message) => {
      setReciverGetMessage(message);
    });
  }, []);

  const ifUserOnline = (chat) => {
    const userChat = chat.members.find((user) => user !== userInfo._id);
    const onlineUser = onlineUsersInTheWebsite.find(
      (user) => user.userId === userChat
    );
    return onlineUser ? true : false;
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/auth/allusers");
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleFindUser = (e) => {
    setFindUser(e.target.value);
    let inputVal = e.target.value;
    let findUsers = allUsers.filter((user) => {
      return user.name.toLowerCase().includes(inputVal.toLowerCase());
    });

    if (inputVal === "") {
      setFindUsersFilter([]);
      return;
    } else {
      setFindUsersFilter(findUsers);
    }
  };

  const handleCreateFriendChat = async (e) => {
    const friendId = e.target.id;
    try {
      const res = await axios.post(
        `http://localhost:8000/chat/createchat/${friendId}`
      );

      setChats(res.data);
      setFindUser("");
      setFindUsersFilter([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container our-chat-box">
      <p className="span-chat-page"></p>
      <div className="row">
        <div className="col-md-2 menu-chats">
          <h3 className="chat-title">Chats</h3>
          <input type="search" value={findUser} onChange={handleFindUser} />
          {findUsersFilter.length !== 0 && (
            <div className="search-result">
              {findUsersFilter.slice(0, 5).map((user) => {
                return (
                  <div
                    id={user._id}
                    onClick={handleCreateFriendChat}
                    className="user-row-search-input"
                    key={user._id}
                  >
                    {user.name}
                  </div>
                );
              })}
            </div>
          )}
          <div className="list-chats-user">
            {chats.map((chat) => {
              return (
                <div key={chat._id} onClick={() => setChatData(chat)}>
                  <ChatRow
                    data={chat}
                    currentUserId={userInfo._id}
                    onlineUser={ifUserOnline(chat)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-10 chat-box">
          <ChatBody
            chat={chatData}
            currentUserId={userInfo._id}
            setSenderMessage={setSenderMessage}
            recivetGetMessage={recivetGetMessage}
          />
        </div>
      </div>
    </div>
  );
}
