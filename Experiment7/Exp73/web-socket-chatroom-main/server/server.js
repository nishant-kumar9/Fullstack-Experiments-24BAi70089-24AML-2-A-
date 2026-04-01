// server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ✅ Store users
const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 🔹 JOIN CHAT
  socket.on("join_chat", (username) => {
    users[socket.id] = username;

    console.log("Users:", users);

    // 🔔 System message
    io.emit("receive_message", {
      username: "System",
      text: `${username} joined the chat`,
      time: new Date().toLocaleTimeString(),
      type: "system",
    });

    // ✅ SEND USER LIST
    io.emit("users_list", Object.values(users));
  });

  // 🔹 SEND MESSAGE
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  // 🔹 TYPING
  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  // 🔹 DISCONNECT
  socket.on("disconnect", () => {
    const username = users[socket.id];

    if (username) {
      io.emit("receive_message", {
        username: "System",
        text: `${username} left the chat`,
        time: new Date().toLocaleTimeString(),
        type: "system",
      });

      delete users[socket.id];

      // ✅ UPDATE USERS
      io.emit("users_list", Object.values(users));
    }

    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});