import registerEventsDocument from "./registerEvents/registerEventsDocument.js";
import registerEventsStart from "./registerEvents/registerEventsStart.js";
import io from "./server.js";

io.on("connection", (socket) => {
  registerEventsStart(socket, io);
  registerEventsDocument(socket, io);

  //Emit message when disconnected
  socket.on("disconnect", (reason) => {
    console.log(`Client ${socket.id} has been disconnected, reason: ${reason}`);
  });
});
