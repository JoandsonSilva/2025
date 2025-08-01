// execucao_verbo.js
// Lê dados do localStorage, calcula médias e monta a matriz 9-Box dinamicamente

// Função para classificar nota
function classificaNota(nota) {
  if (nota >= 7) return 'Alto';
  if (nota >= 4) return 'Médio';
  return 'Baixo';
}

// Função para buscar todos os alunos do localStorage
function obterAlunosComNotas() {
  if (!window.alunos) return [];
  return alunos.map((nome, index) => {
    // Notas técnicas
    const av1 = parseFloat(localStorage.getItem(`aluno${index}_tecnica_av1`) || 0);
    const av2 = parseFloat(localStorage.getItem(`aluno${index}_tecnica_av2`) || 0);
    const av3 = parseFloat(localStorage.getItem(`aluno${index}_tecnica_av3`) || 0);
    // Engajamento
    const constancia = parseFloat(localStorage.getItem(`aluno${index}_engajamento_constancia`) || 0);
    const equipe = parseFloat(localStorage.getItem(`aluno${index}_engajamento_equipe`) || 0);
    const participacao = parseFloat(localStorage.getItem(`aluno${index}_engajamento_participacao`) || 0);
    // Médias
    const mediaTecnica = ((av1 + av2 + av3) / 3) || 0;
    const mediaEngajamento = ((constancia + equipe + participacao) / 3) || 0;
    const mediaFinal = (mediaTecnica && mediaEngajamento) ? ((mediaTecnica + mediaEngajamento) / 2) : 0;
    // Classificação
    const engajamentoClass = classificaNota(mediaEngajamento);
    const tecnicaClass = classificaNota(mediaTecnica);
    // Detalhes
    const detalhes = `AV1: ${av1} | AV2: ${av2} | AV3: ${av3} | Constância: ${constancia} | Equipe: ${equipe} | Participação: ${participacao}`;
    return {
      nome,
      engajamento: engajamentoClass,
      desempenho: tecnicaClass,
      detalhes,
      mediaTecnica: mediaTecnica.toFixed(2),
      mediaEngajamento: mediaEngajamento.toFixed(2),
      mediaFinal: mediaFinal.toFixed(2)
    };
  });
}

// Monta a matriz 9-Box com base nos dados reais
function montarQuadrantesDinamico(filtro = '') {
  const quadrantes = {
    'Alto-Alto': { titulo: "1. Potencial máximo", alunos: [] },
    'Alto-Médio': { titulo: "2. Engajado, precisa de reforço técnico", alunos: [] },
    'Alto-Baixo': { titulo: "3. Persistente, sem domínio técnico", alunos: [] },
    'Médio-Alto': { titulo: "4. Promissor, mas instável", alunos: [] },
    'Médio-Médio': { titulo: "5. Desenvolvimento equilibrado", alunos: [] },
    'Médio-Baixo': { titulo: "6. Participa, sem avanços técnicos", alunos: [] },
    'Baixo-Alto': { titulo: "7. Talento técnico, pouco engajamento", alunos: [] },
    'Baixo-Médio': { titulo: "8. Apoio socioemocional", alunos: [] },
    'Baixo-Baixo': { titulo: "9. Alerta pedagógico", alunos: [] }
  };
  const alunos = obterAlunosComNotas();
  alunos.forEach(aluno => {
    const chave = `${aluno.engajamento}-${aluno.desempenho}`;
    if (quadrantes[chave]) {
      quadrantes[chave].alunos.push(aluno);
    }
  });
  const grid = document.getElementById('grade');
  grid.innerHTML = '';
  Object.entries(quadrantes).forEach(([chave, info]) => {
    const div = document.createElement('div');
    div.className = 'quadrante';
    div.innerHTML = `<h3>${info.titulo}</h3>`;
    info.alunos.filter(a => a.nome.toLowerCase().includes(filtro)).forEach(aluno => {
      const aBox = document.createElement('div');
      aBox.className = 'aluno-box';
      aBox.innerHTML = `<strong>${aluno.nome}</strong><br><small>${aluno.detalhes}</small><br><span style='font-size:12px'>Técnica: <b>${aluno.mediaTecnica}</b> | Engajamento: <b>${aluno.mediaEngajamento}</b> | Média: <b>${aluno.mediaFinal}</b></span>`;
      div.appendChild(aBox);
    });
    grid.appendChild(div);
  });
}

// Aguarda o carregamento do array alunos (de alunos.js)
document.addEventListener('DOMContentLoaded', () => {
  montarQuadrantesDinamico();
  document.getElementById('filtroAluno').addEventListener('input', e => {
    const termo = e.target.value.toLowerCase();
    montarQuadrantesDinamico(termo);
  });
});
