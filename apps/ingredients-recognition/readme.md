# Ingredients-recognition OCR microservice
Отвечает за распознавание текста на изображениях.
Сервер работает на FastAPI, что позволяет 
использовать Swagger UI для тестирования и документирования API.

URL: `http://localhost:3010`
API DOCS: `http://localhost:3010/docs`

### Запуск
1. Можно запускать вместе с другими сервисами через `docker-compose up --build` в корне проекта
2. Или с помощью команды в ./apps/OCR `uvicorn main:app --host 0.0.0.0 --port 3010`