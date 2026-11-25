# CeylonGig frontend

React + Vite frontend for the CeylonGig marketplace. The app is organized by feature (`identity`, `marketplace`, `workspace`, and `trust`) with shared components, API clients, contexts, routes, and utilities under `src/`.

## Run locally

```powershell
cd frontend-web
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173` and proxies `/api` and `/ws` to the Spring Boot server at `http://localhost:8080`.

Set `VITE_API_BASE_URL` and `VITE_WS_BASE_URL` in `.env` to override those defaults. The backend should provide the matching `/api/v1` REST endpoints and `/ws` SockJS endpoint.

## Build

```powershell
npm run build
```
