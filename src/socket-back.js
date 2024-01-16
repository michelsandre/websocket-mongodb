import io from "./server.js";

const documents = [
  {
    name: "JavaScript",
    text: "texto de java script...",
  },
  {
    name: "Node",
    text: "texto de node...",
  },
  {
    name: "Socket.io",
    text: "text de socket.io...",
  },
];

io.on("connection", (socket) => {
  console.log(`A client has been connected on ID: ${socket.id}`);

  socket.on("select_document", (documentName, returnText) => {
    socket.join(documentName);

    const document = findDocument(documentName);

    if (document) {
      returnText(document.text);
    }
  });

  socket.on("text_editor", ({ text, documentName }) => {
    const document = findDocument(documentName);

    if (document) {
      document.text = text;
      socket.to(documentName).emit("text_editor_client", text);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client ${socket.id} has been disconnected, reason: ${reason}`);
  });
});

function findDocument(name) {
  const document = documents.find((doc) => {
    return doc.name === name;
  });

  return document;
}
