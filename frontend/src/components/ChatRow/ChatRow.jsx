import { useEffect, useState } from "react";
import axios from "axios";
import "./chat-row-style.css";

export default function ChatRow({ data, currentUserId, onlineUser }) {
  // the person who chat with us
  const [chatUserData, setChatUserData] = useState(null);

  useEffect(() => {
    // find the id of user we chating with
    const chatUserId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const user = await axios.get(`chat/finduser/${chatUserId}`);

        setChatUserData(user.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  ///
  ///

  return (
    <div className="row-user-chat row">
      <div className="col-md-2">
        <img
          src="https://cdn.pixabay.com/photo/2013/03/30/00/11/user-97890_960_720.png"
          alt=""
          className="img-profile-user"
        />
      </div>
      <div className="col-md-2">
        <span className="span-username">{chatUserData?.name}</span>{" "}
        <span className="span-status-user">
          {onlineUser ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}
