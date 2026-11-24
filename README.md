<<<<<<< HEAD
# MERN Todo (PERN: Postgres + Express + React + Node)

Same structure as `aotm_ams`: `apps/api` (module → controller/service/repository/routes/validators) and `apps/web` (Vite + React + Tailwind + React Query).

## Run
1. Create the DB and run `database/schema.sql` (or `docker compose up db`).
2. `copy apps\api\.env.example apps\api\.env`
3. `npm run install:all`
4. `npm run dev` → web http://localhost:5173, API http://localhost:5000

## API
| Method | Path | |
|---|---|---|
| GET | /api/todos | list |
| POST | /api/todos | create `{title, description?}` |
| PUT | /api/todos/:id | update `{title, description?, isDone}` |
| PATCH | /api/todos/:id/toggle | toggle done |
| DELETE | /api/todos/:id | delete |
=======
# devops-mern-todo
This project is learning puporse of devops with mern stack
>>>>>>> 92b4d46eb0ddf99c65217df6d1cb6a49d87ba7e9
