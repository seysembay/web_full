
# Проектная работа: Training Site
Training Site - Платформа для дистанционного обучения – это сайт, где размещаются образовательные материалы, а также сервис-посредник между спикером и обучающимся. На цифровой платформе хранятся данные, проходит обучение и проверка знаний.
## Запуск
Для запуска необходимо предварительно установить docker compose и выполнить следующее:

Клонировать проект

```bash
  git clone https://github.com/seysembay/web_full.git
```

Перейти в папку с проектом

```bash
  cd project
```
Создать файл .env и определить переменные:

- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- SECRET_KEY
- DJANGO_SUPERUSER_USERNAME
- DJANGO_SUPERUSER_PASSWORD
- DJANGO_SUPERUSER_EMAIL

Запустить docker

```bash
  docker compose --env-file .env up --build
```


## Обо мне 😄
😎🖥fullstack developer

⭐️ PHP - Laravel

⭐️ Javascript - Vue, React

⭐️ Python - Django, Django Rest Framework, FastAPI