// Backend básico em Node.js/Express para gerenciar usuários
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Simulação de banco de dados em memória
let usuarios = [
  { id: 1, nome: 'João', idade: 25 },
  { id: 2, nome: 'Maria', idade: 30 }
];
let nextId = 3;

// Listar todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Adicionar novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, idade } = req.body;
  const novoUsuario = { id: nextId++, nome, idade };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Editar usuário existente
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, idade } = req.body;
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  usuario.nome = nome;
  usuario.idade = idade;
  res.json(usuario);
});

// Excluir usuário
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  res.json({ mensagem: 'Usuário excluído' });
});


// Servir arquivos estáticos (HTML, JS, CSS)
const path = require('path');
app.use(express.static(path.join(__dirname)));

// Rota para a raiz mostra o gerenciamento.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'gerenciamento.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

