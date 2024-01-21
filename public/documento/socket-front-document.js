import { getCookie } from "../utils/cookies.js";
import {
  alertAndRedirect,
  handleAllowUserSuccess,
  updateInterfaceUsers,
  updateTextEditor,
} from "./document.js";

const socket = io("/users", {
  auth: {
    token: getCookie("tokenJwt"),
  },
});

socket.on("allowUser_success", handleAllowUserSuccess);

function selectDocument(inputData) {
  socket.emit("select_document", inputData, (text) => {
    updateTextEditor(text);
  });
}

socket.on("user_already_in_document", () => {
  alert("Documento já aberto em outra página");
  window.location.href = "/";
});

socket.on("users_on_document", updateInterfaceUsers);

function emitTextEditor(data) {
  socket.emit("text_editor", data);
}

function emitDeleteDocument(documentName) {
  socket.emit("delete_document", documentName);
}

socket.on("text_editor_client", (text) => {
  updateTextEditor(text);
});

socket.on("delete_document_success", (documentName) => {
  alertAndRedirect(documentName);
});

export { emitTextEditor, selectDocument, emitDeleteDocument };
