import { findUser } from "../db/usersDb.js";
import authenticateUser from "../utils/authenticateUser.js";
import generateJwt from "../utils/generateJwt.js";

function registerEventLogin(socket, io) {
  socket.on("authenticate_user", async ({ user, password }) => {
    const username = await findUser(user);

    if (username) {
      const authenticate = authenticateUser(password, username);

      if (authenticate) {
        const tokenJwt = generateJwt({ username: user });

        socket.emit("authenticate_success", tokenJwt);
      } else {
        socket.emit("authenticate_error");
      }
    } else {
      socket.emit("authenticate_error_user");
    }
  });
}

export default registerEventLogin;
