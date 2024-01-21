import { insertDocumentLink, removeDocumentLink } from "./index.js";
import { getCookie } from "./utils/cookies.js";

const socket = io("/users", {
  auth: {
    token: getCookie("tokenJwt"),
  },
});

socket.on("connect_error", (error) => {
  console.log(error);
  window.location.href = "/login";
});

socket.emit("get_documents", (documents) => {
  documents.forEach((document) => {
    insertDocumentLink(document.name);
  });
});

function emitAddDocument(documentName) {
  socket.emit("add_document", documentName);
}

socket.on("add_document_interface", (documentName) => {
  insertDocumentLink(documentName);
});

socket.on("document_duplicate", (documentName) => {
  alert(`O documento ${documentName} já existe`);
});

socket.on("delete_document_success", (documentName) => {
  removeDocumentLink(documentName);
});
export { emitAddDocument };
