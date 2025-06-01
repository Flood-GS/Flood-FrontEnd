//Form do contato.html
const formulario = document.getElementById("form");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = document.getElementById("idNome").value.trim();
  const email = document.getElementById("idEmail").value.trim();

  let isValid = true;
  document.getElementById("spanNome").style.display = "none";
  document.getElementById("spanEmail").style.display = "none";

  if (nome.length < 3) {
    document.getElementById("spanNome").style.display = "inline";
    isValid = false;
  }

  if (email.length < 5 || !email.includes("@")) {
    document.getElementById("spanEmail").style.display = "inline";
    isValid = false;
  }

  if (isValid) {
    alert("Dados enviados com sucesso! Retornaremos em breve.");
    formulario.reset();
  } else {
    alert("Dados incorretos, por favor tente novamente.");
  }
});

