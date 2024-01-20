import { findUser, registerUser } from "../db/usersDb.js";

function registerEventsRegister(socket, io) {
  socket.on("register_user", async (data) => {
    const user = await findUser(data.user);

    if (user === null) {
      const result = await registerUser(data);

      if (result.acknowledged) {
        socket.emit("register_success");
      } else {
        socket.emit("register_error");
      }
    } else {
      socket.emit("register_error", "duplicate");
    }
  });
}

export default registerEventsRegister;
