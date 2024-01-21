import "dotenv/config";

import registerEventsDocument from "./registerEvents/document.js";
import registerEventsRegister from "./registerEvents/register.js";
import registerEventLogin from "./registerEvents/login.js";
import registerEventsStart from "./registerEvents/start.js";
import io from "./server.js";
import allowUser from "./middlewares/allowUser.js";

const nspUsers = io.of("/users");

nspUsers.use(allowUser);

nspUsers.on("connection", (socket) => {
  registerEventsStart(socket, nspUsers);
  registerEventsDocument(socket, nspUsers);
});

io.on("connection", (socket) => {
  registerEventsRegister(socket, io);
  registerEventLogin(socket, io);
});
