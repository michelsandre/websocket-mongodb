import {
  emitDeleteDocument,
  emitTextEditor,
  selectDocument,
} from "./socket-front-document.js";

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get("nome");

//Captura os elementos
const documentTitle = document.getElementById("titulo-documento");
const textEditor = document.getElementById("editor-texto");
const deleteButton = document.getElementById("excluir-documento");
const usersList = document.getElementById("usuarios-conectados");

documentTitle.textContent = documentName || "Documento sem título";

function handleAllowUserSuccess(payloadToken) {
  console.log(payloadToken);
  selectDocument({ documentName, username: payloadToken.username });
}

function updateInterfaceUsers(usersOnDocument) {
  usersList.innerHTML = "";
  usersOnDocument.forEach((user) => {
    usersList.innerHTML += `
    <li class="list-group-item">${user}</li>
    `;
  });
}

textEditor.addEventListener("keyup", () => {
  emitTextEditor({
    text: textEditor.value,
    documentName,
  });
});

function updateTextEditor(text) {
  textEditor.value = text;
}

deleteButton.addEventListener("click", () => {
  emitDeleteDocument(documentName);
});

function alertAndRedirect(doc) {
  if (doc === documentName) {
    alert(`Documento ${doc} excluido`);
    window.location.href = "/";
  }
}

export {
  updateTextEditor,
  alertAndRedirect,
  handleAllowUserSuccess,
  updateInterfaceUsers,
};
