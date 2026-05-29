const path = require('path');

function errorMiddleware(err, req, res, next) {
  console.error('[ERRO]', err.message);
  res.status(500).sendFile(path.join(__dirname, '../views/erros/404.html'));
}

module.exports = errorMiddleware;
