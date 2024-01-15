import io from "./server.js";

io.on("connection", (socket) => {
  console.log(`A client has been connected on ID: ${socket.id}`);

  socket.on("text_editor", (msg) => {
    socket.broadcast.emit("text_editor_client", msg);
  });
});
