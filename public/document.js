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

documentTitle.textContent = documentName || "Documento sem título";

selectDocument(documentName);

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

export { updateTextEditor, alertAndRedirect };
