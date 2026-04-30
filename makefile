prepare-env:
    cp .env.prod .env

.PHONY: build exec-web create-db seed-route seed_users seed-runners down build-dev down-dev help print-db print-runners print-routes

help: ## Display a help message detailing commands and their purpose
    @echo "Commands:"
    @grep -E '^([a-zA-Z_-]+:.*?## .*|#+ (.*))$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
    @echo ""

## [Managing containers for prod]

build: prepare-env ## builds the docker container
    docker compose -f docker-compose.prod.yml up -d --build

exec-web: prepare-env ## run the docker container in web container
    docker compose exec web bash

create-db: prepare-env ## create database with flask cli
    docker compose -f docker-compose.prod.yml exec web python manage.py create_db

seed_users: prepare-env ## push data for users table
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db 

seed-route: prepare-env ## push data for running route mock data
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_route

seed-runners: prepare-env ## push data for runners mock data
    docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_runners

down: prepare-env ## stop the docker container
    docker compose -f docker-compose.prod.yml down -v 

restart: prepare-env ## restart containers
    docker compose -f docker-compose.prod.yml up -d

force-restart: prepare-env ## force restart containers
    docker compose -f docker-compose.prod.yml restart

# --- Print table contents (prod) ---
print-users: prepare-env ## Print all user data from the production database
    docker compose -f docker-compose.prod.yml exec web python manage.py print_users

print-runners: prepare-env ## Print all runners from the production database
    docker compose -f docker-compose.prod.yml exec web python manage.py print_runners

print-routes: prepare-env ## Print all route points from the production database
    docker compose -f docker-compose.prod.yml exec web python manage.py print_routes