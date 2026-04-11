function mostrarMensagem() {
  const destinos = ["Paris", "Tokyo", "Maldivas"];
  const sorteio = destinos[Math.floor(Math.random() * destinos.length)];

  document.getElementById("mensagem").innerText =
    "🌟 Seu próximo destino é: " + sorteio;
}