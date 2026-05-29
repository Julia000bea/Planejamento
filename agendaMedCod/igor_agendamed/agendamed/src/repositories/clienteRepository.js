const fs = require('fs');
const path = require('path');

const ARQUIVO = path.join(__dirname, '../data/clientes.json');

function lerDados() {
  if (!fs.existsSync(ARQUIVO)) return [];
  return JSON.parse(fs.readFileSync(ARQUIVO, 'utf-8'));
}

function salvarDados(dados) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2), 'utf-8');
}

function findAll() {
  return lerDados();
}

function findById(id) {
  return lerDados().find(c => c.id === id) || null;
}

function findByEmail(email) {
  return lerDados().find(c => c.email === email) || null;
}

function save(cliente) {
  const dados = lerDados();
  dados.push(cliente);
  salvarDados(dados);
  return cliente;
}

function update(id, dadosAtualizados) {
  const dados = lerDados();
  const index = dados.findIndex(c => c.id === id);
  if (index === -1) return null;
  dados[index] = { ...dados[index], ...dadosAtualizados };
  salvarDados(dados);
  return dados[index];
}

function remove(id) {
  const dados = lerDados();
  const index = dados.findIndex(c => c.id === id);
  if (index === -1) return false;
  dados.splice(index, 1);
  salvarDados(dados);
  return true;
}

module.exports = { findAll, findById, findByEmail, save, update, remove };
