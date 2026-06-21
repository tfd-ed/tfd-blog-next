# Copilot Instructions — SSR Infrastructure Behind Cloudflare + Nginx + Kubernetes

This project runs an SSR application behind multiple proxy layers:

```
Client
  → Cloudflare Tunnel
  → Gateway VM (Nginx)
  → Kubernetes Ingress
  → SSR Application
```

Because SSR is sensitive to networking and proxy configuration, always follow these infrastructure rules when generating code.

---

## Core Principles

- Never assume the app directly receives internet traffic.
- Never hardcode protocol, host, or origin.
- Always support reverse proxy environments.
- Preserve forwarded headers correctly.
- SSR and client hydration must produce consistent output.
- Avoid logic that behaves differently between server and browser unless explicitly guarded.

---

## Proxy Awareness

The application is deployed behind:

- Cloudflare Tunnel
- Nginx reverse proxy
- Kubernetes ingress

Always assume:

- HTTPS may terminate before reaching Node.js
- Internal traffic may be HTTP
- Client IP may be forwarded through headers

Required headers:

- `X-Forwarded-For`
- `X-Forwarded-Proto`
- `X-Forwarded-Host`
- `CF-Connecting-IP`

When generating Express/NestJS/Nitro code:

```js
app.set("trust proxy", true);
```

Never use `req.protocol` without trust proxy enabled.

Prefer `req.headers['x-forwarded-proto']` when needed.

---

## URL Generation

Never hardcode:

- `localhost`
- internal service DNS
- `http://`
- fixed domains

Always use:

- runtime config
- environment variables
- request host headers

**Bad:**

```js
const api = "http://localhost:3000";
```

**Good:**

```js
const api = process.env.API_BASE_URL;
```

---

## SSR Hydration Safety

Avoid hydration mismatch.

Do NOT generate SSR code that:

- depends on `window` during SSR
- depends on random values during render
- depends on `Date.now()` during SSR render
- depends on client-only browser APIs

Guard browser-only logic:

```js
if (process.client) {
  // browser logic
}
```

or:

```js
if (typeof window !== "undefined") {
  // browser logic
}
```

Keep SSR output deterministic.

---

## Authentication & Cookies

Assume secure cookies are used.

Always support:

- HTTPS proxy environments
- forwarded proto headers
- secure cookies behind reverse proxy

Avoid login loops caused by:

- wrong protocol detection
- secure cookies over internal HTTP

---

## Networking

The application may run inside Kubernetes.

Internal service communication should use:

- environment-configured service URLs
- service discovery
- runtime config

Never assume:

- localhost access between services
- direct pod access
- static IPs

---

## WebSocket / Streaming Support

Infrastructure may proxy:

- WebSockets
- SSE
- streaming SSR

Avoid implementations that:

- depend on raw socket assumptions
- break behind proxies
- require direct TCP exposure unnecessarily

---

## Kubernetes Compatibility

All generated services should:

- support containerization
- use environment variables
- avoid filesystem persistence
- support stateless deployment

Prefer:

- readiness endpoints
- health checks
- graceful shutdown

---

## Nginx Compatibility

Assume Nginx reverse proxy is present.

Generated docs/configs should preserve:

```nginx
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

For websocket support:

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

---

## Cloudflare Tunnel Considerations

Assume:

- TLS terminates at Cloudflare
- app may receive HTTP internally
- real IP comes from forwarded headers

Avoid generating logic that depends on direct public internet exposure.

---

## Environment Variables

Prefer runtime-configurable values.

Examples:

- `API_BASE_URL`
- `APP_URL`
- `PUBLIC_ORIGIN`
- `COOKIE_DOMAIN`
- `NODE_ENV`

Never hardcode production domains.

---

## Performance

SSR performance matters.

Avoid:

- blocking synchronous work
- excessive server-side fetch waterfalls
- unnecessary SSR API calls

Prefer:

- caching
- parallel fetches
- lazy hydration when possible

---

## Logging

Logs should include:

- request IDs
- forwarded IPs
- proxy-aware metadata

Do not expose:

- internal cluster DNS
- sensitive headers
- secrets

---

## Security

Always:

- sanitize headers
- validate forwarded values carefully
- avoid trusting arbitrary proxy headers unless trust proxy is configured

Never expose:

- internal Kubernetes endpoints
- private service DNS
- cluster topology

---

## Deployment Philosophy

This infrastructure is production-oriented.

Generated code should assume:

- distributed systems
- reverse proxies
- Kubernetes orchestration
- SSR rendering under load
- zero-downtime deployment
- containerized runtime
