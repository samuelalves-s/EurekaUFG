# 🚀 Projeto EurekaUFG

Guia rápido para configurar e executar as aplicações **Backend (Spring Boot)**, **Frontend (React)** e **Banco de Dados (MySQL)** usando Docker.

## 📋 Pré-requisitos
* **Docker & Docker Compose** – Essencial para rodar o projeto completo sem configurar o ambiente localmente.
* **Git** – Para clonagem do repositório.

---

## 1. 🗃️ Clonagem do Repositório
```bash
git clone [https://github.com/arthurspedroso/EurekaUFG.git](https://github.com/arthurspedroso/EurekaUFG.git)
cd EurekaUFG
```

---

## 2. 🐳 Execução com Docker

A maneira mais rápida de subir o ecossistema completo (Back, Front e DB):
```bash
docker compose up --build
```

- Frontend: http://localhost:3000

- Backend (API): http://localhost:8080

- Banco de Dados: Porta 3306

