
# 🏃‍♂️ Real-Time Ultramarathon Tracker API

A **Flask-based API** for streaming **mock real-time geospatial data** of runners during an ultramarathon competition.

This project processes **GeoJSON files** representing runners and the track, and generates **live location and distance** updates for each participant.

---

## ⚡ Quickstart

1. Clone this repo and `cd` into it.
2. Copy and edit the following environment files in the project root (see below for example content):
	- `.env.dev`
	- `.env.dev.db`
3. Build and start the development containers:
	```sh
	docker compose -f docker-compose.dev.yml down -v
	docker compose -f docker-compose.dev.yml up -d --build
	```
4. Preprocess data if needed (see ETL section below).
5. Seed the development database:
	```sh
	docker compose -f docker-compose.dev.yml exec web python manage.py create_db
	docker compose -f docker-compose.dev.yml exec web python manage.py seed_db
	docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_route
	docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_runners
	```
6. Open [http://127.0.0.1:8080/register_runners](http://127.0.0.1:8080/register_runners) in your browser to see the data table.
7. For live data, visit [http://127.0.0.1:8080/live](http://127.0.0.1:8080/live).

---

**Python version:** 3.11 (see Dockerfiles)

**Port mapping:**
- Nginx serves the app at [http://127.0.0.1:8080/](http://127.0.0.1:8080/)
- Flask runs internally on port 5000

**Data folders:**
- Raw GeoJSON: `services/web/process_data/data/`
- Processed/mock data: `services/web/project/mock_data/`

**Makefile usage:**
- The Makefile is only for production setup (not used for development).
- Run `make help` to see all available commands and their descriptions.

**Main API Endpoints:**

| Endpoint                        | Description                                      |
|---------------------------------|--------------------------------------------------|
| `/live`                         | Streams real-time runner data as JSON            |
| `/register_runners`             | Table view of runners from the database          |
| `/`                             | Main app index (login required)                  |
| `/profile`, `/results`, etc.    | Other app pages (see code for details)           |



## 🚀 Features

- 📡 Simulates real-time GPS tracking of runners  
- 🗺️ Processes and streams geospatial data (GeoJSON)  
- 🔧 Built with **Flask**, served with **Gunicorn + Nginx**  
- 🐳 Dockerized for easy production deployment  

---


## ⚙️ Environment Configuration

Before running the project, make sure the following **environment files exist in the root of the project** with content similar to this (values should be changed as needed):


### ETL Process: Data Preprocessing (Demo)

Before seeding the database (in either development or production), you may need to preprocess the raw data as part of the ETL (Extract, Transform, Load) workflow. This step applies to both environments, as this project is intended as a demo.

To start, open a shell inside the development web container:

```sh
docker compose -f docker-compose.dev.yml exec web bash
```

Inside the container, run the following scripts as needed:

1. **Generate distance for each runner:**
	```sh
	python process_data/get_distance.py
	```

2. **Prepare data for ingestion into PostgreSQL:**
	If `ciucas_runners.json` and `ciucas_route.json` do not exist in the `mock_data` folder, or if the data becomes corrupted, run:
	```sh
	python process_data/trim_json.py
	```

---

### ✅ Production Environment
Ensure these files are created before starting the Docker containers.
**.env.prod.db**
```env
POSTGRES_USER=hello_flask
POSTGRES_PASSWORD=hello_flask
POSTGRES_DB=hello_flask_prod
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgresql://hello_flask:hello_flask@db:5432/hello_flask_prod
```

**.env.prod**
```env
FLASK_APP=project/__init__.py
FLASK_DEBUG=0
APP_FOLDER=/home/app/web
SECRET_KEY="prod-secret-key"
```


### ✅ Development Environment
Ensure these files are created before starting the Docker containers.

**.env.dev.db**
```env
POSTGRES_USER=hello_flask
POSTGRES_PASSWORD=hello_flask
POSTGRES_DB=hello_flask_dev
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgresql://hello_flask:hello_flask@db:5432/hello_flask_dev
```

**.env.dev**
```env
FLASK_APP=project/__init__.py
FLASK_DEBUG=1
APP_FOLDER=/home/app/web
SECRET_KEY="dev-secret-key"
```

These files are required for the application to connect to the database and initialize the Flask app correctly in both environments.



---

## 📦 Production Setup

### Build and Run the Production Container using Makefile commands


```sh
make down
make build
```


### Create and Seed the Production Database

```sh
make create-db
make seed_users
make seed-route
make seed-runners
```


### 🛠️ Accessing pgAdmin (PostgreSQL UI)

To manage and inspect your PostgreSQL database visually, you can use **pgAdmin**. Once the development containers are running, open [http://localhost:5555](http://localhost:5555) in your browser to access the pgAdmin UI.

**Default login credentials:**
- **Email:** admin@admin.com
- **Password:** admin

You can use pgAdmin to browse tables, run SQL queries, and manage your database easily during development.

---

### ✅ Validate Table Contents (Print Data)

After seeding, you can print the contents of your tables to validate the data:


```sh
# Print all user data
make print-db

# Print all runners
make print-runners

# Print all route points
make print-routes
```

---

## 🛠️ Development Setup

### Build and Run the Development Container

To fully reset and rebuild the development environment:
#### 1. Stop and remove previous containers (including volumes)
```sh
docker compose -f docker-compose.dev.yml down -v 
```
OR (more aggressive cleanup, recommended if something is broken)
```sh
docker compose -f docker-compose.dev.yml down --remove-orphans -v
```
#### 2. Build and start containers
```sh
docker compose -f docker-compose.dev.yml up -d --build
```

### Create and Seed the Development Database

Once your data is preprocessed and ready, you can proceed to create and seed the development database with the following commands:

```sh
docker compose -f docker-compose.dev.yml exec web python manage.py create_db
docker compose -f docker-compose.dev.yml exec web python manage.py seed_db
docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_route
docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_runners


### ✅ Validate Table Contents (Print Data)

After seeding, you can print the contents of your tables to validate the data:

```sh
# Print all user data
docker compose -f docker-compose.dev.yml exec web python manage.py print_users

# Print all runners
docker compose -f docker-compose.dev.yml exec web python manage.py print_runners

# Print all route points
docker compose -f docker-compose.dev.yml exec web python manage.py print_routes
```

---

## 🔁 Container Management

### Restart containers (prod)

# 🏃‍♂️ Real-Time Ultramarathon Tracker API

A **Flask-based API** for streaming **mock real-time geospatial data** of runners during an ultramarathon competition.

This project processes **GeoJSON files** representing runners and the track, and generates **live location and distance** updates for each participant.

---

## 🚀 Features

- 📡 Simulates real-time GPS tracking of runners  
- 🗺️ Processes and streams geospatial data (GeoJSON)  
- 🔧 Built with **Flask**, served with **Gunicorn + Nginx**  
- 🐳 Dockerized for easy production deployment  

---

## ⚡ Quickstart

1. Clone this repo and `cd` into it.
2. Copy and edit the following environment files in the project root (see below for example content):
	- `.env.dev`
	- `.env.dev.db`
3. Build and start the development containers:
	```sh
	docker compose -f docker-compose.dev.yml down -v
	docker compose -f docker-compose.dev.yml up -d --build
	```
4. Preprocess data if needed (see ETL section below).
5. Seed the development database:
	```sh
	docker compose -f docker-compose.dev.yml exec web python manage.py create_db
	docker compose -f docker-compose.dev.yml exec web python manage.py seed_db
	docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_route
	docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_runners
	```
6. Open [http://127.0.0.1:8080/register_runners](http://127.0.0.1:8080/register_runners) in your browser to see the data table.
7. For live data, visit [http://127.0.0.1:8080/live](http://127.0.0.1:8080/live).

---

## 📖 Main API Endpoints

Below are the main endpoints, listed in the order you’ll likely use them as you explore the project:

| Endpoint                        | Description                                      |
|---------------------------------|--------------------------------------------------|
| `/live`                         | Streams real-time runner data as JSON            |
| `/register_runners`             | Table view of runners from the database          |
| `/`                             | Main app index (login required)                  |
| `/profile`, `/results`, etc.    | Other app pages (see code for details)           |

---

## 📂 Data Folders

- Raw GeoJSON: `services/web/process_data/data/`
- Processed/mock data: `services/web/project/mock_data/`

---

## ⚙️ Environment Configuration

**Python version:** 3.11 (see Dockerfiles)

**Port mapping:**
- Nginx serves the app at [http://127.0.0.1:8080/](http://127.0.0.1:8080/)
- Flask runs internally on port 5000

Before running the project, make sure the following **environment files exist in the root of the project** with content similar to this (values should be changed as needed):

### ✅ Development Environment
Ensure these files are created before starting the Docker containers.

**.env.dev.db**
```env
POSTGRES_USER=hello_flask
POSTGRES_PASSWORD=hello_flask
POSTGRES_DB=hello_flask_dev
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgresql://hello_flask:hello_flask@db:5432/hello_flask_dev
```

**.env.dev**
```env
FLASK_APP=project/__init__.py
FLASK_DEBUG=1
APP_FOLDER=/home/app/web
SECRET_KEY="dev-secret-key"
```

These files are required for the application to connect to the database and initialize the Flask app correctly in development.

---

### ✅ Production Environment
Ensure these files are created before starting the Docker containers.

**.env.prod.db**
```env
POSTGRES_USER=hello_flask
POSTGRES_PASSWORD=hello_flask
POSTGRES_DB=hello_flask_prod
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgresql://hello_flask:hello_flask@db:5432/hello_flask_prod
```

**.env.prod**
```env
FLASK_APP=project/__init__.py
FLASK_DEBUG=0
APP_FOLDER=/home/app/web
SECRET_KEY="prod-secret-key"
```

These files are required for the application to connect to the database and initialize the Flask app correctly in production.

---

## 🛠️ Development Setup

### Build and Run the Development Container

```sh
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d --build
```

### Create and Seed the Development Database

Once your data is preprocessed and ready, you can proceed to create and seed the development database with the following commands:

```sh
docker compose -f docker-compose.dev.yml exec web python manage.py create_db
docker compose -f docker-compose.dev.yml exec web python manage.py seed_db
docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_route
docker compose -f docker-compose.dev.yml exec web python manage.py seed_db_runners
```

### ✅ Validate Table Contents (Print Data)

After seeding, you can print the contents of your tables to validate the data:

```sh
# Print all user data
docker compose -f docker-compose.dev.yml exec web python manage.py print_users

# Print all runners
docker compose -f docker-compose.dev.yml exec web python manage.py print_runners

# Print all route points
docker compose -f docker-compose.dev.yml exec web python manage.py print_routes
```

---

## 📦 Production Setup

**Makefile usage:**
- The Makefile is only for production setup (not used for development).
- Run `make help` to see all available commands and their descriptions.

### Build and Run the Production Container using Makefile commands

```sh
make down
make build
```

### Create and Seed the Production Database

```sh
make create-db
make seed_users
make seed-route
make seed-runners
```

### ✅ Validate Table Contents (Print Data)

After seeding, you can print the contents of your tables to validate the data:

```sh
# Print all user data
make print-db

# Print all runners
make print-runners

# Print all route points
make print-routes
```

---

## 🔁 Container Management

### Restart containers (prod)
```sh
docker compose -f docker-compose.prod.yml up -d
```

### Restart containers (dev)
```sh
docker compose -f docker-compose.dev.yml up -d
```

### Force restart containers
```sh
docker compose -f docker-compose.prod.yml restart
docker compose -f docker-compose.dev.yml restart
```

---

## 🧩 ETL Process: Data Preprocessing (Demo)

Before seeding the database (in either development or production), you may need to preprocess the raw data as part of the ETL (Extract, Transform, Load) workflow. This step applies to both environments, as this project is intended as a demo.

To start, open a shell inside the development web container:

```sh
docker compose -f docker-compose.dev.yml exec web bash
```

Inside the container, run the following scripts as needed:

1. **Generate distance for each runner:**
	```sh
	python process_data/get_distance.py
	```

2. **Prepare data for ingestion into PostgreSQL:**
	If `ciucas_runners.json` and `ciucas_route.json` do not exist in the `mock_data` folder, or if the data becomes corrupted, run:
	```sh
	python process_data/trim_json.py
	```

---

## 🖼️ Visualize Data

There are several ways to view and understand the real-time data provided by this project:

1. **Web App Views:**
	- Visit [http://127.0.0.1:8080/live](http://127.0.0.1:8080/live) to see the raw JSON data as it is streamed from PostgreSQL. This endpoint simulates real-time updates of runner locations and stats.
	- Go to [http://127.0.0.1:8080/register_runners](http://127.0.0.1:8080/register_runners) to see a user-friendly table displaying the runners as they are pulled from the database. This page is useful for quickly verifying the data in a readable format.

2. **Database Visualization with pgAdmin:**
	- You can visually inspect and manage your PostgreSQL database using the pgAdmin web UI. Once your containers are running, open [http://localhost:5555](http://localhost:5555) in your browser. Log in with:
		- **Email:** admin@admin.com
		- **Password:** admin
	- pgAdmin allows you to browse tables, run SQL queries, and view your data directly, making it easy to compare the web app’s output with the underlying database contents during development.

3. **Interactive Map Visualization:**
	- For a richer, map-based experience, the data from the `/live` endpoint is consumed by an external web app: [https://mapwizard.eu/projects/realtime-ultra/index.html](https://mapwizard.eu/projects/realtime-ultra/index.html). This app displays the runners' locations and stats on an interactive map, providing a real-time visual demo of the tracking system.

---

## 📝 Project Summary

This repository demonstrates a full-stack workflow for real-time geospatial data streaming and visualization:
- Data is preprocessed and loaded into PostgreSQL.
- The Flask API streams this data in real time via the `/live` endpoint.
- You can inspect the data directly (raw JSON), in a table view (`/register_runners`), or on a live map (external web app).

This setup is ideal for showcasing ETL, API, and real-time data visualization skills in a modern, containerized environment.
