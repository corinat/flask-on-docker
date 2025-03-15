# Flask API to stream data, mocking realtime streaming

### Development

Uses the default Flask development server.

1. Rename *.env.dev-sample* to *.env.dev* and *.env.dev.db-sample* to *.env.dev.db*.
2. Update the environment variables in the *docker-compose.yml* and *.env.dev* files.
    - (M1 chip only) Remove `-slim-buster` from the Python dependency in `services/web/Dockerfile` to suppress an issue with installing psycopg2
3. Build the images and run the containers:

    ```   
    docker compose -f docker-compose.yml down -v
    docker compose up -d --build
    ```

    Test it out at [http://localhost:5000](http://localhost:5000). The "web" folder is mounted into the container and your code changes apply automatically.

4. Build the images and run the dev containers:
    Test it out at [http://localhost:5001](http://localhost:5001). 

    
### Production

Uses gunicorn + nginx.

1. Rename *.env.prod-sample* to *.env.prod* and *.env.prod.db-sample* to *.env.prod.db*. Update the environment variables.
2. Build the images and run the prod containers:

    ```sh
    docker compose -f docker-compose.prod.yml down -v 
    docker compose -f docker-compose.prod.yml up -d --build
    docker compose -f docker-compose.prod.yml exec web python manage.py create_db   
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db 
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_route
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_runners
    ```
    Test it out at [http://localhost:1337](http://localhost:1337). No mounted folders. To apply changes, the image must be re-built.

