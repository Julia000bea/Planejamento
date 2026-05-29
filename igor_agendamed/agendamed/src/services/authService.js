const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const clienteRepository = require('../repositories/clienteRepository');

async function login(email, senha) {
  if (!email || !senha) {
    throw new Error('E-mail e senha são obrigatórios.');
  }
  const usuario = clienteRepository.findByEmail(email);
  if (!usuario) {
    throw new Error('E-mail ou senha inválidos.');
  }
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error('E-mail ou senha inválidos.');
  }
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil
  };
}

async function cadastrar(dados) {
  const { nome, email, telefone, dataNascimento, senha, confirmarSenha } = dados;

  if (!nome || !email || !telefone || !dataNascimento || !senha || !confirmarSenha) {
    throw new Error('Todos os campos são obrigatórios.');
  }
  if (senha !== confirmarSenha) {
    throw new Error('As senhas não coincidem.');
  }
  if (senha.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres.');
  }
  const emailExistente = clienteRepository.findByEmail(email);
  if (emailExistente) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const novoCliente = {
    id: uuidv4(),
    nome,
    email,
    senha: senhaHash,
    telefone,
    dataNascimento,
    perfil: 'cliente',
    criadoEm: new Date().toISOString()
  };

  return clienteRepository.save(novoCliente);
}

module.exports = { login, cadastrar };
