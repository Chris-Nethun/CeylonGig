# CeylonGig

CeylonGig is organized as a set of Spring Boot services with a React/Vite frontend.
The service directories below are structure placeholders; add each service's
application code and build configuration there as it is implemented.

## Repository layout

- `infrastructure/discovery-server` — service discovery, planned for port 8761
- `infrastructure/api-gateway` — API gateway, planned for port 8080
- `services/identity-service` — identity and profiles, planned for port 8081
- `services/gig-service` — marketplace listings, planned for port 8082
- `services/order-service` — orders, planned for port 8083
- `services/payment-service` — payments, planned for port 8084
- `services/rating-service` — ratings, planned for port 8085
- `services/chat-service` — messaging, planned for port 8086
- `frontend-web` — React + Vite frontend, port 5173
- `docs` — project documentation and API/design references

## Local infrastructure

Docker Compose starts MongoDB, PostgreSQL, and RabbitMQ for local development:

```powershell
docker compose up -d
docker compose ps
docker compose down
```

The Compose credentials are local-development defaults only. Do not use them in
deployed environments. Copy values from `.env.example` into `.env` if you need to
override local settings.
