# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit multi-tier application.

## Environment Variable

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces.

Example:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Safe fallback is enabled to avoid `https://undefined-8000...` URLs. If `VITE_CODESPACE_NAME` is unset, the frontend calls:

```text
http://localhost:8000/api/[component]/
```
