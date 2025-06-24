# Cemaco Coding Test - Carlos Aguilar

Este proyecto está compuesto por tres servicios principales:

- **Frontend**: Aplicación React con Vite.
- **Backend**: API desarrollada en Node.js.
- **Base de datos**: MySQL con script de inicialización.

---

## 🐳 Requisitos previos

Asegúrate de tener instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 ¿Cómo levantar todo el proyecto?

Desde la raíz del repositorio, ejecuta el siguiente comando:

```bash
docker-compose up --build
```

## 🌐 Acceso a los servicios

Frontend (React/Vite): http://localhost:5173

Backend (Node.js): http://localhost:3000

Base de datos (MySQL): localhost:3306


## 🧪 Datos de prueba (MySQL)

El contenedor de MySQL ejecutará automáticamente el archivo mysql/init.sql al iniciar. Asegúrate de que ese archivo contenga la estructura y/o datos necesarios.

Credenciales por defecto:

    Usuario: myuser

    Contraseña: mypassword

    Base de datos: myapp

    Root Password: rootpassword

## Estructura del pryecto

```
cemaco-coding-test/
├── backend/       → Código fuente del backend (Node.js)
│   └── Dockerfile
├── frontend/      → Código fuente del frontend (React)
│   └── Dockerfile
├── mysql/         → Script de inicialización de la base de datos
│   └── init.sql
├── docker-compose.yml
└── Readme.md      → Instrucciones del proyecto
```