//Conts e lets
  const quiz = [
  {
    pergunta: "Qual é a principal diferença entre enchente e alagamento?",
    opcoes: [
      "A enchente ocorre por falhas humanas e o alagamento por causas naturais",
      "A enchente é um transbordamento de rios; o alagamento é um acúmulo temporário de água em áreas urbanas",
      "O alagamento dura mais tempo que a enchente",
      "Enchente ocorre apenas no campo; alagamento, na cidade"
    ],
    certa: "A enchente é um transbordamento de rios; o alagamento é um acúmulo temporário de água em áreas urbanas"
  },
  {
    pergunta: "Qual das alternativas a seguir é uma causa humana das enchentes?",
    opcoes: [
      "Chuvas torrenciais",
      "Rompimento natural de barragens",
      "Ocupação irregular do solo e impermeabilização com asfalto",
      "Aumento do nível de rios por degelo"
    ],
    certa: "Ocupação irregular do solo e impermeabilização com asfalto"
  },
  {
    pergunta: "O que caracteriza uma inundação, segundo a definição apresentada?",
    opcoes: [
      "O entupimento de bueiros em áreas urbanas",
      "A formação de grandes lagos em locais desérticos",
      "O transbordamento de água para áreas secas, geralmente por falhas no sistema de drenagem",
      "O aumento gradual do lençol freático"
    ],
    certa: "O transbordamento de água para áreas secas, geralmente por falhas no sistema de drenagem"
  },
  {
    pergunta: "Qual medida ajuda a prevenir enchentes e alagamentos nas cidades?",
    opcoes: [
      "Construção de sistemas de drenagem eficientes e preservação da vegetação",
      "Construção em áreas de várzea",
      "Canalização de todos os córregos urbanos",
      "Eliminação de áreas verdes para construção de moradias"
    ],
    certa: "Construção de sistemas de drenagem eficientes e preservação da vegetação"
  },
  {
    pergunta: "O que se deve fazer durante situações de enchente?",
    opcoes: [
      "Procurar abrigo em áreas baixas próximas a rios",
      "Ignorar avisos meteorológicos para evitar pânico",
      "Jogar objetos pesados em bueiros para evitar entupimento",
      "Seguir planos de evacuação e procurar locais seguros"
    ],
    certa: "Seguir planos de evacuação e procurar locais seguros"
  }
];


let atual = 0;
let pontos = 0;

const perguntas = document.getElementById("perguntasquiz");
const opcoes = document.getElementById("respostasquiz");
const botao = document.getElementById("proxima");
const resultado = document.getElementById("pontos");
const botaoReiniciar = document.getElementById("reiniciar");
const mensagem = document.getElementById("mensagem-resposta");

//Funções
function mostrar() {
  const item = quiz[atual];
  perguntas.textContent = item.pergunta;
  opcoes.innerHTML = "";
  item.opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => checar(opcao));
    opcoes.appendChild(btn);
  });

  botao.style.display = "none";
  mensagem.textContent = "";
  mensagem.classList.remove("mensagem-certa", "mensagem-errada");
}
function checar(resposta) {
  const certa = quiz[atual].certa;
  Array.from(opcoes.children).forEach(btn => {
    btn.disabled = true;

    if (btn.textContent === certa) {
      btn.classList.add("correct");
    }

    if (btn.textContent === resposta && resposta !== certa) {
      btn.classList.add("wrong");
    }
  });
  mensagem.classList.remove("mensagem-certa", "mensagem-errada");

  if (resposta === certa) {
    pontos++;
    mensagem.textContent = "✅ Resposta certa!";
    mensagem.classList.add("mensagem-certa");
  } else {
    mensagem.textContent = `❌ Errado! A resposta certa era: "${certa}"`;
    mensagem.classList.add("mensagem-errada");
  }

  botao.style.display = "inline-block";
}

function proximaPergunta() {
  atual++;

  if (atual < quiz.length) {
    mostrar();
  } else {
    fim();
  }
}

function reiniciar() {
  atual = 0;
  pontos = 0;
  resultado.textContent = "";
  botaoReiniciar.style.display = "none";
  botao.style.display = "inline";
  mostrar();
}

function fim() {
  perguntas.textContent = "Fim do quiz!";
  opcoes.innerHTML = "";
  botao.style.display = "none";
  resultado.textContent = `Você acertou ${pontos} de ${quiz.length} perguntas.`;

  mensagem.textContent = "";
  mensagem.classList.remove("mensagem-certa", "mensagem-errada");

  botaoReiniciar.style.display = "inline"; 
}

botao.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciar);

mostrar();