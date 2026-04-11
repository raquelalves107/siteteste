import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwSvc1fAPZyX_wlj09SjAjxkclMBp8Z5o",
  authDomain: "mural-da-turma-2569e.firebaseapp.com",
  projectId: "mural-da-turma-2569e",
  storageBucket: "mural-da-turma-2569e.firebasestorage.app",
  messagingSenderId: "555049630093",
  appId: "1:555049630093:web:a75eb38a87d51f07d365c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("form-recado");
const listaRecados = document.getElementById("lista-recados");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const autor = document.getElementById("autor").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!autor || !turma || !mensagem) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    await addDoc(collection(db, "recados"), {
      autor,
      turma,
      mensagem,
      criadoEm: serverTimestamp()
    });

    form.reset();
  } catch (erro) {
    console.error("Erro ao salvar recado:", erro);
    alert("Não foi possível salvar o recado.");
  }
});

const consulta = query(collection(db, "recados"), orderBy("criadoEm", "desc"));

onSnapshot(consulta, (snapshot) => {
  listaRecados.innerHTML = "";

  snapshot.forEach((documento) => {
    const recado = documento.data();

    const card = document.createElement("div");
    card.className = "recado";

    card.innerHTML = `
      <h3>${recado.autor}</h3>
      <p><strong>Turma:</strong> ${recado.turma}</p>
      <p>${recado.mensagem}</p>
      <button data-id="${documento.id}">Excluir</button>
    `;

    listaRecados.appendChild(card);
  });

  const botoesExcluir = document.querySelectorAll("[data-id]");

  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", async () => {
      const id = botao.getAttribute("data-id");

      try {
        await deleteDoc(doc(db, "recados", id));
      } catch (erro) {
        console.error("Erro ao excluir recado:", erro);
        alert("Não foi possível excluir o recado.");
      }
    });
  });
});