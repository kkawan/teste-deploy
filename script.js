const perguntas = [
  {
    pergunta: "Pergunta 0",
    respostas: [
      { texto: "1", correta: true },
      { texto: "2", correta: false },
      { texto: "3", correta: false },
      { texto: "4", correta: false }
    ]
  },
  {
    pergunta: "Pergunta 1",
    respostas: [
      { texto: "1", correta: false },
      { texto: "2", correta: true },
      { texto: "3", correta: false },
      { texto: "4", correta: false }
    ]
  },
  {
    pergunta: "Pergunta 2",
    respostas: [
      { texto: "1", correta: false },
      { texto: "2", correta: true },
      { texto: "2", correta: false },
      { texto: "3", correta: false }
    ]
  },
  {
    pergunta: "Pergunta 3",
    respostas: [
      { texto: "1", correta: false },
      { texto: "2", correta: false },
      { texto: "3", correta: true },
      { texto: "4", correta: false }
    ]
  }
];

let indiceAtual = 0;
let pontuacao = 0;

function mostrarPergunta() {
  const perguntaAtual = perguntas[indiceAtual];
  document.getElementById("question").textContent = perguntaAtual.pergunta;

  perguntaAtual.respostas.forEach((resp, i) => {
    const btn = document.getElementById(`resposta${i}`);
    btn.textContent = resp.texto;
    btn.disabled = false;
    btn.style.backgroundColor = "#CA61C3";

    // Remove e re-adiciona a classe de animação para reiniciá-la
    btn.classList.remove("animate");
    void btn.offsetWidth; // força reflow para reiniciar a animação
    btn.classList.add("animate");
  });

  document.getElementById("next-btn").style.display = "none";
}
function escolherResposta(indiceResposta) {
  const perguntaAtual = perguntas[indiceAtual];
  const correta = perguntaAtual.respostas[indiceResposta].correta;

  const btn = document.getElementById(`resposta${indiceResposta}`);
  btn.style.backgroundColor = correta ? "green" : "red";

  if (correta) pontuacao++;

  // Desabilita todas as alternativas
  for (let i = 0; i < 4; i++) {
    document.getElementById(`resposta${i}`).disabled = true;
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("resultado").style.display = "block";
  document.getElementById("pontuacao").textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
}

function reiniciarQuiz() {
  indiceAtual = 0;
  pontuacao = 0;
  document.getElementById("resultado").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  mostrarPergunta();
}

// Inicializar
mostrarPergunta();
