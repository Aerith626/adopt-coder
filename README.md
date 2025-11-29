# Proyecto Node.js con Docker, Swagger y Mock Data

Este proyecto es una API construida con **Node.js**, **Express**, **MongoDB**, **Swagger** para documentación y **Docker** para despliegue.  
Incluye generación de datos mock (usuarios y mascotas), autenticación JWT y manejo de sesiones protegidas y no protegidas.

---

## Características

- Endpoints de autenticación (con versiones sin protección para desarrollo)
- Endpoints para adopciones
- Generación de datos falsos
- Documentación automática con **Swagger**
- Contenedor Docker listo para producción

---

## Requisitos

- Node.js 18+
- MongoDB

---

## Estructura simplificada del proyecto

```
/src
 /controllers
 /dao
 /dto
 /public
 /repository
 /routes
 /services
 /test
 /utils
 app.js
 server.js
Dockerfile
.dockerignore
swagger.js
package.json
package-lock.json
README.md
```

---

## Scripts

```
npm install
npm run dev       # Modo desarrollo (nodemon)
npm start         # Modo producción
```

## Uso con Docker

Enlace a imagen de docker: [Ir](https://hub.docker.com/repository/docker/aerith626/adopt/general)

### 1. Obtener imagen

```
docker pull aerith626/adopt:1.0.0
```

### 2. Ejecutar contenedor

```
docker run -p 8080:8080 --env-file .env adopt
```

## Variables de entorno necesarias

```
URI_MONGODB=mongodb+srv://...
PORT=8080
```

## Documentación (Swagger)

Para ver la documentación de la API, se debe entrar al siguiente enlace luego de iniciar la app:

```
http://localhost:8080/docs
```

## Endpoints destacados
### Auth

- POST /api/sessions/register
- POST /api/sessions/login
- GET /api/sessions/current
- POST /api/sessions/unprotectedLogin
- GET /api/sessions/unprotectedCurrent

### Mocking

- GET /api/mocking/mockingusers
- POST /api/mocking/generateData

### Adoptions

- GET /api/adoptions/
- GET /api/adoptions/:aid
- POST /api/adoptions/:uid/:pid

## .dockerignore recomendado

```
node_modules
npm-debug.log
yarn-error.log
dist
build
coverage
.env
*.log
.git
.gitignore
Dockerfile
docker-compose.yml
*.md
```