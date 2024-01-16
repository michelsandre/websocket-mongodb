import { updateTextEditor } from "./document.js";

const socket = io();

function selectDocument(name) {
  socket.emit("select_document", name, (text) => {
    updateTextEditor(text);
  });
}

function emitTextEditor(data) {
  socket.emit("text_editor", data);
}

socket.on("text_editor_client", (text) => {
  updateTextEditor(text);
});

export { emitTextEditor, selectDocument };
