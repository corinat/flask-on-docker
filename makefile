# ==============================
# Environment
# ==============================

prepare-env:
	cp .env.prod .env

# ==============================
# Phony targets
# ==============================

.PHONY: help build exec-web create-db seed-users seed-route seed-runners down restart force-restart \
        print-users print-runners print-routes

# ==============================
# Help
# ==============================

help: ## Display available commands
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

# ==============================
# Production - Containers
# ==============================

build: prepare-env ## Build and start production containers
	docker compose -f docker-compose.prod.yml up -d --build

exec-web: prepare-env ## Open shell inside web container
	docker compose -f docker-compose.prod.yml exec web bash

down: prepare-env ## Stop and remove containers + volumes
	docker compose -f docker-compose.prod.yml down -v

restart: prepare-env ## Restart containers (no rebuild)
	docker compose -f docker-compose.prod.yml up -d

force-restart: prepare-env ## Force restart running containers
	docker compose -f docker-compose.prod.yml restart

# ==============================
# Database - Setup
# ==============================

create-db: prepare-env ## Create database
	docker compose -f docker-compose.prod.yml exec web python manage.py create_db

seed-users: prepare-env ## Seed users table
	docker compose -f docker-compose.prod.yml exec web python manage.py seed_db

seed-route: prepare-env ## Seed route data
	docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_route

seed-runners: prepare-env ## Seed runners data
	docker compose -f docker-compose.prod.yml exec web python manage.py seed_db_runners

# ==============================
# Database - Debug / Print
# ==============================

print-users: prepare-env ## Print users table
	docker compose -f docker-compose.prod.yml exec web python manage.py print_users

print-runners: prepare-env ## Print runners table
	docker compose -f docker-compose.prod.yml exec web python manage.py print_runners

print-routes: prepare-env ## Print route data
	docker compose -f docker-compose.prod.yml exec web python manage.py print_routes