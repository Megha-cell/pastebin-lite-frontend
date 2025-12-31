# Pastebin-Lite

A small Pastebin-like application that allows users to create text pastes and share a URL to view them.  
Supports optional time-based expiry (TTL) and view-count limits.

Deployed on Vercel and designed to pass automated tests.

---

## 🚀 Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Persistence: Redis (Upstash)
- Deployment: Vercel

---

## ✨ Features

- Create a paste with arbitrary text
- Generate a shareable URL
- View pastes via API or HTML page
- Optional constraints:
  - Time-based expiry (TTL)
  - View-count limit
- Deterministic time support for testing (`TEST_MODE`)

---

## 🛠️ Running Locally

### Prerequisites
- Node.js (v18+ recommended)
- Redis (local or Upstash)

### Setup

```bash
git clone <repo-url>
cd pastebin-lite
npm install

Start the app
npm start

🔌 API Routes
Health Check
GET /api/healthz

Create Paste
POST /api/pastes

{
  "content": "Hello world",
  "ttl_seconds": 60,
  "max_views": 5
}

Fetch Paste (API)
GET /api/pastes/:id

View Paste (HTML)
GET /p/:id
 Persistence Layer

Redis (Upstash) is used to store paste content, expiry timestamps, and remaining view counts.
This ensures data persists across requests in a serverless environment.
