const consultaService = require('../services/consultaService');
const profissionalService = require('../services/profissionalService');
const clienteRepository = require('../repositories/clienteRepository');
const path = require('path');

// ---- Rotas do CLIENTE ----
function exibirDashboard(req, res) {
  res.sendFile(path.join(__dirname, '../views/dashboard-cliente.html'));
}

function listar(req, res) {
  res.sendFile(path.join(__dirname, '../views/consultas/lista.html'));
}

function apiListarMinhas(req, res) {
  const consultas = consultaService.listarPorCliente(req.session.usuario.id);
  res.json(consultas);
}

function apiResumo(req, res) {
  const clienteId = req.session.usuario.id;
  const consultas = consultaService.listarPorCliente(clienteId);
  const profissionais = profissionalService.listar();
  const agendadas = consultas.filter(c => c.status === 'agendada');
  const hoje = new Date();
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay());
  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);
  const consultasSemana = agendadas.filter(c => {
    const d = new Date(c.data);
    return d >= inicioSemana && d <= fimSemana;
  });
  res.json({
    agendadas: agendadas.length,
    consultasSemana: consultasSemana.length,
    profissionaisDisponiveis: profissionais.length,
    proximasConsultas: agendadas.slice(0, 5)
  });
}

function exibirFormAgendar(req, res) {
  res.sendFile(path.join(__dirname, '../views/consultas/form.html'));
}

async function agendar(req, res) {
  try {
    consultaService.agendar(req.session.usuario.id, req.body);
    res.redirect('/consultas?sucesso=Consulta+agendada+com+sucesso!');
  } catch (erro) {
    res.redirect(`/consultas/nova?erro=${encodeURIComponent(erro.message)}`);
  }
}

async function cancelar(req, res) {
  try {
    consultaService.cancelar(req.params.id, req.session.usuario.id);
    res.redirect('/consultas?sucesso=Consulta+cancelada+com+sucesso!');
  } catch (erro) {
    res.redirect(`/consultas?erro=${encodeURIComponent(erro.message)}`);
  }
}

// ---- Rotas do ADMIN ----
function exibirDashboardAdmin(req, res) {
  res.sendFile(path.join(__dirname, '../views/dashboard-admin.html'));
}

function apiDashboardAdmin(req, res) {
  const consultas = consultaService.listarTodas();
  const clientes = clienteRepository.findAll().filter(c => c.perfil === 'cliente');
  const profissionais = profissionalService.listar();
  res.json({
    totalClientes: clientes.length,
    totalProfissionais: profissionais.length,
    totalConsultas: consultas.length,
    agendadas: consultas.filter(c => c.status === 'agendada').length,
    ultimasConsultas: consultas.slice(-5).reverse()
  });
}

function listarAdmin(req, res) {
  res.sendFile(path.join(__dirname, '../views/consultas/lista.html'));
}

function apiListarTodas(req, res) {
  const consultas = consultaService.listarTodas();
  const clientes = clienteRepository.findAll();
  const result = consultas.map(c => {
    const cliente = clientes.find(cl => cl.id === c.clienteId);
    return { ...c, clienteNome: cliente ? cliente.nome : 'Desconhecido' };
  });
  res.json(result);
}

async function atualizarStatus(req, res) {
  try {
    consultaService.atualizarStatus(req.params.id, req.body.status);
    res.redirect('/admin/consultas?sucesso=Status+atualizado+com+sucesso!');
  } catch (erro) {
    res.redirect(`/admin/consultas?erro=${encodeURIComponent(erro.message)}`);
  }
}

async function excluir(req, res) {
  try {
    consultaService.excluir(req.params.id);
    res.redirect('/admin/consultas?sucesso=Consulta+removida+com+sucesso!');
  } catch (erro) {
    res.redirect(`/admin/consultas?erro=${encodeURIComponent(erro.message)}`);
  }
}

module.exports = {
  exibirDashboard, listar, apiListarMinhas, apiResumo, exibirFormAgendar, agendar, cancelar,
  exibirDashboardAdmin, apiDashboardAdmin, listarAdmin, apiListarTodas, atualizarStatus, excluir
};
