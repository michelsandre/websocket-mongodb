const socket = io();

function emitRegisterUser(data) {
  socket.emit("register_user", data);
}

socket.on("register_success", () => {
  alert("Cadastro realizado com sucesso!");
});

socket.on("register_error", () => {
  alert("Erro durante o cadastro");
});

export { emitRegisterUser };
