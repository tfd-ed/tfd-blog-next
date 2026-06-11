# Collaborate Form → n8n → Telegram Bot

Route partnership inquiry submissions from `/collaborate` through your self-hosted n8n instance and deliver a formatted message to Telegram.

---

## Overview

```
Browser (submitForm)
  → POST /api/contact-webhook (Nuxt server route)
    → POST https://n8n.yourdomain.com/webhook/<id>
      → Telegram Bot API → your chat/group
```

Using a Nuxt server-side route as a proxy keeps your n8n webhook URL private and lets you validate/sanitize before forwarding.

---

## Step 1 — Create the Telegram Bot

1. Open Telegram, message **@BotFather** → `/newbot`
2. Follow the prompts, copy the **Bot Token**: `7123456789:AAFxxxx`
3. Add the bot to the channel/group where you want notifications
4. Get your **Chat ID**:
   - For a personal chat: message the bot, then visit `https://api.telegram.org/bot<TOKEN>/getUpdates` — look for `"chat":{"id": ...}`
   - For a group: add `@userinfobot` to the group and it will reply with the group ID (negative number, e.g. `-1001234567890`)

---

## Step 2 — Build the n8n Workflow

### 2.1 Webhook Trigger node
| Field | Value |
|---|---|
| HTTP Method | `POST` |
| Path | `partnership-inquiry` (or any slug) |
| Response Mode | `Immediately` |
| Response Code | `200` |

Your webhook URL will be:
```
https://n8n.yourdomain.com/webhook/partnership-inquiry
```

### 2.2 Telegram node
Connect it after the Webhook node.

| Field | Value |
|---|---|
| Credential | Your Telegram Bot Token credential |
| Resource | `Message` |
| Operation | `Send Message` |
| Chat ID | Your chat/group ID (e.g. `-1001234567890`) |
| Text | *(see message template below)* |
| Parse Mode | `MarkdownV2` |

#### Message Template (paste into the Text field)

Use n8n **expressions** (`{{ }}`) to pull values from the webhook body:

```
🤝 *New Partnership Inquiry*

👤 *Name:* {{ $json.body.name }}
📧 *Email:* {{ $json.body.email }}
🏢 *Company:* {{ $json.body.company }}
💰 *Budget:* {{ $json.body.budget || 'Not specified' }}

📝 *Message:*
{{ $json.body.message }}

---
_Received at {{ $now.toFormat('dd MMM yyyy, HH:mm') }} \(server time\)_
```

> **Note:** MarkdownV2 requires escaping special chars like `.`, `(`, `)`, `-`, `!`. n8n's expression engine does not auto-escape — test with `Parse Mode: Markdown` (v1) first if you run into formatting errors. Switch to MarkdownV2 once the message looks correct.

### 2.3 (Optional) Respond to Webhook node
Add a **Respond to Webhook** node at the end to return a clean JSON response to your Nuxt proxy:

```json
{ "ok": true }
```

---

## Step 3 — Add a Nuxt Server Route (proxy)

Create the file `server/api/contact.post.ts`:

```ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Basic validation
  if (!body.name || !body.email || !body.message) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const n8nUrl = process.env.N8N_WEBHOOK_URL // set in .env

  const res = await $fetch(n8nUrl, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
  })

  return { ok: true }
})
```

Add to your `.env` (and Kubernetes secret / deployment env):

```
N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/partnership-inquiry
```

---

## Step 4 — Update `submitForm` in `collaborate.vue`

Change the `submitForm` function to call your new server route instead of the mock timeout:

```ts
const submitForm = async () => {
  isSubmitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form.value },
    })
    submitted.value = true
    form.value = { name: '', email: '', company: '', budget: '', message: '' }
    setTimeout(() => { submitted.value = false }, 8000)
  } catch (err) {
    // handle error — show a toast, etc.
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
```

---

## Step 5 — n8n Security (Webhook Authentication)

Prevent unauthorized calls to your n8n webhook.

### Option A — Header Auth (recommended)
In the Webhook node → **Authentication** → `Header Auth`  
Set a secret header, e.g. `X-Webhook-Secret: <your-secret>`

Then in your Nuxt proxy add the header:

```ts
await $fetch(n8nUrl, {
  method: 'POST',
  body,
  headers: {
    'Content-Type': 'application/json',
    'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET,
  },
})
```

Add to env:
```
N8N_WEBHOOK_SECRET=supersecretvalue
```

### Option B — IP Allowlist (Nginx)
In your n8n Nginx config, restrict the webhook path to only your app's pod CIDR:

```nginx
location /webhook/ {
    allow 10.0.0.0/8;   # Kubernetes pod CIDR
    deny all;
    proxy_pass http://n8n:5678;
}
```

---

## Step 6 — Testing

1. Activate the workflow in n8n (toggle **Active**)
2. Submit the form on `/collaborate`
3. Check your Telegram channel for the message
4. Check n8n **Executions** tab to debug any failures

### Sample Telegram Output

```
🤝 New Partnership Inquiry

👤 Name: Dara Chan
📧 Email: dara@example.com
🏢 Company: Acme Corp
💰 Budget: $1,000 – $5,000

📝 Message:
We're launching a new developer tool and would love a sponsored tutorial series targeting Cambodian developers.

---
Received at 11 Jun 2026, 09:42 (server time)
```

---

## Environment Variables Summary

| Variable | Description |
|---|---|
| `N8N_WEBHOOK_URL` | Full URL to your n8n webhook endpoint |
| `N8N_WEBHOOK_SECRET` | Shared secret for header auth (optional but recommended) |

Both must be added to:
- Local `.env` file (gitignored)
- Kubernetes `Secret` → mounted as env vars in `k8s/prod/deployment.yaml`
