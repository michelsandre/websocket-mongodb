import { insertDocumentLink } from "./index.js";

const socket = io();

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

export { emitAddDocument };
