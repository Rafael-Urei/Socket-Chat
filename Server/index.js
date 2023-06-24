const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User is connected: ${socket.id}`);

  socket.on("send message", (data) => {
    socket.broadcast.emit("receive message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
