# Desafio Grupo Energia - Sistema de Gerenciamento de Frotas

Este é um sistema de gerenciamento de frotas desenvolvido para o desafio do Grupo Energia. O sistema permite o cadastro e gerenciamento de veículos, manutenções e pneus, com autenticação JWT.

## Tecnologias usadas

- **Backend**: Node.js, Express, MySQL, TypeScript
- **Frontend**: Next.js, React, TypeScript
- **Banco de dados**: MySQL
- **Autenticação**: JWT (JSON Web Tokens)

## Estrutura do projeto
- **Backend**: A API foi construída utilizando o Node.js, Express e TypeScript. O backend se conecta a um banco de dados MySQL.
- **Frontend**: O frontend foi construído usando o Next.js e React. Ele consome as APIs do backend e exibe os dados ao usuário.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter o seguinte instalado na sua máquina:

- **Node.js**: Você pode baixar o Node.js em [https://nodejs.org/](https://nodejs.org/).
- **MySQL**: Você pode baixar o MySQL em [https://www.mysql.com/](https://www.mysql.com/).
- Rodar o dump do banco
## Rodando o Backend

1. Clone este repositório para sua máquina:

   ```bash
   git clone https://github.com/MachadoJos3/desafio_grupo_energia.git

2. Entre na pasta do projeto
-- cd desafio_grupo_energia
   
3. Entre na pasta do backend do projeto
-- cd backend
4. Crie um arquivo .env na raiz da pasta do backend com as variáveis de ambiente
   JWT_SECRET gerado com o comando node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   JWT_SECRET=seu_token_secreto_aqui
   PORT=3000
   DATABASE_URL=mysql://root:senha_do_banco@localhost:3306/nome_do_banco
   API_BASE_URL=http://localhost:3000/api

6. Instale as dependencias
npm install
7. Incie o servidor
npx tsc
8. No front
   npm install
7. Rode o servidor
   npm run dev

-- Usuario de login de exemplo
    email:jose@exemplo.com
    senha:senha123
