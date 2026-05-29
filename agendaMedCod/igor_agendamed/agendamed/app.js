const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const profissionalRoutes = require('./src/routes/profissionalRoutes');
const consultaRoutes = require('./src/routes/consultaRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de sessão
app.use(session({
  secret: 'agendamed-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 horas
}));

// Middlewares globais
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Disponibiliza usuário logado em todas as views
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// Rotas
app.get('/', (req, res) => res.redirect('/login'));
app.use('/', authRoutes);
app.use('/profissionais', profissionalRoutes);
app.use('/consultas', consultaRoutes);
app.use('/admin', clienteRoutes);
app.use('/admin', profissionalRoutes);
app.use('/admin', consultaRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'src/views/erros/404.html'));
});

// Middleware de erros
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`AgendaMed rodando em http://localhost:${PORT}`);
});

module.exports = app;
