import { emitAddDocument } from "./socket-front-index.js";

//Elemento de lista de documentos
const documentsList = document.getElementById("lista-documentos");

//Elemento do formulário
const form = document.getElementById("form-adiciona-documento");
const inputDocument = document.getElementById("input-documento");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  emitAddDocument(inputDocument.value);

  inputDocument.value = null;
});

function insertDocumentLink(documentName) {
  documentsList.innerHTML += `
    <a 
        href="documento.html?nome=${documentName}" 
        class="list-group-item list-group-item-action">
        ${documentName}
    </a>
    `;
}

// insertDocumentLink("JavaScript");

export { insertDocumentLink };
