import io from "./server.js";

import {
  findDocument,
  updateDocument,
  getDocuments,
  addDocument,
} from "./documentsDb.js";

io.on("connection", (socket) => {
  socket.on("get_documents", async (returnDocuments) => {
    const documents = await getDocuments();
    returnDocuments(documents);
  });

  socket.on("add_document", async (documentName) => {
    const result = await addDocument(documentName);

    if (result.acknowledged) {
      io.emit("add_document_interface", documentName);
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

  socket.on("disconnect", (reason) => {
    console.log(`Client ${socket.id} has been disconnected, reason: ${reason}`);
  });
});
