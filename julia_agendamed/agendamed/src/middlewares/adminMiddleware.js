function adminMiddleware(req, res, next) {
  if (!req.session.usuario || req.session.usuario.perfil !== 'admin') {
    return res.status(403).sendFile(
      require('path').join(__dirname, '../views/erros/403.html')
    );
  }
  next();
}

module.exports = adminMiddleware;
