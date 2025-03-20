
.PHONY: build exec-web create-db seed-route seed_users seed-runners down build-dev down-dev help
help:                             ## Display a help message detailing commands and their purpose
	@echo "Commands:"
	@grep -E '^([a-zA-Z_-]+:.*?## .*|#+ (.*))$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""

## [Managing containers for prod]

build:							## builds the docker container
	docker-compose -f docker-compose.prod.yml up -d --build
exec-web:						## run the docker container in web container
	docker compose exec web bash
create-db:						## create database with flask cli
	docker-compose -f docker-compose.prod.yml exec web python manage.py create_db
seed_users:  					## push data for users table
	 docker compose -f docker-compose.prod.yml exec web python manage.py seed_db 
seed-route:						## push data for running route mock data
	docker-compose -f docker-compose.prod.yml exec web python manage.py seed_db_route
seed-runners:					## push data for runners mock data
	docker-compose -f docker-compose.prod.yml exec web python manage.py seed_db_runners
down:							## stop the docker container
	docker-compose -f docker-compose.prod.yml down -v 
restart:						## restart containers
	docker compose -f docker-compose.prod.yml up -d
force-restart:					## force restart containers
	docker compose -f docker-compose.prod.yml restart
