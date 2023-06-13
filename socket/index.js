const io = require("socket.io")(8001, {
  cors: {
    origin: process.env.WEB_URL,
  },
});

let usersActive = [];

io.on("connect", (socket) => {
  socket.on("add-new-user-to-socket", (userIdNew) => {
    if (!usersActive.some((user) => user.userId === userIdNew)) {
      usersActive.push({
        userId: userIdNew,
        socketId: socket.id,
      });
      io.emit("get-all-users", usersActive);
    }
  });

  io.on("disconnect", () => {
    usersActive = usersActive.filter((user) => user.socketId !== socket.id);
    io.emit("get-all-users", usersActive);
  });
});

io.on("send-new-message", (message) => {
  const userGetMessageId = message.userId;
  const user = usersActive.find((user) => user.userId === userGetMessageId);

  if (user) {
    io.to(user.socketId).emit("recive-message", message);
  }
});
