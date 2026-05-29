const profissionalService = require('../services/profissionalService');
const path = require('path');

// ---- Rotas do CLIENTE ----
function listarParaCliente(req, res) {
  const { especialidade } = req.query;
  const profissionais = profissionalService.buscarPorEspecialidade(especialidade);
  res.sendFile(path.join(__dirname, '../views/profissionais/lista.html'));
  // Nota: Em produção usaria template engine (ex: EJS). Aqui os dados ficam
  // disponíveis via API JSON em /api/profissionais
}

function apiListar(req, res) {
  const { especialidade } = req.query;
  const profissionais = profissionalService.buscarPorEspecialidade(especialidade);
  res.json(profissionais);
}

function apiDetalhe(req, res) {
  try {
    const profissional = profissionalService.buscarPorId(req.params.id);
    res.json(profissional);
  } catch (erro) {
    res.status(404).json({ erro: erro.message });
  }
}

// ---- Rotas do ADMIN ----
function listarAdmin(req, res) {
  res.sendFile(path.join(__dirname, '../views/profissionais/lista.html'));
}

function exibirFormCriar(req, res) {
  res.sendFile(path.join(__dirname, '../views/profissionais/form.html'));
}

function exibirFormEditar(req, res) {
  res.sendFile(path.join(__dirname, '../views/profissionais/form.html'));
}

async function criar(req, res) {
  try {
    profissionalService.criar(req.body);
    res.redirect('/admin/profissionais?sucesso=Profissional+cadastrado+com+sucesso!');
  } catch (erro) {
    res.redirect(`/admin/profissionais/novo?erro=${encodeURIComponent(erro.message)}`);
  }
}

async function atualizar(req, res) {
  try {
    profissionalService.atualizar(req.params.id, req.body);
    res.redirect('/admin/profissionais?sucesso=Profissional+atualizado+com+sucesso!');
  } catch (erro) {
    res.redirect(`/admin/profissionais/${req.params.id}/editar?erro=${encodeURIComponent(erro.message)}`);
  }
}

async function excluir(req, res) {
  try {
    profissionalService.excluir(req.params.id);
    res.redirect('/admin/profissionais?sucesso=Profissional+removido+com+sucesso!');
  } catch (erro) {
    res.redirect(`/admin/profissionais?erro=${encodeURIComponent(erro.message)}`);
  }
}

module.exports = { listarParaCliente, apiListar, apiDetalhe, listarAdmin, exibirFormCriar, exibirFormEditar, criar, atualizar, excluir };
