// interacoes.js
function criarCard(aluno, index) {
  const config = window.configuracoesAvaliacao || { av1: 8, av2: 3, av3: 1 };
  const div = document.createElement('div');
  div.className = 'card';
  div.style.display = 'flex';
  div.style.flexDirection = 'row';
  div.style.justifyContent = 'space-between';
  div.style.alignItems = 'flex-start';
  div.style.gap = '18px';
  div.style.flexWrap = 'wrap';
  div.style.marginBottom = '12px';
  div.style.padding = '10px 8px';
  div.style.background = 'rgba(255,255,255,0.08)';
  div.style.borderRadius = '10px';
  div.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)';
  div.style.width = '100%';
  div.style.maxWidth = 'none';
  div.style.minWidth = '900px';

  const titulo = document.createElement('div');
  titulo.className = 'aluno-nome';
  titulo.textContent = aluno;
  titulo.style.fontWeight = 'bold';
  titulo.style.fontSize = '1.1em';
  titulo.style.color = '#fff';
  titulo.style.marginBottom = '6px';
  titulo.style.minWidth = '180px';
  titulo.style.maxWidth = '220px';
  div.appendChild(titulo);

  const flexContainer = document.createElement('div');
  flexContainer.style.display = 'flex';
  flexContainer.style.flexDirection = 'row';
  flexContainer.style.gap = '18px';
  flexContainer.style.flexWrap = 'nowrap';
  flexContainer.style.width = 'calc(100% - 200px)';
  flexContainer.style.minWidth = '700px';
  flexContainer.style.justifyContent = 'space-between';

  // AV1
  const aulasSecao = document.createElement('div');
  aulasSecao.className = 'secao';
  aulasSecao.innerHTML = `<strong style="font-size:0.95em">AV1 - Aulas</strong><br>`;
  aulasSecao.style.minWidth = '180px';
  aulasSecao.style.maxWidth = '220px';
  aulasSecao.style.display = 'flex';
  aulasSecao.style.flexDirection = 'column';
  aulasSecao.style.gap = '2px';
  for (let i = 1; i <= config.av1; i++) {
    const id = `aluno${index}_aula${i}`;
    const checked = localStorage.getItem(id + '_check') === 'true';
    const nota = parseFloat(localStorage.getItem(id + '_valor')) || 1;
    const comentario = localStorage.getItem(id + '_comentario') || '';
    const label = criarLabelComInput(i, checked, nota, comentario, 1, id);
    aulasSecao.appendChild(label);
  }
  flexContainer.appendChild(aulasSecao);

  // AV2
  const projetosSecao = document.createElement('div');
  projetosSecao.className = 'secao';
  projetosSecao.innerHTML = `<strong style="font-size:0.95em">AV2 - Miniprojetos</strong><br>`;
  projetosSecao.style.minWidth = '160px';
  projetosSecao.style.maxWidth = '200px';
  projetosSecao.style.display = 'flex';
  projetosSecao.style.flexDirection = 'column';
  projetosSecao.style.gap = '2px';
  for (let i = 1; i <= config.av2; i++) {
    const id = `aluno${index}_mini${i}`;
    const checked = localStorage.getItem(id + '_check') === 'true';
    const nota = parseFloat(localStorage.getItem(id + '_valor')) || 1;
    const comentario = localStorage.getItem(id + '_comentario') || '';
    const label = criarLabelComInput(`MP${i}`, checked, nota, comentario, 2, id);
    projetosSecao.appendChild(label);
  }
  flexContainer.appendChild(projetosSecao);

  // AV3 - Projeto Final com botão de perguntas
  const finalSecao = document.createElement('div');
  finalSecao.className = 'secao';
  finalSecao.style.minWidth = '220px';
  finalSecao.style.maxWidth = '320px';
  finalSecao.style.display = 'flex';
  finalSecao.style.flexDirection = 'column';
  finalSecao.style.gap = '4px';
  finalSecao.innerHTML = `<strong style="font-size:0.95em">Projeto Final</strong><br>`;

  const idNotaFinal = `aluno${index}_final_nota`;
  const notaFinal = parseFloat(localStorage.getItem(idNotaFinal)) || 0;
  const labelNota = document.createElement('label');
  labelNota.innerHTML = `Nota Final:`;
  labelNota.style.fontSize = '0.95em';
  const inputFinal = document.createElement('input');
  inputFinal.type = 'number';
  inputFinal.value = notaFinal;
  inputFinal.min = 0;
  inputFinal.max = 10;
  inputFinal.step = 0.1;
  inputFinal.style.width = '48px';
  inputFinal.style.fontSize = '0.95em';
  inputFinal.oninput = () => localStorage.setItem(idNotaFinal, inputFinal.value);
  labelNota.appendChild(inputFinal);
  finalSecao.appendChild(labelNota);

  const btnPerguntas = document.createElement('button');
  btnPerguntas.textContent = 'Perguntas';
  btnPerguntas.style.marginTop = '8px';
  btnPerguntas.style.fontSize = '12px';
  btnPerguntas.style.padding = '4px 10px';

  const perguntasContainer = document.createElement('div');
  perguntasContainer.style.display = 'none';
  perguntasContainer.style.border = '1px solid #ccc';
  perguntasContainer.style.padding = '6px';
  perguntasContainer.style.marginTop = '6px';
  perguntasContainer.style.background = 'rgba(68, 8, 8, 0.05)';
  perguntasContainer.style.color = '#1a237e';
  perguntasContainer.style.fontWeight = '500';

  const perguntas = [
    "O que é uma tag semântica?",
    "Pra que serve o <header>?",
    "Qual a diferença entre <section> e <div>?",
    "Por que usaram a tag <a>?",
    "Mostre o local no código onde está o <footer> e explique o que tem dentro.",
    "Onde está o código que muda a cor de fundo da página?",
    "Como vocês fizeram para mudar a fonte do título principal?",
    "Que seletor vocês usaram para estilizar os botões?",
    "Qual foi a estratégia de espaçamento entre os blocos de jogos? (margin/padding)",
    "O que significa a propriedade text-align: center; que aparece no CSS de vocês?",
    "O que é uma Landing Page? (Resposta curta)",
    "Quais são 2 exemplos de tags semânticas do HTML usadas no seu projeto?",
    "Para que usamos o CSS em uma página web?",
    "Qual seletor CSS usamos para alterar a cor de um título?",
    "O que faz o atributo target=\"_blank\" na tag <a>?",
    "O que você fez especificamente na sua Landing Page? (Resposta obrigatória – descrição pessoal)"
  ];

  perguntas.forEach((pergunta, qIndex) => {
    const resposta = localStorage.getItem(`aluno${index}_final_q${qIndex}`) || '';
    const perguntaLabel = document.createElement('label');
    perguntaLabel.style.display = 'block';
    perguntaLabel.style.marginTop = '8px';
    perguntaLabel.style.color = 'white';

    const tituloPergunta = document.createElement('strong');
    tituloPergunta.textContent = pergunta;
    perguntaLabel.appendChild(tituloPergunta);

    const respostaTextarea = document.createElement('textarea');
    respostaTextarea.value = resposta;
    respostaTextarea.style.width = '100%';
    respostaTextarea.style.marginTop = '4px';
    respostaTextarea.style.fontSize = '0.9em';
    respostaTextarea.onchange = () => {
      localStorage.setItem(`aluno${index}_final_q${qIndex}`, respostaTextarea.value);
    };
    perguntaLabel.appendChild(respostaTextarea);

    perguntasContainer.appendChild(perguntaLabel);
  });

  btnPerguntas.onclick = () => {
    perguntasContainer.style.display = perguntasContainer.style.display === 'none' ? 'block' : 'none';
  };

  finalSecao.appendChild(btnPerguntas);
  finalSecao.appendChild(perguntasContainer);

  flexContainer.appendChild(finalSecao);
  div.appendChild(flexContainer);

  const pontos = document.createElement('div');
  pontos.className = 'pontuacao';
  pontos.id = `pontos${index}`;
  pontos.style.fontSize = '0.98em';
  pontos.style.marginTop = '6px';
  div.appendChild(pontos);

  document.getElementById('lista-alunos').appendChild(div);
}

