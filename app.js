import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwSvc1fAPZyX_wlj09SjAjxkclMBp8Z5o",
  authDomain: "mural-da-turma-2569e.firebaseapp.com",
  databaseURL: "https://mural-da-turma-2569e-default-rtdb.firebaseio.com",
  projectId: "mural-da-turma-2569e",
  storageBucket: "mural-da-turma-2569e.firebasestorage.app",
  messagingSenderId: "555049630093",
  appId: "1:555049630093:web:a75eb38a87d51f07d365c4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("form-recado");
const lista = document.getElementById("lista-recados");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const autor = document.getElementById("autor").value;
  const turma = document.getElementById("turma").value;
  const mensagem = document.getElementById("mensagem").value;

  push(ref(db, "recados"), {
    autor,
    turma,
    mensagem
  });

  form.reset();
});

onValue(ref(db, "recados"), (snapshot) => {
  lista.innerHTML = "";

  snapshot.forEach((item) => {
    const dados = item.val();

    lista.innerHTML += `
      <div class="recado">
        <strong>${dados.autor}</strong> - ${dados.turma}
        <p>${dados.mensagem}</p>
        <button onclick="remover('${item.key}')">Excluir</button>
      </div>
    `;
  });
});

window.remover = (id) => {
  remove(ref(db, "recados/" + id));
};