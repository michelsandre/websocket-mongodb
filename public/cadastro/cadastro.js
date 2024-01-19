import { emitRegisterUser } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = form["input-usuario"].value;
  const password = form["input-senha"].value;

  emitRegisterUser({ user, password });
});
