# Jananth Nikash Portfolio

A modern, interactive portfolio website showcasing projects, skills, and professional journey. Built with React and Tailwind CSS, featuring a dynamic hero section, animated project filters, a 3D skills sphere, and responsive design for all devices.

## Features
- Dynamic hero section with custom cursor and call-to-action
- Horizontally scrollable, filterable project showcase
- 3D interactive skills sphere
- Responsive design for mobile and desktop
- Contact form with validation
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