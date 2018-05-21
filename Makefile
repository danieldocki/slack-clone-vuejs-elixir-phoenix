SHELL=/bin/bash

.PHONY: all
all: up_backend up_frontend

.PHONY: up_backend
up_backend:
	cd api && \
		mix deps.get && \
		mix deps.update postgrex && \
		mix deps.compile postgrex && \
		docker-compose up -d && \
		mix ecto.create && \
		mix ecto.migrate && \
		mix phoenix.server

.PHONY: up_frontend
up_frontend:
	cd web && \
		yarn && \
		yarn run dev
