# Mongo Products API

Практическая работа №3–4 — MongoDB + Node.js Driver → Mongoose

**Автор:** Темербаев Ильяс Кайратович  
**Группа:** CS-208(с)

## О проекте

REST API интернет-магазина товаров на Node.js, Express и MongoDB.

Работа выполнена в два этапа:
1. MongoDB Node.js Driver — CRUD, ObjectId, фильтрация, поиск, сортировка и пагинация.
2. Mongoose — Schema, Model, Validation, обработка ошибок и разделение проекта на Routes, Controllers, Models и Middleware.

## Технологии

Node.js, Express.js, MongoDB, MongoDB Driver, Mongoose, Postman, MongoDB Compass, dotenv.

## Запуск

Установить зависимости:

npm install

Запустить сервер:

node server.js

MongoDB: mongodb://localhost:27017  
Database: shop  
Collection: products

## API

GET / — проверка сервера  
POST /products — создание товара  
GET /products — список товаров  
GET /products/:id — получение товара  
PATCH /products/:id — изменение товара  
DELETE /products/:id — удаление товара

Поддерживаются параметры:

?category=phone  
?search=Samsung  
?sort=price_asc  
?sort=price_desc  
?page=1&limit=5

## Mongoose

Schema содержит поля name, price и category с серверной валидацией. Используется timestamps для автоматического создания createdAt и updatedAt.

Обрабатываются CastError, ValidationError и другие серверные ошибки.

## Проверка

API протестирован в Postman. Данные проверены в MongoDB Compass.

Postman Collection: Mongo-Products-Mongoose.postman_collection.json