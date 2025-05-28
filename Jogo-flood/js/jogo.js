document.addEventListener("DOMContentLoaded", () => {
  const lixos = document.querySelectorAll(".lixo");
  const lixeiras = document.querySelectorAll(".lixeira");
  const area = document.querySelector(".lixos");
  const log = document.getElementById("log");
  const relogio = document.getElementById("timer");

  let tempo = 20;
  relogio.textContent = `Tempo: ${tempo}s`;
  setTimeout(() => {
    lixos.forEach((lixo, i) => {
      lixo.id = `lixo-${i}`;
      const maxX = Math.max(area.offsetWidth - lixo.offsetWidth, 0);
      const maxY = Math.max(area.offsetHeight - lixo.offsetHeight, 0);
      const posX = Math.floor(Math.random() * maxX);
      const posY = Math.floor(Math.random() * maxY);
      lixo.style.left = `${posX}px`;
      lixo.style.top = `${posY}px`;
      lixo.style.position = "absolute";
    });
  }, 50);

  lixos.forEach(lixo => {
    lixo.addEventListener("dragstart", e => {
      e.dataTransfer.setData("tipo", e.target.dataset.tipo);
      e.dataTransfer.setData("id", e.target.id);
    });
  });

  let certos = 0;
  const total = lixos.length;

  function fimDoJogo(msg) {
    log.textContent = "";
    const mensagemFinal = document.getElementById("mensagem-final");
    const textoFinal = document.getElementById("mensagem-texto");

    textoFinal.textContent = msg;
    mensagemFinal.style.display = "block";

    lixeiras.forEach(lixeira => {
      lixeira.removeEventListener("dragover", permitirSoltar);
      lixeira.removeEventListener("drop", soltar);
    });

    clearInterval(intervalo);
  }

  function permitirSoltar(e) {
    e.preventDefault();
  }

  function soltar(e) {
    e.preventDefault();
    const tipoLixo = e.dataTransfer.getData("tipo");
    const idLixo = e.dataTransfer.getData("id");
    const tipoLixeira = e.currentTarget.dataset.tipo;

    if (tipoLixo === tipoLixeira) {
      certos++;
      log.textContent = "✅ Lixo correto!";
      const lixo = document.getElementById(idLixo);
      if (lixo) lixo.remove();

      if (certos === total) {
        fimDoJogo("🎉 Alagamento evitado! Você conseguiu a tempo!");
      }
    } else {
      log.textContent = "❌ Lixo errado! Jogue na lata certa.";
    }
  }

  lixeiras.forEach(lixeira => {
    lixeira.addEventListener("dragover", permitirSoltar);
    lixeira.addEventListener("drop", soltar);
  });

  const intervalo = setInterval(() => {
    tempo--;
    relogio.textContent = `Tempo: ${tempo}s`;

    if (tempo <= 0) {
      fimDoJogo(
        certos === total
          ? "🎉 Alagamento evitado! Você conseguiu a tempo!"
          : `⏰ Alagamento não evitado! Você separou ${certos} de ${total} lixos. Tente de novo!`
      );
    }
  }, 1000);
});

function reiniciar() {
  location.reload();
}

