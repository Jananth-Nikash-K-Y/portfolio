# Jananth Nikash Portfolio

A modern, interactive portfolio website showcasing projects, skills, and professional journey. Built with React and Tailwind CSS, featuring a dynamic hero section, animated project filters, a 3D skills sphere, and responsive design for all devices.

## Features
- Dynamic hero section with custom cursor and call-to-action
- Horizontally scrollable, filterable project showcase
- 3D interactive skills sphere
- Responsive design for mobile and desktop
- Contact form with validation and email delivery via EmailJS
- Modern UI/UX with gradients and smooth transitions

## Technologies
- React
- TypeScript
- Tailwind CSS
- Three.js (for 3D skills sphere)
- FastAPI (Backend)
- LangChain (AI Integration)
- Ollama (LLM)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jananth-Nikash-K-Y/portfolio.git
   cd portfolio
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   pip install -r requirements.txt
   ```

4. **Start the development servers:**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   # or
   yarn dev

   # Terminal 2 - Backend
   cd server
   uvicorn portfolio_agent_backend:app --reload
   ```

5. **Access the application:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8000](http://localhost:8000)

### Contact Form Email Setup

The contact form sends messages directly to your inbox using [EmailJS](https://www.emailjs.com/). Configure it by following these steps:

1. Create an EmailJS account and add a new **Email Service** (Gmail, Outlook, etc.).
2. Create an **Email Template** that uses the following template variables:
   - `from_name`
   - `from_email`
   - `subject`
   - `message`
   - `to_email` (optional if you hard-code the recipient inside EmailJS)
3. Generate a **Public Key** from the EmailJS dashboard.
4. Create a `.env` file in the project root that contains:
   ```bash
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_EMAILJS_RECIPIENT_EMAIL=your@email.com
   ```
5. Restart the Vite dev server so the new environment variables are loaded.

## Project Structure
- `src/components/` — React components for each section
- `src/data/` — Project and experience data
- `public/assets/` — Images and static assets
- `server/` — Backend API and AI integration

## AI Features
- Interactive 3D AI agent for portfolio navigation
- Natural language processing for portfolio queries
- Text-to-speech capabilities for agent responses
- Context-aware conversation memory

## Contact
For professional inquiries, please use the contact form on the site or connect via [LinkedIn](https://in.linkedin.com/in/jananth-nikash-k-y).

---
© 2025 Jananth Nikash K Y. All rights reserved.