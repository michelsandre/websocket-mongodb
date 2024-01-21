const socket = io();

function emitRegisterUser(data) {
  socket.emit("register_user", data);
}

socket.on("register_success", () => {
  alert("Cadastro realizado com sucesso!");
  window.location.href = "/login";
});

socket.on("register_error", (error) => {
  if (error == "duplicate") {
    alert("Usuário já existe, tente um novo");
  } else {
    alert("Erro durante o cadastro");
  }
});

export { emitRegisterUser };
