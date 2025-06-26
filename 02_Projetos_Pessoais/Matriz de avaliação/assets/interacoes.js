// interacoes.js
function criarCard(aluno, index) {
  const div = document.createElement('div');
  div.className = 'card';

  const titulo = document.createElement('div');
  titulo.className = 'aluno-nome';
  titulo.textContent = aluno;
  div.appendChild(titulo);

  // Aulas (8)
  const aulasSecao = document.createElement('div');
  aulasSecao.className = 'secao';
  aulasSecao.innerHTML = `<strong>Aulas:</strong><br>`;
  for (let i = 1; i <= 8; i++) {
    const id = `aluno${index}_aula${i}`;
    const checked = localStorage.getItem(id + '_check') === 'true';
    const nota = parseFloat(localStorage.getItem(id + '_valor')) || 1;
    const comentario = localStorage.getItem(id + '_comentario') || '';

    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.onchange = () => salvarDados();
    label.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = `${i}`;
    label.appendChild(span);

    const inputNota = document.createElement('input');
    inputNota.type = 'number';
    inputNota.value = nota;
    inputNota.min = 0;
    inputNota.max = 1;
    inputNota.step = 0.1;
    inputNota.onchange = () => salvarDados();
    label.appendChild(inputNota);

    const areaComentario = document.createElement('textarea');
    areaComentario.placeholder = 'Comentário (opcional)';
    areaComentario.value = comentario;
    areaComentario.oninput = () => salvarDados();
    label.appendChild(areaComentario);

    aulasSecao.appendChild(label);
  }
  div.appendChild(aulasSecao);

  // Miniprojetos (3)
  const projetosSecao = document.createElement('div');
  projetosSecao.className = 'secao';
  projetosSecao.innerHTML = `<strong>Miniprojetos:</strong><br>`;
  for (let i = 1; i <= 3; i++) {
    const id = `aluno${index}_mini${i}`;
    const checked = localStorage.getItem(id + '_check') === 'true';
    const nota = parseFloat(localStorage.getItem(id + '_valor')) || 1;
    const comentario = localStorage.getItem(id + '_comentario') || '';

    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.onchange = () => salvarDados();
    label.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = `MP${i}`;
    label.appendChild(span);

    const inputNota = document.createElement('input');
    inputNota.type = 'number';
    inputNota.value = nota;
    inputNota.min = 0;
    inputNota.max = 2;
    inputNota.step = 0.1;
    inputNota.onchange = () => salvarDados();
    label.appendChild(inputNota);

    const areaComentario = document.createElement('textarea');
    areaComentario.placeholder = 'Comentário (opcional)';
    areaComentario.value = comentario;
    areaComentario.oninput = () => salvarDados();
    label.appendChild(areaComentario);

    projetosSecao.appendChild(label);
  }
  div.appendChild(projetosSecao);

  // Projeto Final
  const finalSecao = document.createElement('div');
  finalSecao.className = 'secao';
  finalSecao.innerHTML = `<strong>Projeto Final - Landing Page:</strong><br>`;

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

  perguntas.forEach((texto, qIndex) => {
    const id = `aluno${index}_final_q${qIndex}`;
    const resposta = localStorage.getItem(id) || '';

    const label = document.createElement('label');
    label.innerHTML = `<em style='display:block; margin-top: 15px;'>${texto}</em>`;
    const textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.minHeight = '60px';
    textarea.style.marginTop = '5px';
    textarea.style.fontSize = '14px';
    textarea.value = resposta;
    textarea.oninput = () => salvarDados();
    label.appendChild(textarea);
    finalSecao.appendChild(label);
  });

  const idNotaFinal = `aluno${index}_final_nota`;
  const notaFinal = parseFloat(localStorage.getItem(idNotaFinal)) || 0;
  const labelNota = document.createElement('label');
  labelNota.innerHTML = `Nota Final:`;
  const inputFinal = document.createElement('input');
  inputFinal.type = 'number';
  inputFinal.value = notaFinal;
  inputFinal.min = 0;
  inputFinal.max = 10;
  inputFinal.step = 0.1;
  inputFinal.oninput = () => salvarDados();
  labelNota.appendChild(inputFinal);
  finalSecao.appendChild(labelNota);

  div.appendChild(finalSecao);

  const pontos = document.createElement('div');
  pontos.className = 'pontuacao';
  pontos.id = `pontos${index}`;
  div.appendChild(pontos);

  document.getElementById('lista-alunos').appendChild(div);
  calcular(index);
}

function salvarDados() {
  document.querySelectorAll('.card').forEach((card, index) => {
    const labels = card.querySelectorAll('label');
    let total = 0;
    let count = 0;

    labels.forEach((label, i) => {
      const checkbox = label.querySelector('input[type="checkbox"]');
      const inputNota = label.querySelector('input[type="number"]');
      const textarea = label.querySelector('textarea');

      if (label.innerHTML.includes('Projeto Final')) return;

      if (checkbox && inputNota && textarea) {
        const tipo = i < 8 ? 'aula' : i < 11 ? 'mini' : '';
        const numero = tipo ? (i % 8) + 1 : '';
        const id = `aluno${index}_${tipo}${numero}`;

        localStorage.setItem(id + '_check', checkbox.checked);
        localStorage.setItem(id + '_valor', inputNota.value);
        localStorage.setItem(id + '_comentario', textarea.value);

        if (checkbox.checked) {
          total += parseFloat(inputNota.value || 0);
        }
      } else if (textarea && !checkbox) {
        const id = `aluno${index}_final_q${count}`;
        localStorage.setItem(id, textarea.value);
        count++;
      }
    });

    const notaFinal = card.querySelector('input[type="number"][max="10"]');
    const idNotaFinal = `aluno${index}_final_nota`;
    if (notaFinal) {
      localStorage.setItem(idNotaFinal, notaFinal.value);
      total += parseFloat(notaFinal.value || 0);
    }

    document.getElementById(`pontos${index}`).textContent = `Pontuação Total: ${total.toFixed(1)}/24`;
  });
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

  alunos.forEach((nome, index) => criarCard(nome, index));
});


