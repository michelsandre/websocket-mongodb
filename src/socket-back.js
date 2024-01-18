import io from "./server.js";

import {
  findDocument,
  updateDocument,
  getDocuments,
  addDocument,
  deleteDocument,
} from "./documentsDb.js";

io.on("connection", (socket) => {
  socket.on("get_documents", async (returnDocuments) => {
    const documents = await getDocuments();
    returnDocuments(documents);
  });

  socket.on("add_document", async (documentName) => {
    const isDocumentDuplicate = (await findDocument(documentName)) !== null;

    if (isDocumentDuplicate) {
      socket.emit("document_duplicate", documentName);
    } else {
      const result = await addDocument(documentName);

      if (result.acknowledged) {
        io.emit("add_document_interface", documentName);
      }
    }
  });

  socket.on("select_document", async (documentName, returnText) => {
    socket.join(documentName);

    const document = await findDocument(documentName);

    console.log("document", document);

    if (document) {
      returnText(document.text);
    }
  });

  socket.on("text_editor", async ({ text, documentName }) => {
    const update = await updateDocument(documentName, text);

    if (update.modifiedCount) {
      socket.to(documentName).emit("text_editor_client", text);
    }
  });

  socket.on("delete_document", async (documentName) => {
    const result = await deleteDocument(documentName);

    if (result.deletedCount) {
      io.emit("delete_document_success", documentName);
    }
  });

  //Emit message when disconnected
  socket.on("disconnect", (reason) => {
    console.log(`Client ${socket.id} has been disconnected, reason: ${reason}`);
  });
});
