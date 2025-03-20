# Flask API to stream data, mocking realtime streaming

### Production

Uses gunicorn + nginx.


1. Build the images and run the prod containers:

    ```sh
    docker compose -f docker-compose.prod.yml down -v 
    docker compose -f docker-compose.prod.yml up -d --build
    docker compose -f docker-compose.prod.yml exec web python manage.py create_db   
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db 
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_route
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_runners
    ```

    Restart containers
    ```sh
    docker compose -f docker-compose.prod.yml up -d
    ```

    Force restart containers
    ```
    docker compose -f docker-compose.prod.yml restart
    ```
