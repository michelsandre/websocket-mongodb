import registerEventsDocument from "./registerEvents/document.js";
import registerEventsRegister from "./registerEvents/register.js";
import registerEventLogin from "./registerEvents/login.js";
import registerEventsStart from "./registerEvents/start.js";
import io from "./server.js";

io.on("connection", (socket) => {
  registerEventsRegister(socket, io);
  registerEventLogin(socket, io);
  registerEventsStart(socket, io);
  registerEventsDocument(socket, io);

  //Emit message when disconnected
  socket.on("disconnect", (reason) => {
    console.log(`Client ${socket.id} has been disconnected, reason: ${reason}`);
  });
});
