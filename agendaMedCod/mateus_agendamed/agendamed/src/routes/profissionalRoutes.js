const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Rotas do cliente (autenticadas)
router.get('/', authMiddleware, profissionalController.listarParaCliente);
router.get('/api', authMiddleware, profissionalController.apiListar);
router.get('/api/:id', authMiddleware, profissionalController.apiDetalhe);

// Rotas admin
router.get('/profissionais', authMiddleware, adminMiddleware, profissionalController.listarAdmin);
router.get('/profissionais/api', authMiddleware, adminMiddleware, profissionalController.apiListar);
router.get('/profissionais/novo', authMiddleware, adminMiddleware, profissionalController.exibirFormCriar);
router.post('/profissionais', authMiddleware, adminMiddleware, profissionalController.criar);
router.get('/profissionais/:id/editar', authMiddleware, adminMiddleware, profissionalController.exibirFormEditar);
router.post('/profissionais/:id', authMiddleware, adminMiddleware, profissionalController.atualizar);
router.post('/profissionais/:id/excluir', authMiddleware, adminMiddleware, profissionalController.excluir);

module.exports = router;
