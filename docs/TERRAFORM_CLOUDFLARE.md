# Terraform Instructions — Cloudflare

This document provides instructions for the Terraform agent managing Cloudflare resources for this SSR application.

## Architecture Position

```
Client (HTTPS)
  → Cloudflare Tunnel     ← YOU ARE HERE (TLS terminates here)
  → Gateway VM (NPM)
  → Kubernetes Ingress    [nginx-ingress-controller]
  → Nuxt SSR App
```

---

## Provider

```hcl
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}
```

---

## Rules

### 1. SSL/TLS Mode — must be `full`, never `flexible`

`flexible` sends HTTP to the origin and causes redirect loops because the SSR app receives
`X-Forwarded-Proto: http` but the browser sends HTTPS cookies.
`full_strict` requires a valid certificate on the Nginx gateway, which is unnecessary overhead
since the tunnel is already authenticated.

```hcl
resource "cloudflare_zone_settings_override" "tfdevs" {
  zone_id = var.zone_id
  settings {
    ssl = "full"
  }
}
```

### 2. Disable Rocket Loader

Rocket Loader reorders JavaScript execution and breaks Vue/Nuxt hydration — the client-rendered
DOM will not match the SSR output.

```hcl
settings {
  rocket_loader = "off"
}
```

### 3. Disable Auto Minify for HTML, JS, and CSS

Auto minification modifies the HTML/JS/CSS that Nuxt SSR outputs, changing checksums and
breaking hydration. Nuxt already minifies at build time.

```hcl
settings {
  minify {
    html = "off"
    js   = "off"
    css  = "off"
  }
}
```

### 4. Disable Mirage and Polish

Mirage and Polish intercept image URLs and rewrite them. This conflicts with `@nuxt/image`
Cloudflare provider which already handles image optimization via `https://tfdevs.com/cdn-cgi/image/`.

```hcl
settings {
  mirage = "off"
  polish = "off"
}
```

### 5. Cache Rules — bypass HTML, cache static assets

The SSR app uses Nitro ISR with per-route `Cache-Control` headers. Cloudflare must respect those
and must NOT cache HTML pages (hydration state would be served stale to the wrong user).

Use a `cloudflare_ruleset` Cache Rule (not the deprecated Page Rules):

```hcl
resource "cloudflare_ruleset" "cache_rules" {
  zone_id = var.zone_id
  name    = "Cache rules"
  kind    = "zone"
  phase   = "http_request_cache_settings"

  # Rule 1: Bypass cache for all HTML routes
  rules {
    description = "Bypass cache for SSR HTML"
    expression  = "(http.request.uri.path.extension eq \"\") or (http.request.uri.path.extension eq \"html\")"
    action      = "set_cache_settings"
    action_parameters {
      cache = false
    }
    enabled = true
  }

  # Rule 2: Cache static assets aggressively
  rules {
    description = "Cache static assets"
    expression  = "(http.request.uri.path.extension in {\"js\" \"css\" \"woff2\" \"woff\" \"ttf\" \"svg\" \"png\" \"jpg\" \"webp\" \"ico\" \"gif\"})"
    action      = "set_cache_settings"
    action_parameters {
      cache = true
      edge_ttl {
        mode    = "override_origin"
        default = 2592000 # 30 days
      }
      browser_ttl {
        mode    = "override_origin"
        default = 86400 # 1 day
      }
    }
    enabled = true
  }
}
```

### 6. Cloudflare Tunnel — set origin timeouts and keep-alive

The tunnel must stay alive for SSR rendering. Short timeouts cause 524 errors on slow pages.

```hcl
resource "cloudflare_tunnel_config" "tfdevs" {
  account_id = var.account_id
  tunnel_id  = cloudflare_tunnel.tfdevs.id

  config {
    ingress_rule {
      hostname = "tfdevs.com"
      service  = "http://192.168.100.202:30389" # Gateway VM NPM
    }
    ingress_rule {
      service = "http_status:404"
    }

    origin_request {
      connect_timeout      = "30s"
      tcp_keep_alive       = "30s"
      keep_alive_timeout   = "90s"
      keep_alive_connections = 100
      no_tls_verify        = false
      http2_origin         = false  # NPM does not terminate TLS, keep false
    }
  }
}
```

### 7. Always Use HTTPS — on

Redirects any plain HTTP requests (e.g. direct IP or misconfigured client) to HTTPS.

```hcl
settings {
  always_use_https = "on"
}
```

### 8. HTTP/2 and HTTP/3 — on

```hcl
settings {
  http2 = "on"
  http3 = "on"
}
```

---

## Full `cloudflare_zone_settings_override` Reference

```hcl
resource "cloudflare_zone_settings_override" "tfdevs" {
  zone_id = var.zone_id

  settings {
    ssl              = "full"
    always_use_https = "on"
    http2            = "on"
    http3            = "on"
    rocket_loader    = "off"
    mirage           = "off"
    polish           = "off"

    minify {
      html = "off"
      js   = "off"
      css  = "off"
    }
  }
}
```

---

## What NOT to do

| Do NOT | Reason |
|--------|--------|
| Set `ssl = "flexible"` | Causes redirect loops — origin sees HTTP but browser sends secure cookies |
| Set `ssl = "full_strict"` | Requires a valid cert on the gateway VM, unnecessary for a Cloudflare Tunnel setup |
| Enable `rocket_loader` | Reorders JS execution, breaks Vue/Nuxt hydration |
| Enable `minify` for HTML or JS | Modifies SSR output checksums, breaks hydration |
| Enable `polish` or `mirage` | Conflicts with `@nuxt/image` Cloudflare provider |
| Cache HTML at Cloudflare level | Nuxt ISR manages cache; Cloudflare caching HTML would serve stale state globally |
| Set tunnel `no_tls_verify = true` | Insecure — only needed if origin uses a self-signed cert |
