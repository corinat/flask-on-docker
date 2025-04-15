# 🏃‍♂️ Real-Time Ultramarathon Tracker API:wq

A **Flask-based API** for streaming **mock real-time geospatial data** of runners during an ultramarathon competition.

This project processes **GeoJSON files** representing runners and the track, and generates **live location and distance** updates for each participant.

---

## 🚀 Features

- 📡 Simulates real-time GPS tracking of runners  
- 🗺️ Processes and streams geospatial data (GeoJSON)  
- 🔧 Built with **Flask**, served with **Gunicorn + Nginx**  
- 🐳 Dockerized for easy production deployment  

---

## ⚙️ Environment Configuration

Before running the project, make sure the following **environment files exist in the root of the project** with content similar to this (values should be changed as needed):

### ✅ `.env.prod.db`

```env
POSTGRES_USER=hello_flask
POSTGRES_PASSWORD=hello_flask
POSTGRES_DB=hello_flask_prod
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgresql://hello_flask:hello_flask@db:5432/hello_flask_prod
```

### ✅ `.env.prod`

```env
FLASK_APP=project/__init__.py
FLASK_DEBUG=0
APP_FOLDER=/home/app/web
SECRET_KEY="9OLWxND4o83j4K4iuopO"
```
These files are required for the application to connect to the database and initialize the Flask app correctly.


📦 Production Setup
🔨 Build and Run the Production Container

```sh
docker compose -f docker-compose.prod.yml down -v 
docker compose -f docker-compose.prod.yml up -d --build
```

🧰 Run the following commands to create and seed the database:
```sh
docker compose -f docker-compose.prod.yml exec web python manage.py create_db   
docker compose -f docker-compose.prod.yml exec web python manage.py seed_db 
docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_route
docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_runners
```

🔁 Container Management
Restart containers
```sh
docker compose -f docker-compose.prod.yml up -d
```

Force restart containers
```
docker compose -f docker-compose.prod.yml restart
```
