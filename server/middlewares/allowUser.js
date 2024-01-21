import jwt from "jsonwebtoken";

function allowUser(socket, next) {
  const tokenJwt = socket.handshake.auth.token;

  try {
    const payloadToken = jwt.verify(tokenJwt, process.env.JWT_SECRET);

    socket.emit("allowUser_success", payloadToken);
    next();
  } catch (error) {
    next(error);
  }
}

export default allowUser;
