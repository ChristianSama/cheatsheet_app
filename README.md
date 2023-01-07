# Proyecto Core
Proyecto realizado para la materia de Ingenieria web - Universidad de las Américas. - Semestre 2023-01

## Deployado en render:
https://cheatsheets-frontend.onrender.com/

## Tecnologías
- Backend: Django

- Frontend: React y Typescript

- DB: postgreSQL
## Introducción
Consiste en una aplicación web que facilite la creación de
“cheatsheets” o “hojas de trucos” de programación y poder compartirlas con 
otros usuarios de la aplicación.

El feed principal utiliza un algoritmo de ordenamiento que muestra las publicaciones más relevantes para el usuario autenticado basado en los upvotes realizados previamente.

## Funcionalidades
- Registro
- Autenticación y Autorización usando JWT
- Creación de cheatsheets
- Eliminación de cheatsheets
- Actualización de cheatsheets
- Feed (Ordenado por upvotes del usuario)

## Instrucciones
1. Clonar el proyecto
```
git clone https://github.com/ChristianSama/cheatsheet_app.git
```
2. Modificar el archivo `example.env` para agregar variables de entorno y el string de conexión a la base de datos. Renombrarlo a `.env`
3. Instalar dependencias
```
pip install -r requirements.txt
```
3. Correr migraciones
```
python manage.py migrate
```
4. Correr el servidor
```
python manage.py runserver
```
3. Crear variable de entorno en `frontend/` que apunta al endpoint del api.
```
cd frontend/
touch .env
echo 'REACT_APP_API_URL=http://localhost:8000/api/' > .env
```
4. Correr el frontend
```
npm start
```