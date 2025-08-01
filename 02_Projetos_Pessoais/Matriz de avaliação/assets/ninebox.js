// ninebox.js
// Lê médias técnicas e de engajamento do localStorage e monta a matriz 9-Box automaticamente

function classificaNota(nota) {
  if (nota >= 7) return 'Alto';
  if (nota >= 4) return 'Médio';
  return 'Baixo';
}

function obterAlunosNineBox() {
  // Garante que window.alunos está carregado do alunos.js
  let nomes = window.alunos;
  if (!nomes || !Array.isArray(nomes) || nomes.length === 0) {
    // Tenta buscar do localStorage como fallback
    try {
      nomes = JSON.parse(localStorage.getItem('alunos'));
    } catch (e) { nomes = []; }
  }
  // Se ainda não encontrou, tenta buscar do script global (window)
  if ((!nomes || !Array.isArray(nomes) || nomes.length === 0) && window.getAlunos) {
    nomes = window.getAlunos();
  }
  // Se ainda não encontrou, retorna array vazio
  if (!nomes || !Array.isArray(nomes)) return [];
  // Remove espaços extras e filtra nomes vazios
  nomes = nomes.map(n => (typeof n === 'string' ? n.trim() : n)).filter(Boolean);
  return nomes.map((nome, index) => {
    // Média técnica já calculada e salva no localStorage
    const mediaTecnica = parseFloat(localStorage.getItem(`aluno${index}_media_tecnica`) || 0);
    // Média de engajamento já calculada e salva no localStorage
    const mediaEngajamento = parseFloat(localStorage.getItem(`aluno${index}_media_engajamento`) || 0);
    // Classificação
    const engajamentoClass = classificaNota(mediaEngajamento);
    const tecnicaClass = classificaNota(mediaTecnica);
    // Detalhes
    const detalhes = `Técnica: ${mediaTecnica.toFixed(2)} | Engajamento: ${mediaEngajamento.toFixed(2)}`;
    return {
      nome,
      engajamento: engajamentoClass,
      desempenho: tecnicaClass,
      detalhes,
      mediaTecnica: mediaTecnica.toFixed(2),
      mediaEngajamento: mediaEngajamento.toFixed(2)
    };
  });
}

function montarNineBox(filtro = '') {
  const quadrantes = {
    'Alto-Alto': { titulo: "1. Potencial máximo", cor: '#2ecc40', alunos: [] },
    'Alto-Médio': { titulo: "2. Engajado, precisa de reforço técnico", cor: '#ffdc00', alunos: [] },
    'Alto-Baixo': { titulo: "3. Persistente, sem domínio técnico", cor: '#ff4136', alunos: [] },
    'Médio-Alto': { titulo: "4. Promissor, mas instável", cor: '#ffdc00', alunos: [] },
    'Médio-Médio': { titulo: "5. Desenvolvimento equilibrado", cor: '#ffdc00', alunos: [] },
    'Médio-Baixo': { titulo: "6. Participa, sem avanços técnicos", cor: '#ff4136', alunos: [] },
    'Baixo-Alto': { titulo: "7. Talento técnico, pouco engajamento", cor: '#ff4136', alunos: [] },
    'Baixo-Médio': { titulo: "8. Apoio socioemocional", cor: '#ff4136', alunos: [] },
    'Baixo-Baixo': { titulo: "9. Alerta pedagógico", cor: '#ff4136', alunos: [] }
  };
  const alunos = obterAlunosNineBox();
  alunos.forEach(aluno => {
    const chave = `${aluno.engajamento}-${aluno.desempenho}`;
    if (quadrantes[chave]) {
      quadrantes[chave].alunos.push(aluno);
    }
  });
  const grid = document.getElementById('grade');
  if (!grid) return; // Evita erro se o elemento não existir
  grid.innerHTML = '';
  Object.entries(quadrantes).forEach(([chave, info]) => {
    const div = document.createElement('div');
    div.className = 'quadrante';
    div.style.background = info.cor;
    div.innerHTML = `<h3>${info.titulo}</h3>`;
    info.alunos.filter(a => a.nome.toLowerCase().includes(filtro)).forEach(aluno => {
      const aBox = document.createElement('div');
      aBox.className = 'aluno-box';
      aBox.innerHTML = `<strong>${aluno.nome}</strong><br><small>${aluno.detalhes}</small>`;
      div.appendChild(aBox);
    });
    grid.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  montarNineBox();
  const filtro = document.getElementById('filtroAluno');
  if (filtro) {
    filtro.addEventListener('input', e => {
      const termo = e.target.value.toLowerCase();
      montarNineBox(termo);
    });
  }
});
