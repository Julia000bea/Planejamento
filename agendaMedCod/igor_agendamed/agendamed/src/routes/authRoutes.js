const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.exibirLogin);
router.post('/login', authController.processarLogin);
router.get('/cadastro', authController.exibirCadastro);
router.post('/cadastro', authController.processarCadastro);
router.get('/logout', authController.logout);
router.get('/403', (req, res) => {
  res.status(403).sendFile(require('path').join(__dirname, '../views/erros/403.html'));
});

module.exports = router;
