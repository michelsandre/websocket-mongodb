import { findDocument, getDocuments, addDocument } from "../db/documentsDb.js";

function registerEventsStart(socket, io) {
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
}

export default registerEventsStart;
