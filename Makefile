.PHONY: build start stop live-reload test coverage lint generate-migration migration-up migration-down
# Load environment variables
include .env
export

# Define variable for migration directory and PostgreSQL URL
MIGRATION_SOURCE = dist/infraestructure/database/db.js

# Docker tasks
build:
	docker-compose -p nodejs-ts-clean-architecture build

start:
	docker-compose up -d

stop:
	docker-compose down

# Standalone usage for live reloading
live-reload:
	npm run dev

# Testing
test:
	npm run test

coverage:
	npm run coverage

# Cleaning, Formatting, Linting, and Vetting
lint:
	npm run lint

# Database Migration
# Generate migration scripts
generate-migration:
	npm run compile && \
   npx cross-env DB_HOST="$(DB_HOST)" DB_PORT=$(DB_PORT) DB_USER=$(DB_USER) DB_PASSWORD=$(DB_PASSWORD) DB_NAME=$(DB_NAME) \
   typeorm migration:generate -d $(MIGRATION_SOURCE) src/infraestructure/database/migration/$(FILE)

migration-up:
	migrate create -ext sql -dir $(MIGRATIONS_DIR) -seq $(name)

migration-down:
	migrate -database $(POSTGRESQL_URL) -path $(MIGRATIONS_DIR) up

# Usage instructions:
# - To build the server: make build-server
# - To start the server: make start-server
# - To stop the server: make stop-server
# - For live reloading during development: make live-reload
# - To run tests: make test
# - To check test coverage: make test-coverage
# - To clean dependencies: make clean-deps
# - To format code: make format
# - To clean unused imports: make clean-imports
# - To lint code: make lint
# - To vet code: make vet
# - To check for shadowed variables: make check-shadow
# - To lint, format and vet your once: make lint-format
# - To create a migration script (replace your_script_name with the actual name): make migrate-create name=your_script_name
# - To run migration scripts: make migrate-up
