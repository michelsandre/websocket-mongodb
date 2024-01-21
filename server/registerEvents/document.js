import {
  findDocument,
  updateDocument,
  deleteDocument,
} from "../db/documentsDb.js";
import {
  addConnection,
  findConnection,
  getUsersDocument,
  removeConnection,
} from "../utils/documentsConnection.js";

function registerEventsDocument(socket, io) {
  socket.on(
    "select_document",
    async ({ documentName, username }, returnText) => {
      const document = await findDocument(documentName);

      if (document) {
        const connectionFound = findConnection(documentName, username);
        if (!connectionFound) {
          socket.join(documentName);

          addConnection({ documentName, username });
          socket.data = {
            userIn: true,
          };

          const usersOnDocument = getUsersDocument(documentName);

          io.to(documentName).emit("users_on_document", usersOnDocument);

          returnText(document.text);
        } else {
          socket.emit("user_already_in_document");
        }
      }

      socket.on("disconnect", () => {
        if (socket.data.userIn) {
          removeConnection(documentName, username);

          const usersOnDocument = getUsersDocument(documentName);

          io.to(documentName).emit("users_on_document", usersOnDocument);
        }
      });
    }
  );

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
}

export default registerEventsDocument;
