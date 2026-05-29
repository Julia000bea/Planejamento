// AgendaMed — Interações Front-end

// Máscara de telefone
document.addEventListener('DOMContentLoaded', () => {
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', function() {
      let v = this.value.replace(/\D/g, '');
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
      this.value = v;
    });
  }

  // Validação de senhas no cadastro
  const formCadastro = document.getElementById('formCadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
      const senha = document.getElementById('senha').value;
      const confirmar = document.getElementById('confirmarSenha').value;
      if (senha !== confirmar) {
        e.preventDefault();
        const alerta = document.getElementById('alerta');
        alerta.innerHTML = '<div class="alert alert-erro">As senhas não coincidem.</div>';
        return false;
      }
    });
  }
});
