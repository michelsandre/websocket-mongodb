import { findUser } from "../db/usersDb.js";
import authenticateUser from "../utils/authenticateUser.js";

function registerEventLogin(socket, io) {
  socket.on("authenticate_user", async ({ user, password }) => {
    const username = await findUser(user);

    if (username) {
      const authenticate = authenticateUser(password, username);

      if (authenticate) {
        socket.emit("authenticate_success");
      } else {
        socket.emit("authenticate_error");
      }
    } else {
      socket.emit("authenticate_error_user");
    }
  });
}

export default registerEventLogin;