// O trecho abaixo será usado no relatório de produção (modo colapsável)
function gerarRelatorioCompleto() {
  const alunosContainer = document.getElementById('lista-relatorio');
  alunosContainer.innerHTML = '';

  alunos.forEach((aluno, index) => {
    const card = document.createElement('div');
    card.className = 'relatorio-card';

    const header = document.createElement('div');
    header.className = 'relatorio-header';
    header.innerHTML = `<strong>${aluno}</strong>`;
    header.style.cursor = 'pointer';
    header.onclick = () => {
      const corpo = card.querySelector('.relatorio-body');
      corpo.style.display = corpo.style.display === 'none' ? 'block' : 'none';
    };

    const corpo = document.createElement('div');
    corpo.className = 'relatorio-body';
    corpo.style.display = 'none';

    let total = 0;
    for (let i = 1; i <= 8; i++) {
      const nota = parseFloat(localStorage.getItem(`aluno${index}_aula${i}_valor`) || 0);
      total += nota;
    }
    for (let i = 1; i <= 3; i++) {
      const nota = parseFloat(localStorage.getItem(`aluno${index}_mini${i}_valor`) || 0);
      total += nota;
    }
    const notaFinal = parseFloat(localStorage.getItem(`aluno${index}_final_nota`) || 0);
    total += notaFinal;

    const resumo = document.createElement('p');
    resumo.innerHTML = `<strong>Total:</strong> ${total.toFixed(1)} / 24<br><strong>Nota Projeto Final:</strong> ${notaFinal}`;
    corpo.appendChild(resumo);

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
      const resposta = localStorage.getItem(`aluno${index}_final_q${qIndex}`) || '-';
      const bloco = document.createElement('div');
      bloco.className = 'pergunta-bloco';
      bloco.innerHTML = `<em>${pergunta}</em><br><span>${resposta}</span>`;
      corpo.appendChild(bloco);
    });

    card.appendChild(header);
    card.appendChild(corpo);
    alunosContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lista-relatorio')) {
    gerarRelatorioCompleto();
  }
});



function gerarRelatorioCompleto() {
  const alunosContainer = document.getElementById('lista-relatorio');
  alunosContainer.innerHTML = '';

  const termoBusca = document.getElementById('filtro')?.value?.toLowerCase() || '';

  alunos.forEach((aluno, index) => {
    if (!aluno.toLowerCase().includes(termoBusca)) return;

    const card = document.createElement('div');
    card.className = 'relatorio-card';
    card.style.marginBottom = '20px';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '10px';
    card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    card.style.overflow = 'hidden';

    const header = document.createElement('div');
    header.className = 'relatorio-header';
    header.innerHTML = `<strong>${aluno}</strong>`;
    header.style.padding = '12px';
    header.style.background = '#f2f2f2';
    header.style.cursor = 'pointer';
    header.style.fontSize = '16px';
    header.onclick = () => {
      const corpo = card.querySelector('.relatorio-body');
      corpo.style.display = corpo.style.display === 'none' ? 'block' : 'none';
    };

    const corpo = document.createElement('div');
    corpo.className = 'relatorio-body';
    corpo.style.display = 'none';
    corpo.style.padding = '15px';
    corpo.style.background = '#fff';

    let total = 0;
    for (let i = 1; i <= 8; i++) {
      const nota = parseFloat(localStorage.getItem(`aluno${index}_aula${i}_valor`) || 0);
      total += nota;
    }
    for (let i = 1; i <= 3; i++) {
      const nota = parseFloat(localStorage.getItem(`aluno${index}_mini${i}_valor`) || 0);
      total += nota;
    }
    const notaFinal = parseFloat(localStorage.getItem(`aluno${index}_final_nota`) || 0);
    total += notaFinal;

    const resumo = document.createElement('div');
    resumo.innerHTML = `<p><strong>Total:</strong> ${total.toFixed(1)} / 24<br><strong>Nota Projeto Final:</strong> ${notaFinal}</p>`;
    resumo.style.marginBottom = '15px';
    corpo.appendChild(resumo);

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
      const resposta = localStorage.getItem(`aluno${index}_final_q${qIndex}`) || '-';
      const bloco = document.createElement('div');
      bloco.className = 'pergunta-bloco';
      bloco.style.marginBottom = '12px';
      bloco.style.padding = '10px';
      bloco.style.border = '1px solid #ddd';
      bloco.style.borderRadius = '8px';
      bloco.style.backgroundColor = '#fafafa';
      bloco.innerHTML = `<strong>${pergunta}</strong><br><span style="display:block; margin-top: 5px; color: #333;">${resposta}</span>`;
      corpo.appendChild(bloco);
    });

    card.appendChild(header);
    card.appendChild(corpo);
    alunosContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lista-relatorio')) {
    gerarRelatorioCompleto();
    document.getElementById('filtro')?.addEventListener('input', gerarRelatorioCompleto);
  }
});
