# 📦 Sistema de Gestão de Objetos (Fullstack)

Este é um projeto fullstack completo desenvolvido para a disciplina de Desenvolvimento Web. O sistema permite o gerenciamento de itens com autenticação de usuários, persistência de dados e upload de imagens.

## 🚀 Demonstração
* **Frontend:** https://trabalho-web-khaki.vercel.app/
* email: admin10@gmail.com
* senha: admin1234

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React.js** (com Vite)
- **TypeScript**
- **Axios** (para consumo da API)
- **Hospedagem:** Vercel

### **Backend**
- **Node.js**
- **Express** (Framework Web)
- **JWT** (Autenticação via JSON Web Token)
- **Hospedagem:** Render

### **Banco de Dados**
- **Supabase** (PostgreSQL)
- **Supabase Storage** (Para armazenamento de imagens)

---

## ⚙️ Funcionalidades Principais

- 🔐 **Autenticação Segura:** Sistema de login e cadastro com proteção de rotas via Middleware.
- 📝 **CRUD Completo:** Criação, listagem, edição e exclusão de objetos.
- 🖼️ **Gestão de Imagens:** Upload de fotos dos objetos diretamente para o Storage do Supabase.
- 📊 **Dashboard:** Cards informativos com estatísticas dos itens cadastrados.
- 📱 **Responsividade:** Layout adaptável para dispositivos móveis e desktop.

---

## 🏗️ Arquitetura do Sistema

A aplicação utiliza uma **Arquitetura Cliente-Servidor desacoplada**:
1. O **Frontend** (React) lida com a interface e experiência do usuário.
2. O **Backend** (Node + Express) gerencia a lógica de negócio e segurança.
3. O **Banco de Dados** (Supabase) armazena de forma persistente os dados e arquivos.

A comunicação entre as camadas é feita através de uma **API REST** utilizando o formato **JSON**.

---

## 🔧 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/gilvan-almeida/TrabalhoWeb.git](https://github.com/gilvan-almeida/TrabalhoWeb.git)
