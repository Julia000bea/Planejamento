# Quebra de Tarefas da Equipe — AgendaMed

## Integrantes do Grupo

| # | Nome | GitHub |
|---|------|--------|
| 1 | Igor Henrique Cunha | @igoorique |
| 2 | Mateus Batista | @oBatistaa |
| 3 | Julia Beatriz | @julia000bea |



---

## Divisão de Responsabilidades

### Integrante 1 — Autenticação e Sessões
Responsável pela base do projeto e pelo sistema de autenticação.

**Tarefas:**
- [ ] Inicializar o projeto Node.js com Express (`app.js`, `package.json`)
- [ ] Configurar `express-session`
- [ ] Criar `authController.js` (login, logout, cadastro)
- [ ] Criar `authService.js` (validação de credenciais, hash de senha)
- [ ] Criar `clienteRepository.js` (findByEmail, save)
- [ ] Criar `authMiddleware.js` e `adminMiddleware.js`
- [ ] Criar páginas HTML: `login.html`, `cadastro.html`
- [ ] Criar rotas públicas: `authRoutes.js`

---

### Integrante 2 — Módulo de Profissionais
Responsável pelo CRUD completo de profissionais.

**Tarefas:**
- [ ] Criar `profissionalRepository.js` (findAll, findById, save, update, delete)
- [ ] Criar `profissionalService.js` (regras: CRM único, dias válidos)
- [ ] Criar `profissionalController.js`
- [ ] Criar rotas: `profissionalRoutes.js`
- [ ] Criar páginas HTML: `profissionais/lista.html`, `profissionais/form.html`
- [ ] Criar arquivo de dados: `data/profissionais.json`
- [ ] Testar todos os endpoints do módulo

---

### Integrante 3 — Módulo de Consultas
Responsável pelo CRUD completo de consultas (agendamentos).

**Tarefas:**
- [ ] Criar `consultaRepository.js` (findAll, findByClienteId, findByProfissionalId, save, update, delete)
- [ ] Criar `consultaService.js` (regras: conflito de horário, cancelamento, status)
- [ ] Criar `consultaController.js`
- [ ] Criar rotas: `consultaRoutes.js`
- [ ] Criar páginas HTML: `consultas/lista.html`, `consultas/form.html`
- [ ] Criar arquivo de dados: `data/consultas.json`
- [ ] Testar todos os endpoints do módulo

---

### Integrante 4 — Painel Admin, Estilo e Erros
Responsável pelo painel administrativo, estilo visual e páginas de erro.

**Tarefas:**
- [ ] Criar `clienteController.js` e `clienteService.js` (CRUD admin de clientes)
- [ ] Criar rotas admin: dashboard, clientes, profissionais, consultas
- [ ] Criar páginas HTML: `dashboard-admin.html`, `dashboard-cliente.html`, `clientes/lista.html`, `clientes/form.html`
- [ ] Criar páginas de erro: `erros/403.html`, `erros/404.html`
- [ ] Criar `errorMiddleware.js`
- [ ] Criar e aplicar `public/css/style.css` em todas as páginas
- [ ] Criar `public/js/main.js` (interações front-end: confirmações, máscaras)
- [ ] Realizar testes de integração finais

---

## Tarefas Compartilhadas (Todos)

| Tarefa | Responsável Principal | Apoio |
|--------|-----------------------|-------|
| Planejamento (Etapa 1) | Todos | — |
| Revisão de código (pull requests) | Todos | — |
| Testes manuais finais | Todos | — |
| Apresentação oral | Todos | — |
| Atualização do README.md | Integrante 1 | Todos |

---

## Cronograma

| Semana | Período | Metas |
|--------|---------|-------|
| 1 | Semana 1 | Planejamento completo (Etapa 1), estrutura de pastas, setup do projeto |
| 2 | Semana 2 | Autenticação funcional (login, cadastro, sessão, middlewares) |
| 3 | Semana 3 | CRUD de Profissionais e Consultas |
| 4 | Semana 4 | Painel Admin, CRUD de Clientes, páginas de erro |
| 5 | Semana 5 | Estilo CSS, integração geral, testes e ajustes |
| 6 | Semana 6 | Revisão final, README, entrega e preparação da apresentação |

---

## Fluxo de Trabalho no Git

- Branch principal: `main`
- Cada integrante trabalha em sua branch: `feature/autenticacao`, `feature/profissionais`, etc.
- Pull Requests obrigatórios para mesclar com `main`
- Commits em português, descritivos: `feat: adiciona validação de horário em consultaService`
