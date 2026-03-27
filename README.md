# EcoHome Store

## Descripción general

EcoHome Store es una aplicación demo/beta compuesta por:

- Backend con Express.js, PostgreSQL, JWT y Socket.IO
- Frontend web con React (Vite)
- App móvil con Flutter (Web en Chrome)
- Chat en tiempo real con persistencia de mensajes
- Gestión de productos con trazabilidad por usuario

Este README explica cómo instalar, configurar y ejecutar el proyecto localmente.

---

## 1. Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- PostgreSQL 14 o superior
- Git
- Postman
- Flutter SDK
- Google Chrome

Verificar:

node -v  
npm -v  
psql --version  
flutter --version  
flutter doctor  

---

## 2. Estructura del proyecto

ECOHOME_EP/
├── ecohome-web/
├── ecohome_mobile/
├── src/
├── .env
├── server.js

---

## 3. Instalación backend

npm install

---

## 4. Variables de entorno

.env:

PORT=3000  
DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=tu_password  
DB_NAME=ecohome_db  
JWT_SECRET=super_secreto_ecohome  

---

## 5. Base de datos

CREATE DATABASE ecohome_db;

Tablas: users, products, messages

---

## 6. Ejecutar backend

npm run dev

Probar:
http://localhost:3000

---

## 7. Frontend React

cd ecohome-web  
npm install  
npm run dev  

http://localhost:5173

---

## 8. Flutter instalación

Agregar al PATH:
C:\flutter\bin

Verificar:
flutter doctor

---

## 9. Proyecto Flutter

flutter create ecohome_mobile  
cd ecohome_mobile  

---

## 10. Dependencias Flutter

flutter pub get

---

## 11. Configuración

baseUrl:
http://localhost:3000

---

## 12. Ejecutar Flutter

flutter run -d chrome

---

## 13. Funcionalidades Flutter

Login:
- /auth/login

Catálogo:
- /products

Usuario:
- /users/me/stats

Chat:
- messages
- send_message
- new_message

---

## 14. Flujo

1. Backend ON  
2. React ON  
3. Flutter ON  

---

## 15. Pruebas

- Login correcto
- Productos visibles
- Contador actualizado
- Chat con historial y tiempo real

---

## 16. Build

flutter build web

---

## 17. Tecnologías

Node.js  
Express  
PostgreSQL  
JWT  
Socket.IO  
React  
Flutter  
