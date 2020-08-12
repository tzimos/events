start-docker:
	docker-compose -f docker/docker-compose.dev.yaml up -d

stop-docker:
	docker-compose -f docker/docker-compose.dev.yaml down

start-prod:
	docker-compose -f docker/docker-compose.prod.yaml up


stop-prod:
	docker-compose -f docker/docker-compose.prod.yaml down