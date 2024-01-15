const textEditor = document.getElementById("editor-texto");

const socket = io();

textEditor.addEventListener("keyup", () => {
  socket.emit("text_editor", textEditor.value);
});

socket.on("text_editor_client", (msg) => {
  textEditor.value = msg;
});
