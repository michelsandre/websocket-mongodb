import { defineCookie } from "../utils/cookies.js";

const socket = io();

function emitAuthenticateUser(data) {
  socket.emit("authenticate_user", data);
}

socket.on("authenticate_success", (tokenJwt) => {
  defineCookie("tokenJwt", tokenJwt);

  alert("Usuário autenticada com sucesso");

  window.location.href = "/";
});

socket.on("authenticate_error", () => alert("Usuário e/ou senha não conferem"));
socket.on("authenticate_error_user", () => alert("Usuario não encontrado"));

export { emitAuthenticateUser };
