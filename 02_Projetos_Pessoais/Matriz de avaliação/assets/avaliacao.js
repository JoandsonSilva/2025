function criarCard(aluno, index) {
      const div = document.createElement('div');
      div.className = 'card';

      const titulo = document.createElement('div');
      titulo.className = 'aluno-nome';
      titulo.textContent = aluno;
      div.appendChild(titulo);

      const aulas = document.createElement('div');
      aulas.className = 'secao';
      aulas.innerHTML = '<strong>Aulas:</strong><br>';
      for (let i = 1; i <= 10; i++) {
        const id = `aluno${index}_aula${i}`;
        aulas.innerHTML += `<label><input type="checkbox" id="${id}" onchange="calcular(${index})" ${localStorage.getItem(id) === 'true' ? 'checked' : ''}>${i}</label>`;
      }
      div.appendChild(aulas);

      const projetos = document.createElement('div');
      projetos.className = 'secao';
      projetos.innerHTML = '<strong>Miniprojetos:</strong><br>';
      for (let i = 1; i <= 10; i++) {
        const id = `aluno${index}_proj${i}`;
        projetos.innerHTML += `<label><input type="checkbox" id="${id}" onchange="calcular(${index})" ${localStorage.getItem(id) === 'true' ? 'checked' : ''}>${i}</label>`;
      }
      div.appendChild(projetos);

      const pontos = document.createElement('div');
      pontos.className = 'pontuacao';
      pontos.id = `pontos${index}`;
      div.appendChild(pontos);

      document.getElementById('lista-alunos').appendChild(div);
      calcular(index);
    }

    function calcular(index) {
      let total = 0;
      for (let i = 1; i <= 10; i++) {
        const id = `aluno${index}_aula${i}`;
        const check = document.getElementById(id);
        localStorage.setItem(id, check.checked);
        if (check.checked) total += 1;
      }
      for (let i = 1; i <= 10; i++) {
        const id = `aluno${index}_proj${i}`;
        const check = document.getElementById(id);
        localStorage.setItem(id, check.checked);
        if (check.checked) total += 1;
      }
      document.getElementById(`pontos${index}`).textContent = `Pontuação Total: ${total}/20`;
    }

    document.addEventListener('DOMContentLoaded', () => {
      alunos.forEach((nome, index) => criarCard(nome, index));
    });