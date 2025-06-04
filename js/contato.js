//Form do contato.html
const formulario = document.getElementById("form")
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("idNome").value.trim();
  const email = document.getElementById("idEmail").value.trim();
  const estado = document.getElementById("idEstado").value;
  const emergencia = document.getElementById("idEmergencia").value.trim();

  let isValid = true;
  document.getElementById("spanNome").style.display = "none";
  document.getElementById("spanEmail").style.display = "none";
  document.getElementById("spanEstado").style.display = "none";

  if (nome.length < 3) {
    document.getElementById("spanNome").style.display = "inline";
    isValid = false;
  }

  if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
    document.getElementById("spanEmail").style.display = "inline";
    isValid = false;
  }

  if (estado === "") {
    document.getElementById("spanEstado").style.display = "inline";
    isValid = false;
  }

  if (emergencia.length < 5) {
    alert("Descreva melhor a emergência (mínimo 5 caracteres).");
    isValid = false;
  }
  if (isValid) {
    alert("Dados enviados com sucesso! Retornaremos em breve.");
    formulario.reset();
  } else {
    alert("Dados incorretos, por favor tente novamente.");
  }
});

