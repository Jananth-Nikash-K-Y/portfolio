# Jananth Nikash K Y — Portfolio

> Personal portfolio and AI-powered chat agent for Jananth Nikash K Y, Technical Consultant – AI Integration at IBM India.

**Live site:** [jananthnikash.com](https://jananthnikash.com)

---

## Overview

A two-repo system: a React/Vite frontend deployed on Netlify, and a Python/FastAPI agent backend deployed on Render. Visitors can explore projects, experience and skills, or chat with an AI agent powered by Groq's Llama 3.3-70B that answers questions about the portfolio.

---

## Repos

| Repo | Purpose | Stack | Hosting |
|---|---|---|---|
| `portfolio` | Frontend site | React · Vite · TypeScript · Tailwind CSS · Three.js | Netlify |
| `portfolioagent` | AI chat backend | Python · FastAPI · LangChain · Groq (Llama 3.3-70B) | Render |

---

## Frontend — `portfolio`

### Tech stack
- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Three.js** + CSS2DRenderer — 3D skills sphere
- **EmailJS** — contact form (no backend required)
- **@react-three/fiber** + **@react-three/drei** — 3D robot agent model
- **Netlify Functions** — scheduled health-check cron job

### Design system — Neural Atelier
| Token | Value | Use |
|---|---|---|
| Void | `#0D0D12` | Dark background |
| Parchment | `#F5F0E8` | Light background |
| Iris | `#7B5EA7` | Primary accent |
| Antique Gold | `#C9A96E` | Borders, rules, highlights |
| Midnight | `#1A1A2E` | Dark card surface |
| Linen | `#E8E2D9` | Light card surface |

**Fonts:** Cormorant Garant (display) · DM Sans (body) · JetBrains Mono (labels/mono)

### Structure
```
src/
├── components/
│   ├── shared/          # SectionTitle, ProjectCard, TimelineItem
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx       # 3D sphere (Three.js CSS2DRenderer)
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── AIAgent.tsx      # 3D robot + chat interface
│   └── AIAgentFloating.tsx
├── context/
│   └── ThemeContext.tsx  # Dark/light with localStorage persistence
├── api/
│   ├── config.ts        # Axios + warm-up for Render agent
│   └── contact.ts       # EmailJS contact form
└── data/
    ├── projects.ts
    └── experience.ts
netlify/
└── functions/
    └── health-check.mjs  # Cron: every 6h — checks site + agent, emails on issues
```

### Local development
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

### Environment variables (Netlify)
| Variable | Purpose |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_EMAILJS_RECIPIENT_EMAIL` | Email to receive contact form messages |

---

## Backend — `portfolioagent`

### Tech stack
- **Python 3.9** + **FastAPI** + **Uvicorn**
- **LangChain** + **langchain-groq** — LLM orchestration
- **Groq API** (Llama 3.3-70B) — inference
- **gTTS** — text-to-speech for voice responses

### Endpoints
| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | Health check — returns `{ status: "ok" }` when agent is ready |
| `POST` | `/api/chat` | Chat with the portfolio agent |
| `POST` | `/api/voice` | Generate TTS audio from text |

### Environment variables (Render)
| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq API key for Llama 3.3-70B inference |

### Local development
```bash
pip install -r requirements.txt
GROQ_API_KEY=your_key uvicorn portfolio_agent_backend:app --reload
```

---

## Monitoring

A Netlify scheduled function (`health-check.mjs`) runs every 6 hours and checks:
- `jananthnikash.com` — HTTP status + response time
- Agent `/` health endpoint — service availability
- Agent `/api/chat` — end-to-end chat functionality

**Major issues** (site down, chat broken) → email alert to `jananthnikash.ky@outlook.in`  
**Minor issues** (slow response, cold start) → logged silently in Netlify function logs

A Google Calendar reminder repeats every 50 days as a manual backup check.

---

## Deployment

### Frontend (Netlify)
- Auto-deploys on every push to `main`
- Site ID: `69ee6a8b-c4bd-4461-b6fe-2b5145bb560e`
- Custom domain: `jananthnikash.com`

### Backend (Render)
- Auto-deploys on push to `portfolioagent` main
- Free tier — cold starts of up to 60s are expected; the frontend warms the service on page load
- `GROQ_API_KEY` must be set as an environment variable in the Render dashboard (never commit it)

---

## Features

- **Adaptive dark / light theme** — respects system preference, persists via localStorage
- **3D skills sphere** — 37 skills rendered as icons in Three.js
- **AI portfolio agent** — chat interface backed by Llama 3.3-70B via Groq
- **Voice responses** — agent replies include TTS audio
- **Contact form** — EmailJS, no backend required
- **Automated health monitoring** — Netlify cron + email alerts

---

*Managed and maintained with Claude — Anthropic's AI assistant.*