function criarLabelComInput(rotulo, checked, nota, comentario, maxNota, id) {
  const label = document.createElement('label');
  label.style.display = 'flex';
  label.style.alignItems = 'center';
  label.style.gap = '2px';
  label.style.fontSize = '0.95em';
  label.style.margin = '0';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.style.margin = '0 2px 0 0';
  checkbox.onchange = () => salvarDados();
  label.appendChild(checkbox);

  const span = document.createElement('span');
  span.textContent = rotulo;
  span.style.marginRight = '2px';
  label.appendChild(span);

  const inputNota = document.createElement('input');
  inputNota.type = 'number';
  inputNota.value = nota;
  inputNota.min = 0;
  inputNota.max = maxNota;
  inputNota.step = 0.1;
  inputNota.style.width = '38px';
  inputNota.style.fontSize = '0.95em';
  inputNota.style.margin = '0 2px';
  inputNota.onchange = () => salvarDados();
  label.appendChild(inputNota);

  const areaComentario = document.createElement('input');
  areaComentario.type = 'text';
  areaComentario.placeholder = 'Coment.';
  areaComentario.value = comentario;
  areaComentario.style.width = '180px';
  areaComentario.style.fontSize = '0.93em';
  areaComentario.style.margin = '0 2px';
  areaComentario.oninput = () => salvarDados();
  label.appendChild(areaComentario);

  return label;
}

function salvarDados() {
  // implementação futura
}

function filtrarAlunos() {
  const termo = document.getElementById('filtro').value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    const nome = card.querySelector('.aluno-nome').textContent.toLowerCase();
    card.style.display = nome.includes(termo) ? 'block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const inputBusca = document.createElement('input');
  inputBusca.type = 'text';
  inputBusca.className = 'busca';
  inputBusca.id = 'filtro';
  inputBusca.placeholder = 'Buscar aluno pelo nome';
  inputBusca.oninput = filtrarAlunos;
  document.body.insertBefore(inputBusca, document.getElementById('lista-alunos'));

  alunos.forEach((nome, index) => {
    criarCard(nome, index);
  });
});


