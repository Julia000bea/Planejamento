const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Rotas do cliente
router.get('/dashboard', authMiddleware, consultaController.exibirDashboard);
router.get('/dashboard/api', authMiddleware, consultaController.apiResumo);
router.get('/', authMiddleware, consultaController.listar);
router.get('/api', authMiddleware, consultaController.apiListarMinhas);
router.get('/nova', authMiddleware, consultaController.exibirFormAgendar);
router.post('/', authMiddleware, consultaController.agendar);
router.post('/:id/cancelar', authMiddleware, consultaController.cancelar);

// Rotas admin
router.get('/dashboard', authMiddleware, adminMiddleware, consultaController.exibirDashboardAdmin);
router.get('/dashboard/api', authMiddleware, adminMiddleware, consultaController.apiDashboardAdmin);
router.get('/consultas', authMiddleware, adminMiddleware, consultaController.listarAdmin);
router.get('/consultas/api', authMiddleware, adminMiddleware, consultaController.apiListarTodas);
router.post('/consultas/:id/status', authMiddleware, adminMiddleware, consultaController.atualizarStatus);
router.post('/consultas/:id/excluir', authMiddleware, adminMiddleware, consultaController.excluir);

module.exports = router;
