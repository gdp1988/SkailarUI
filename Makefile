include .env

.PHONY: all

build:
	docker build -t skailar .

run:
	export $(cat .env | xargs)
	docker stop skailar || true && docker rm skailar || true
	docker run --name skailar --rm -e OPENAI_API_KEY=${OPENAI_API_KEY} -p 3000:3000 skailar

logs:
	docker logs -f skailar

push:
	docker tag skailar:latest ${DOCKER_USER}/skailar:${DOCKER_TAG}
	docker push ${DOCKER_USER}/skailar:${DOCKER_TAG}