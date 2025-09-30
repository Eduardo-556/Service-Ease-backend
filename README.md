# Service-Ease-backend

API REST para gerenciamento de ordens de serviço, focada em assistências técnicas de celulares.

## Sobre o Projeto

Além de ser uma solução prática, este projeto tem como objetivo principal o aprendizado e a aplicação de tecnologias e técnicas modernas do ecossistema **Nest.js**.

Esta é uma recriação de um projeto SaaS desenvolvido por mim há alguns anos. A meta agora é reconstruí-lo utilizando minhas habilidades atuais, focando em uma arquitetura mais robusta, escalável e em boas práticas de desenvolvimento de software.

## Objetivos do Projeto

- Explorar recursos avançados do NestJS
- Praticar integração com banco de dados usando Prisma ORM
- Implementar autenticação e segurança de dados
- Aprender sobre testes automatizados, validação e boas práticas de API

---

## Tecnologias

A stack principal utilizada neste projeto até o momento é:

- **[Nest.js](https://nestjs.com/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Prisma ORM](https://www.prisma.io/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Commitlint](https://commitlint.js.org/)**
- **[Commitizen](https://commitizen.github.io/cz-cli/)**
- **[ESLint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)**
- **[Jest](https://jestjs.io/)**
- **[Docker](https://www.docker.com/)**

---

## Checklist de Implementação

Abaixo está a lista de funcionalidades planejadas e o status de cada uma.

- [x] Configuração inicial do projeto Nest.js
- [x] Integração com banco de dados PostgreSQL via Prisma
- [x] Estrutura de Módulos, Controllers e Services
- [x] Criação do Model/Entidade de Usuário (`User`)
- [x] Implementação de hash de senhas com **`bcrypt`**
- [ ] Sistema de Autenticação e Autorização com `JWT` e `Passport.js`
- [x] Criação do Model/Entidade de Cliente (`Client`)
- [ ] Criação do Model/Entidade de Ordem de Serviço (`ServiceOrder`)
- [x] Desenvolvimento dos endpoints CRUD para Usuários
- [ ] Desenvolvimento dos endpoints CRUD para Clientes
- [ ] Desenvolvimento dos endpoints CRUD para Ordens de Serviço
- [ ] Validação de dados de entrada (Pipes e `class-validator`)
- [ ] Tratamento de erros e exceções
- [ ] Implementação de logging
- [x] Configuração de variáveis de ambiente (`@nestjs/config`)
- [x] Implementação de testes unitários e de integração (Jest)
- [ ] Documentação da API com Swagger (`@nestjs/swagger`)
- [ ] Containerização com Docker
- [x] Commitlint e Commitizen configurados para padronização de commits
- [ ] Deploy automatizado
- [ ] Controle de acesso por perfil (admin, usuário, etc)

---

## Como rodar o projeto

1. **Clone o repositório**
2. **Instale as dependências**
   ```bash
   npm install
   ```
3. **Configure o banco de dados**  
   Edite o arquivo `.env` com as variáveis de conexão do PostgreSQL.
4. **Rode as migrations do Prisma**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie o servidor**
   ```bash
   npm run start:dev
   ```

---

## Contribuição

Este projeto é para fins de estudo, mas sugestões e melhorias são bem-vindas!

---
