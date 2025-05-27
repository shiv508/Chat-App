const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const port = 5000 || process.env.PORT;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

const users = [{}];

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("joined", ({ user }) => {
    console.log(`${user} has joined`);
    users[socket.id] = user;
    socket.emit("welcome", {
      user: "Admin",
      message: `${users[socket.id]} has joined the chat`,
    });
    socket.broadcast.emit("userjoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnect", () => {
    socket.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left the chat`,
    });
    console.log("user left");
  });
});

app.get("/", (req, res) => {
  res.status(200).send("It's working");
});

server.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});
