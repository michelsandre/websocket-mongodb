import { registerUser } from "../db/usersDb.js";

function registerEventsRegister(socket, io) {
  socket.on("register_user", async (data) => {
    const result = await registerUser(data);

    if (result.acknowledged) {
      socket.emit("register_success");
    } else {
      socket.emit("register_error");
    }
  });
}

export default registerEventsRegister;
