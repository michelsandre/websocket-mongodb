import { emitTextEditor, selectDocument } from "./socket-front-document.js";

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get("nome");

const documentTitle = document.getElementById("titulo-documento");
const textEditor = document.getElementById("editor-texto");

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

export { updateTextEditor };
