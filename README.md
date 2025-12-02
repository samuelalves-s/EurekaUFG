# 🚀 Guia de Configuração e Execução: Projeto EurekaUFG

Este guia rápido provê todas as instruções necessárias para clonar, configurar e executar as aplicações **Backend (Java/Spring Boot)** e **Frontend (React/JS/JSX/TSX)** do projeto EurekaUFG em sua máquina local.

---

## 📋 Pré-requisitos

Certifique-se de que os seguintes softwares estão instalados:

- **Git** – Para clonar o repositório  
- **Java JDK 17+** – Para o backend  
- **Maven** – Gerenciador de build do backend  
- **Node.js & npm/yarn** – Para executar o frontend React  

---

## 1. 🗃️ Clonagem do Repositório

Abra seu terminal e execute:

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd EurekaUFG
```

---

## 2. ⚙️ Configuração e Execução do Backend (Java/Spring Boot)

O backend é a API responsável por servir os dados ao frontend.

2.1. Navegar até o diretório do backend

```bash
cd backend
```

2.2. Instalar dependências com Maven
```bash
mvn clean install
```

2.3. Configuração do Banco de Dados

Localize o arquivo de configuração em:

```bash
src/main/resources/application.properties
```

No arquivo src/main/java/resources/application.properties:

Edite conforme o seu ambiente:

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/eureka_db
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

2.4. Executar o servidor Backend

```bash
mvn spring-boot:run
```

O backend estará acessível em:
```bash
http://localhost:8080
```

---

3. 🖥️ Configuração e Execução do Frontend (React)

O frontend é a interface de usuário desenvolvida em React.
3.1. Navegar até o diretório do frontend

```bash
cd ..
cd frontend   # ou eurekaUFG-web
```

3.2. Instalar dependências do projeto

```bash
npm install
# ou
# yarn install
```

3.3. Configurar a URL da API

Crie um arquivo .env ou .env.local no diretório raiz do frontend:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

3.4. Executar o servidor de desenvolvimento do React

```bash
npm run dev
# ou
# yarn dev
```

O frontend estará acessível em:

```bash
http://localhost:3000
```

