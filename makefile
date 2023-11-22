
.PHONY: build exec-web create-db seed-route seed-runners down build-dev down-dev help
help:                             ## Display a help message detailing commands and their purpose
	@echo "Commands:"
	@grep -E '^([a-zA-Z_-]+:.*?## .*|#+ (.*))$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""

## [Managing container for prod]

build:							## builds the docker container
	docker-compose -f docker-compose.prod.yml up -d --build
exec-web:						## run the docker container in web container
	docker compose exec web bash
create-db:						## create database with flask cli
	docker-compose -f docker-compose.prod.yml exec web python manage.py create_db
seed-route:						## push data for running route mock data
	docker-compose -f docker-compose.prod.yml exec web python manage.py seed_db_route
seed-runners:					## push data for runners mock data
	docker-compose -f docker-compose.prod.yml exec web python manage.py seed_db_runners
down:							## stop the docker container
	docker-compose -f docker-compose.prod.yml down -v 

## [Managing container for dev]

build-dev:						## builds the docker container create database create tables and push mosk data
	docker-compose up -d --build
down-dev:						## stop the docker container and remove volumes
	docker-compose -f docker-compose.yml down -v 