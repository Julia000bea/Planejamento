# AgendaMed — Sistema de Agendamento de Consultas Médicas

## Integrantes
- **Igor Henrique** (@igoorique) — Autenticação, sessão e base do projeto
- **Mateus Batista** (@oBatistaa) — Módulo de Profissionais
- **Julia Beatriz** (@julia000bea) — Módulo de Consultas

## Como executar

```bash
npm install
npm run dev   # desenvolvimento (nodemon)
npm start     # produção
```

Acesse: http://localhost:3000

## Credenciais de teste

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Admin | admin@agendamed.com | password |
| Cliente | joao@email.com | password |

> **Nota:** A senha armazenada nos JSONs é um hash bcrypt de `password`.
> Ao testar, use `password` como senha no login.

## Estrutura do Projeto

```
agendamed/
├── src/
│   ├── controllers/   # Recebem req/res e chamam services
│   ├── services/      # Regras de negócio
│   ├── repositories/  # Acesso aos dados (JSON)
│   ├── middlewares/   # auth, admin, error
│   ├── routes/        # Definição das rotas
│   ├── views/         # Páginas HTML
│   └── data/          # Arquivos JSON (banco simulado)
├── public/            # CSS e JS estáticos
├── app.js             # Entrada da aplicação
└── package.json
```
