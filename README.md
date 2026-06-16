# 📦 Inventario Bodega

Sistema de gestión de inventario de bodega desarrollado como proyecto Full Stack para el electivo de Programación de Aplicaciones Web - Universidad Católica del Maule.

## 🛠️ Tecnologías

### Backend
- Java 17
- Spring Boot 3.5
- Spring Security + JWT
- JPA / Hibernate
- PostgreSQL
- Lombok
- Maven

### Frontend
- React 18
- React Router
- Axios
- Lucide React
- Vite

## 🏗️ Arquitectura

### Backend (capas)
entity → repository → service → controller → dto

### Frontend
pages → components → services → context

## 🔐 Seguridad

- Autenticación mediante JWT (HMAC-SHA256)
- Roles: ROLE_USER y ROLE_ADMIN
- Rutas protegidas por rol

| Método | Ruta | Acceso |
|--------|------|--------|
| POST | /auth/register | Público |
| POST | /auth/login | Público |
| GET | /api/** | USER / ADMIN |
| POST, PUT, DELETE | /api/** | ADMIN |

## 📋 Entidades

- User / Role
- Product (Producto)
- Category (Categoría)
- Supplier (Proveedor)
- Warehouse (Bodega)
- StockMovement (Movimiento de stock)

## 🚀 Cómo ejecutar

### Requisitos
- JDK 17
- PostgreSQL
- Node.js

### Backend
1. Crear base de datos en PostgreSQL: inventario_db
2. Configurar credenciales en application.properties
3. Ejecutar:
./mvnw spring-boot:run

### Frontend
cd inventario-frontend
npm install
npm run dev

## 👥 Integrantes
- Leandro Torres
- Nicolás Rojas

## 🏫 Universidad Católica del Maule — 2026
