function verificarLogin() {
  const user = localStorage.getItem('user');
  const authBtn = document.getElementById('auth-button');
  const userInfo = document.getElementById('user-info');

  if (user) {
    userInfo.textContent = `Olá, ${user}`;
    authBtn.textContent = 'Sair';
    authBtn.onclick = () => {
      localStorage.removeItem('user');
      location.reload();
    };
    iniciar(); // só inicia se estiver logado
  } else {
    userInfo.textContent = 'Você não está logado';
    authBtn.textContent = 'Entrar';
    authBtn.onclick = () => {
      window.location.href = 'login.html';
    };

    // Esconde as seções
    document.querySelectorAll('section, .total').forEach(el => el.style.display = 'none');
  }
}

// código da plataforma mantido aqui
function criarCheckbox(id, nome, ponto, tipo) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${nome}
    <input type="checkbox" id="${id}" ${localStorage.getItem(id) === 'true' ? 'checked' : ''}>
  `;
  li.querySelector('input').addEventListener('change', (e) => {
    localStorage.setItem(id, e.target.checked);
    atualizarPontuacao();
  });
  document.getElementById(tipo).appendChild(li);
}

function atualizarPontuacao() {
  let total = 0;
  for (let i = 1; i <= 5; i++) {
    if (localStorage.getItem(`html${i}`) === 'true') total += 1;
    if (localStorage.getItem(`css${i}`) === 'true') total += 1;
  }
  for (let i = 1; i <= 5; i++) {
    if (localStorage.getItem(`proj${i}`) === 'true') total += 2;
  }
  document.getElementById('total-pontos').textContent = total;
}

function iniciar() {
  for (let i = 1; i <= 5; i++) {
    criarCheckbox(`html${i}`, `Aula ${i} - HTML`, 1, 'aulas-html');
    criarCheckbox(`css${i}`, `Aula ${i + 5} - CSS`, 1, 'aulas-css');
    criarCheckbox(`proj${i}`, `Miniprojeto ${i}`, 2, 'projetos-lista');
  }
  atualizarPontuacao();
}

document.addEventListener('DOMContentLoaded', verificarLogin);
