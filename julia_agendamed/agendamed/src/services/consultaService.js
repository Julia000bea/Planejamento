const { v4: uuidv4 } = require('uuid');
const consultaRepository = require('../repositories/consultaRepository');
const profissionalRepository = require('../repositories/profissionalRepository');

function listarTodas() {
  const consultas = consultaRepository.findAll();
  return _enriquecerConsultas(consultas);
}

function listarPorCliente(clienteId) {
  const consultas = consultaRepository.findByClienteId(clienteId);
  return _enriquecerConsultas(consultas);
}

function buscarPorId(id) {
  const consulta = consultaRepository.findById(id);
  if (!consulta) throw new Error('Consulta não encontrada.');
  return _enriquecerConsulta(consulta);
}

function agendar(clienteId, dados) {
  const { profissionalId, data, horario, observacoes } = dados;

  if (!profissionalId || !data || !horario) {
    throw new Error('Profissional, data e horário são obrigatórios.');
  }

  const profissional = profissionalRepository.findById(profissionalId);
  if (!profissional) throw new Error('Profissional não encontrado.');

  // Verifica conflito de horário
  const conflito = consultaRepository.findConflito(profissionalId, data, horario);
  if (conflito) {
    throw new Error('Este horário já está ocupado para o profissional selecionado.');
  }

  // Verifica se é um horário válido do profissional
  if (!profissional.horarios.includes(horario)) {
    throw new Error('Horário inválido para este profissional.');
  }

  // Verifica se a data não é no passado
  const dataConsulta = new Date(data);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  if (dataConsulta < hoje) {
    throw new Error('Não é possível agendar consultas em datas passadas.');
  }

  const novaConsulta = {
    id: uuidv4(),
    clienteId,
    profissionalId,
    data,
    horario,
    status: 'agendada',
    observacoes: observacoes || '',
    criadoEm: new Date().toISOString()
  };

  return consultaRepository.save(novaConsulta);
}

function cancelar(id, clienteId, isAdmin = false) {
  const consulta = consultaRepository.findById(id);
  if (!consulta) throw new Error('Consulta não encontrada.');

  if (!isAdmin && consulta.clienteId !== clienteId) {
    throw new Error('Você não tem permissão para cancelar esta consulta.');
  }
  if (consulta.status === 'cancelada') {
    throw new Error('Esta consulta já está cancelada.');
  }
  if (consulta.status === 'concluida') {
    throw new Error('Não é possível cancelar uma consulta já concluída.');
  }

  return consultaRepository.update(id, { status: 'cancelada' });
}

function atualizarStatus(id, novoStatus) {
  const statusValidos = ['agendada', 'cancelada', 'concluida'];
  if (!statusValidos.includes(novoStatus)) {
    throw new Error('Status inválido.');
  }
  const consulta = consultaRepository.findById(id);
  if (!consulta) throw new Error('Consulta não encontrada.');
  return consultaRepository.update(id, { status: novoStatus });
}

function excluir(id) {
  const consulta = consultaRepository.findById(id);
  if (!consulta) throw new Error('Consulta não encontrada.');
  return consultaRepository.remove(id);
}

function _enriquecerConsultas(consultas) {
  return consultas.map(_enriquecerConsulta);
}

function _enriquecerConsulta(consulta) {
  const profissional = profissionalRepository.findById(consulta.profissionalId);
  return {
    ...consulta,
    profissionalNome: profissional ? profissional.nome : 'Desconhecido',
    especialidade: profissional ? profissional.especialidade : '-'
  };
}

module.exports = { listarTodas, listarPorCliente, buscarPorId, agendar, cancelar, atualizarStatus, excluir };
