import { emitAddDocument } from "./socket-front-index.js";
import { getCookie, removeCookie } from "./utils/cookies.js";

const tokenJwt = getCookie("tokenJwt");

//Elemento de lista de documentos
const documentsList = document.getElementById("lista-documentos");
const logoutButton = document.getElementById("botao-logout");

//Elemento do formulário
const form = document.getElementById("form-adiciona-documento");
const inputDocument = document.getElementById("input-documento");

logoutButton.addEventListener("click", () => {
  removeCookie("tokenJwt");
  alert("Logout realizado com sucesso!");
  window.location.href = "/login";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  emitAddDocument(inputDocument.value);

  inputDocument.value = null;
});

function insertDocumentLink(documentName) {
  documentsList.innerHTML += `
    <a 
        href="/documento/index.html?nome=${documentName}" 
        class="list-group-item list-group-item-action"
        id="documento-${documentName}"
        >
        ${documentName}
    </a>
    `;
}

function removeDocumentLink(documentName) {
  const doc = document.getElementById(`documento-${documentName}`);

  documentsList.removeChild(doc);
}

// insertDocumentLink("JavaScript");

export { insertDocumentLink, removeDocumentLink };
