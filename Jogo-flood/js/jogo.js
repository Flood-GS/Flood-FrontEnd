document.addEventListener("DOMContentLoaded", () => {
  const lixos = document.querySelectorAll(".lixo");
  const lixeiras = document.querySelectorAll(".lixeira");
  const area = document.querySelector(".lixos");
  const log = document.getElementById("log");
  const timerDisplay = document.getElementById("timer");

  let tempoRestante = 20;
  timerDisplay.textContent = `Tempo: ${tempoRestante}s`;

  lixos.forEach((lixo, index) => {
    lixo.id = `lixo-${index}`;
    const maxX = area.offsetWidth - lixo.offsetWidth;
    const maxY = area.offsetHeight - lixo.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    lixo.style.left = `${randomX}px`;
    lixo.style.top = `${randomY}px`;
    lixo.style.position = "absolute";
  });

  lixos.forEach(lixo => {
    lixo.addEventListener("dragstart", e => {
      e.dataTransfer.setData("tipo", e.target.dataset.tipo);
      e.dataTransfer.setData("id", e.target.id);
    });
  });

  let separados = 0;
  const totalLixos = lixos.length;

  function finalizarJogo(mensagem) {
    log.textContent = "";
    const mensagemFinal = document.getElementById("mensagem-final");
    const mensagemTexto = document.getElementById("mensagem-texto");

    mensagemTexto.textContent = mensagem;
    mensagemFinal.style.display = "block";

    lixeiras.forEach(lixeira => {
      lixeira.removeEventListener("dragover", dragOverHandler);
      lixeira.removeEventListener("drop", dropHandler);
    });

    clearInterval(timerInterval);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e) {
    e.preventDefault();
    const tipoLixo = e.dataTransfer.getData("tipo");
    const idLixo = e.dataTransfer.getData("id");
    const tipoLixeira = e.currentTarget.dataset.tipo;

    if (tipoLixo === tipoLixeira) {
      separados++;
      log.textContent = "✅ Lixo correto!";
      const lixoRemovido = document.getElementById(idLixo);
      if (lixoRemovido) lixoRemovido.remove();

      if (separados === totalLixos) {
        finalizarJogo("🎉 Enchente evitada! Você conseguiu a tempo!");
      }
    } else {
      log.textContent = "❌ Lixo errado! Jogue na lata certa.";
    }
  }

  lixeiras.forEach(lixeira => {
    lixeira.addEventListener("dragover", dragOverHandler);
    lixeira.addEventListener("drop", dropHandler);
  });

  const timerInterval = setInterval(() => {
    tempoRestante--;
    timerDisplay.textContent = `Tempo: ${tempoRestante}s`;

    if (tempoRestante <= 0) {
      finalizarJogo(
        separados === totalLixos
          ? "🎉 Enchente evitada! Você conseguiu a tempo!"
          : `⏰ Enchente não evitada! Você separou ${separados} de ${totalLixos} lixos. Tente de novo!`
      );
    }
  }, 1000);
});
function reiniciar() {
  location.reload();
}
