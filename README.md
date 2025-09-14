# Debts App

Aplicación fullstack para gestionar deudas, puedes crear, listarlas y actualizarlas. El backend utiliza tecnologías como Node.js, Nest.js, PostgreSQL y Redis, mientras que el frontend usa React.js, TailwindCSS y Axios.

## Tecnologías requeridas

Debes tener las siguientes tecnologías instaladas en tu computador para poder levantar la aplicación en local

- Redis
- PostgreSQL
- Node.js

## Instrucciones para levantar la app

### Backend

- Clonar el repositorio: `git clone https://github.com/Alejandro2134/debts-app.git`
- Navegar a la carpeta del backend `cd backend`
- Instalar las dependencias `npm i`
- Agregar variables de entorno a un archivo .env (cambialas dependiendo como y donde estan corriendo los servicios):
  ```bash
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=root
  DB_PASSWORD=secret
  DB_NAME=debts
  JWT_SECRET=random-string
  REDIS_URL=redis://localhost:6379
  ```
- Crear la base de datos y correr las migraciones: `npm run db:setup`
- Correr la app en modo de desarrollo `npm run start:dev`

### Frontend

- Clonar el repositorio: `git clone https://github.com/Alejandro2134/debts-app.git`
- Navegar a la carpeta del frontend `cd frontend`
- Instalar las dependencias `npm i`
- Agregar variables de entorno a un archivo .env
  ```bash
  VITE_BACKEND_URL=http://localhost:3000
  ```
- Correr la app en modo de desarrollo `npm run dev`

## Diagrama entidad relación

<img width="531" height="241" alt="debtapp drawio" src="https://github.com/user-attachments/assets/28d8c947-5cbb-491f-97a0-69d388ed8aad" />

## Endpoints del backend

### GET /debts -> Listar deudas

Required Headers:

- Authorization

Query Params:

- status -> 'pending' | 'paid'

### GET /debts/:id -> Detalle de deuda

Required Headers:

- Authorization

Path Variables:

- id

### POST /debts -> Crear deuda

Required Headers:

- Authorization

JSON Body

```json
{
    "amount": 15000 (required),
    "creditor": "Alfonso Rodri" (required)
}
```

### DELETE /debts/:id -> Eliminar deuda

Required Headers:

- Authorization

Path Variables:

- id

### PATCH /debts/:id -> Actualizar deuda

Required Headers:

- Authorization

Path Variables:

- id

JSON Body

```json
{
    "amount": 15000 (optional),
    "creditor": "Alfonso Rodri" (optional),
    "status": "pending" (optional)
}
```

### POST /users/register -> Crear usuario

JSON Body

```json
{
  "email": "test@test2.com" (required),
  "password": "pass2" (required)
}
```

### POST /users/login -> Iniciar sesión

JSON Body

```json
{
  "email": "test@test2.com" (required),
  "password": "pass2" (required)
}
```

## Decisiones técnicas

## Clean Architecture (backend)

Se adoptó una arquitectura limpia para desacoplar la lógica de negocio de las dependencias externas. Esta separación permite que las pruebas unitarias se centren en las capas de aplicación y dominio, que contienen la lógica central y proporcionan el mayor valor de cobertura. Al basarse en abstracciones (como repositorios) en lugar de implementaciones concretas, se reduce la necesidad de crear mocks complejos. Las implementaciones reales de estas abstracciones residen en la capa de infraestructura e implementan contratos definidos en el dominio. Estas implementaciones se inyectan a través de los controladores, lo que permite que el sistema siga siendo flexible, escalable y fácil de mantener. Como resultado, el proyecto puede evolucionar y cambiar de tecnologías (por ejemplo, bases de datos o frameworks) sin afectar a la lógica de negocio.

## Validación de DTO

Para garantizar la integridad y fiabilidad de los datos que entran en el sistema, validamos todos los payloads de las solicitudes entrantes utilizando class-validator, una biblioteca que expone anotaciones y esta basado en TypeScript. La validación se realiza dentro de la capa de controladores, justo antes de que los datos lleguen a la lógica de la aplicación. Cada controlador recibe un req.body o req.query, lo analiza a través de un DTO y, o bien continúa con la lógica, o bien devuelve un error de validación.
