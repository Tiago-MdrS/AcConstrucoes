# Construmax Sistema Comercial

Sistema inicial para loja de material de construção usando:

- Backend: C# + ASP.NET Core
- Frontend: React + Vite
- Banco: PostgreSQL

## Funcionalidades iniciais

- Cadastro de produtos
- Código de barras no cadastro
- Busca por código de barras na venda
- Carrinho de vendas
- Baixa automática no estoque
- Cadastro de clientes
- Relatórios básicos
- Produtos com estoque baixo
- Histórico de movimentação de estoque no backend

## Como rodar o banco PostgreSQL

Crie um banco chamado:

```sql
CREATE DATABASE construmax_db;
```

No arquivo:

```text
backend/Construmax.Api/appsettings.json
```

ajuste seu usuário e senha do PostgreSQL:

```json
"DefaultConnection": "Host=localhost;Port=5432;Database=construmax_db;Username=postgres;Password=postgres"
```

## Como rodar o backend

Entre na pasta:

```bash
cd backend/Construmax.Api
```

Instale as migrations:

```bash
dotnet tool install --global dotnet-ef
```

Crie a migration:

```bash
dotnet ef migrations add InitialCreate
```

Atualize o banco:

```bash
dotnet ef database update
```

Rode a API:

```bash
dotnet run --urls http://localhost:5000
```

A documentação Swagger ficará em:

```text
http://localhost:5000/swagger
```

## Como rodar o frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

Abra:

```text
http://localhost:5173
```

## Como funciona o leitor de código de barras

O leitor USB funciona como teclado. No cadastro, escaneie no campo "Código de barras". Na tela de vendas, mantenha o campo de leitura focado e escaneie o produto. O sistema busca o código na API e adiciona ao carrinho automaticamente.

## Próximas melhorias

- Login e permissões
- Fornecedores completo
- Contas a pagar e receber
- Fechamento de caixa
- Impressão de recibo
- Backup e restauração
- Integração NF-e/NFC-e
- Geração de .exe com Electron
