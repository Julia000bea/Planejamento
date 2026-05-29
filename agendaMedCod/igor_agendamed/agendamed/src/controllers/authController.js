const authService = require('../services/authService');
const path = require('path');

function exibirLogin(req, res) {
  if (req.session.usuario) {
    return redirecionarPorPerfil(req.session.usuario.perfil, res);
  }
  res.sendFile(path.join(__dirname, '../views/login.html'));
}

function exibirCadastro(req, res) {
  res.sendFile(path.join(__dirname, '../views/cadastro.html'));
}

async function processarLogin(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await authService.login(email, senha);
    req.session.usuario = usuario;
    redirecionarPorPerfil(usuario.perfil, res);
  } catch (erro) {
    res.redirect(`/login?erro=${encodeURIComponent(erro.message)}`);
  }
}

async function processarCadastro(req, res) {
  try {
    await authService.cadastrar(req.body);
    res.redirect('/login?sucesso=Conta+criada+com+sucesso!+Faça+login.');
  } catch (erro) {
    res.redirect(`/cadastro?erro=${encodeURIComponent(erro.message)}`);
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

function redirecionarPorPerfil(perfil, res) {
  if (perfil === 'admin') return res.redirect('/admin/dashboard');
  return res.redirect('/dashboard');
}

module.exports = { exibirLogin, exibirCadastro, processarLogin, processarCadastro, logout };
