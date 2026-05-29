const { v4: uuidv4 } = require('uuid');
const profissionalRepository = require('../repositories/profissionalRepository');

const DIAS_VALIDOS = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

function listar() {
  return profissionalRepository.findAll();
}

function buscarPorId(id) {
  const profissional = profissionalRepository.findById(id);
  if (!profissional) throw new Error('Profissional não encontrado.');
  return profissional;
}

function buscarPorEspecialidade(especialidade) {
  const todos = profissionalRepository.findAll();
  if (!especialidade) return todos;
  return todos.filter(p =>
    p.especialidade.toLowerCase().includes(especialidade.toLowerCase())
  );
}

function criar(dados) {
  const { nome, especialidade, crm, telefone, diasAtendimento, horarios } = dados;

  if (!nome || !especialidade || !crm || !telefone) {
    throw new Error('Nome, especialidade, CRM e telefone são obrigatórios.');
  }
  const crmExistente = profissionalRepository.findByCrm(crm);
  if (crmExistente) {
    throw new Error('CRM já cadastrado no sistema.');
  }

  const dias = Array.isArray(diasAtendimento) ? diasAtendimento : [diasAtendimento].filter(Boolean);
  const diasInvalidos = dias.filter(d => !DIAS_VALIDOS.includes(d));
  if (diasInvalidos.length > 0) {
    throw new Error(`Dias inválidos: ${diasInvalidos.join(', ')}`);
  }

  const horariosArr = Array.isArray(horarios) ? horarios : [horarios].filter(Boolean);

  const novoProfissional = {
    id: uuidv4(),
    nome,
    especialidade,
    crm,
    telefone,
    diasAtendimento: dias,
    horarios: horariosArr,
    criadoEm: new Date().toISOString()
  };

  return profissionalRepository.save(novoProfissional);
}

function atualizar(id, dados) {
  const profissional = profissionalRepository.findById(id);
  if (!profissional) throw new Error('Profissional não encontrado.');

  if (dados.crm && dados.crm !== profissional.crm) {
    const crmExistente = profissionalRepository.findByCrm(dados.crm);
    if (crmExistente) throw new Error('CRM já pertence a outro profissional.');
  }

  const dias = dados.diasAtendimento
    ? (Array.isArray(dados.diasAtendimento) ? dados.diasAtendimento : [dados.diasAtendimento])
    : profissional.diasAtendimento;

  const horariosArr = dados.horarios
    ? (Array.isArray(dados.horarios) ? dados.horarios : [dados.horarios])
    : profissional.horarios;

  return profissionalRepository.update(id, { ...dados, diasAtendimento: dias, horarios: horariosArr });
}

function excluir(id) {
  const profissional = profissionalRepository.findById(id);
  if (!profissional) throw new Error('Profissional não encontrado.');
  return profissionalRepository.remove(id);
}

module.exports = { listar, buscarPorId, buscarPorEspecialidade, criar, atualizar, excluir };
