# Mission 4: Tina – AI‑Powered Insurance Assistant

## User Story
As a driver looking for the right insurance product, I want to chat with Tina, an AI insurance consultant who follows clear business rules, asks the right questions, and recommends the most suitable policy for my vehicle.

---

## Project Overview

Mission 4 is a full‑stack AI insurance assistant built using React (Vite) on the frontend and Node.js/Express on the backend.
The system integrates with Google Gemini and is fully containerized using Docker.
Tina guides the user through an insurance conversation, following strict behavioral and business rules. She determines eligibility, gathers vehicle details, and recommends the correct insurance product (MBI, Comprehensive, or Third Party).
The system supports multiple vehicles, decline flows, and rule‑driven logic.

---

## Tech Stack

### Frontend
- React 19
- Vite
- Axios
- Nginx (for production Docker builds)

### Backend
- Node.js 
- Express
- @google/genai (Gemini API)
- Jest
- Supertest
- dotenv
- cors
- nodemon (development)


---

### Project Structure

```
mission-4-t2-adrian/
│
├── backend/
│   ├── services/
│   │   └── genai.js         # Gemini API integration & Prompt Logic
│   ├── tests/               # Jest test suites
│   ├── api.js               # Express route definitions
│   ├── server.js            # App entry point
│   ├── .env                 # Local environment variables
│   ├── Dockerfile           # Backend container config
│   └── jest.config.cjs      # Testing configuration
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # ChatWindow, Header, InputBar, MessageBubble, etc.
│   │   ├── api.js           # Frontend API client
│   │   ├── App.jsx          # Main application logic
│   │   └── main.jsx         # React entry point
│   ├── index.html
│   └── Dockerfile           # Frontend Nginx container config
├── .env.example             # Template for API keys
├── docker-compose.yml       # Orchestrates both services
├── README.md                # Project documentation
└── READMEM4.md              # Mission-specific documentation/requirements

---

```

### Project Structure
- Docker
- Docker Compose




## How It Works

1. 	Tina introduces herself and asks for permission to begin.
2. 	The user provides vehicle details (make, model, year, usage, etc.).
3. 	Tina applies business rules:
• 	Trucks - MBI declined
• 	Racing cars - MBI declined
• 	Vehicles older than 10 years → Comprehensive declined
4. 	Tina determines whether the user needs:
• 	Mechanical Breakdown Insurance (MBI)
• 	Comprehensive Car Insurance
• 	Third Party Car Insurance
5. 	Tina explains the recommendation with clear reasoning.
6. 	The conversation continues until the user is satisfied or adds more vehicles.

7. 	(Optional) Data is stored in MySQL for future retrieval.The backend manages AI interaction and database persistence. The frontend manages UI state and sends conversation updates to the backend.

---

## Business Rules Summary

Mechanical Breakdown Insurance (MBI)
- Declined for: Trucks
- Racing cars

Comprehensive Insurance
- Only offered if vehicle age < 10 years
- Third Party Insurance
- Always available
Behavioral Rules
- Tina must ask permission before collecting personal details
- Tone must remain warm, friendly, and professional
- No hardcoded questions — Gemini dynamically reasons about missing details
- Must explain why a recommendation is made



### Error Handling
- `400` - Malformed JSON
- `400` → Missing `message` in POST /chat
- `500` - AI service failure (Gemini error)

---

## Environment Variables

Create a `.env` file inside `/backend`:

```
Name=Gemini API Key
GEMINI_API_KEY=your_api_key_here

```

The server runs on:
```
http://localhost:3000
```

---

## Installation & Setup

### 1. Clone the Repository

```
git clone <your-repo-url>
cd https://github.com/MR-2026-FT-Feb-L5ADV/mission-4-In2formation.git
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Ensure your `.env` file is configured with:
- Gemini API key

To start normally:
```
npm start
```

To start in development mode (auto-restart on file changes):
```
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

Vite will provide a local development URL (usually):
```
http://localhost:5173
```
## Docker Setup
Start full stack
docker-compose up --build

Frontend → http://localhost:3001
Backend → http://localhost:3005


---

### 4.  Dependencies

### Backend (Node.js/Express)
The server-side logic handles AI orchestration, business rules, and API routing.

*   **Production:**
    *   `@google/genai (^1.44.0)`: Official SDK for Google Gemini AI integration.
    *   `express (^5.2.1)`: Minimalist web framework for the API.
    *   `cors (^2.8.6)`: Enables Cross-Origin Resource Sharing for the React frontend.
    *   `dotenv (^17.3.1)`: Manages environment variables and API keys.
    *   `axios (^1.13.6)`: Promise-based HTTP client for external requests.
    *   `mysql2 (^3.19.0)`: Client for Azure MySQL database integration.
*   **Development & Testing:**
    *   `jest (^29.7.0)`: Testing framework for unit and integration tests.
    *   `supertest (^7.2.2)`: Library for testing HTTP endpoints.
    *   `nodemon (^3.1.14)`: Tool that automatically restarts the node application on file changes.

### Frontend (React/Vite)
A modern, responsive chat interface served via Nginx in production.

*   **Production:**
    *   `react (^19.2.4)`: Core UI library.
    *   `react-dom (^19.2.4)`: Entry point to the DOM for React.
    *   `axios (^1.13.6)`: Handles communication with the Backend API.
*   **Development:**
    *   `vite (^7.3.1)`: Next-generation frontend tooling and dev server.
    *   `@vitejs/plugin-react (^5.1.4)`: Official Vite plugin for React support.

## Development Scripts

### Backend
```
npm start      → Runs server with node
npm run dev    → Runs server with nodemon (auto-restart on changes)
```

### Frontend
```
npm run dev     → Starts Vite dev server
npm run build   → Builds production files
npm run preview → Previews production build
```

---

## AI Logic Summary

The core logic lives in:
```
backend/services/genai.js
```

The function:
- Conversation flow
- Rule‑driven insurance logic
- Decline flows
- Multi‑vehicle sessions
- Tone and persona enforcement
- Formatting responses for the UI

---

## Future Improvements

- Add user authentication
- Store conversation history in a database
- Add policy comparison tables
- Add quote generation
- Add analytics dashboard
- Deploy to Azure / AWS / GCP

---

## Authors

Mission 4 Team  
Adrian  