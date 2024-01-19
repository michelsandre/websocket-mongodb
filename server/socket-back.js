import registerEventsDocument from "./registerEvents/document.js";
import registerEventsRegister from "./registerEvents/register.js";
import registerEventsStart from "./registerEvents/start.js";
import io from "./server.js";

io.on("connection", (socket) => {
  registerEventsStart(socket, io);
  registerEventsDocument(socket, io);
  registerEventsRegister(socket, io);

  //Emit message when disconnected
  socket.on("disconnect", (reason) => {
    console.log(`Client ${socket.id} has been disconnected, reason: ${reason}`);
  });
});
