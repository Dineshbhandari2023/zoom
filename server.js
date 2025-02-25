const { log } = require("console");
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-roon", () => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected");
  });
});

const port = process.env.PORT || 8000; //environment variable declaration with process object
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
