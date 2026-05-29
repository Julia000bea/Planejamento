const fs = require('fs');
const path = require('path');

const ARQUIVO = path.join(__dirname, '../data/consultas.json');

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

function findByClienteId(clienteId) {
  return lerDados().filter(c => c.clienteId === clienteId);
}

function findByProfissionalId(profissionalId) {
  return lerDados().filter(c => c.profissionalId === profissionalId);
}

function findConflito(profissionalId, data, horario, ignorarId = null) {
  return lerDados().find(c =>
    c.profissionalId === profissionalId &&
    c.data === data &&
    c.horario === horario &&
    c.status !== 'cancelada' &&
    c.id !== ignorarId
  ) || null;
}

function save(consulta) {
  const dados = lerDados();
  dados.push(consulta);
  salvarDados(dados);
  return consulta;
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

module.exports = { findAll, findById, findByClienteId, findByProfissionalId, findConflito, save, update, remove };
