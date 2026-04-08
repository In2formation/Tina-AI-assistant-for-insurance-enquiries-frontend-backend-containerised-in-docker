# Tina – AI-Powered Insurance Assistant

A production-ready AI chatbot with frontend and backend that provides intelligent insurance recommendations based on complex business rules. Built entirely from the ground up with modern web technologies, comprehensive testing, and containerized deployment.

## Project Overview

Tina is an AI insurance consultant that conducts natural conversations with users to recommend appropriate insurance products (Mechanical Breakdown Insurance, Comprehensive, or Third Party) based on vehicle details and business eligibility rules. The application features a responsive React frontend, robust Express backend with RESTful API, Google Gemini AI integration, and full Docker containerization.

**Note:** This is a frontend + backend application with stateless conversation management. Database integration is planned for future versions to enable conversation persistence and user authentication.

**Key Achievement:** Designed and implemented a rule-driven AI system that handles complex conversation flows, multi-vehicle scenarios, and graceful decline paths while maintaining a warm, professional tone.

---

## My Role & Contributions

As the sole developer on this project, I was responsible for the complete end-to-end implementation:

### Backend Architecture & API Development
- Designed and built RESTful API with Express.js
- Implemented `/chat` endpoint with conversation history management
- Created robust error handling for malformed JSON and AI service failures
- Configured CORS for secure cross-origin communication
- Built health check endpoint for monitoring and deployment validation

### AI Integration & Prompt Engineering
- Integrated Google Gemini AI API for natural language processing
- Engineered comprehensive system prompts with behavioral and business rules
- Implemented conversation history formatting and context management
- Designed multi-turn conversation flow with state preservation
- Created decline flows with specialist referral information for edge cases
- Optimized prompt structure for consistent, rule-compliant responses

### Business Logic Implementation
- Translated complex insurance eligibility rules into AI-enforceable constraints
- Implemented vehicle type identification (standard cars, trucks, racing cars)
- Built age-based eligibility logic for Comprehensive insurance (< 10 years)
- Created MBI exclusion rules for trucks and racing cars
- Designed multi-vehicle handling with sequential processing
- Developed positive decline messaging with alternative provider referrals

### Frontend Development
- Built responsive React application with modern hooks (useState, useEffect, useCallback)
- Designed component architecture: Sidebar, Header, ChatWindow, InputBar, MessageBubble
- Implemented dark mode toggle with persistent theme state
- Created optimistic UI updates for instant message feedback
- Built typing indicators and message deduplication logic
- Designed mobile-responsive layout with collapsible sidebar
- Implemented conversation reset functionality for new chat sessions

### Testing & Quality Assurance
- Wrote comprehensive Jest test suite for backend routes
- Implemented Supertest for HTTP endpoint testing
- Created mocked AI service layer for isolated unit tests
- Achieved test coverage for validation, error handling, and integration
- Designed tests for future database route expansion

### DevOps & Containerization
- Created multi-container Docker setup with docker-compose
- Built separate Dockerfiles for frontend (Nginx) and backend (Node.js)
- Configured port mapping and service dependencies
- Implemented environment variable management with .env files
- Set up production-ready build configurations
- Enabled one-command deployment with `docker-compose up`

---

## Technologies & Skills Demonstrated

### Frontend Stack
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with dark mode support
- **Nginx** - Production web server in Docker

### Backend Stack
- **Node.js & Express.js** - Server framework
- **Google Gemini AI** - Natural language processing
- **Jest & Supertest** - Testing framework and HTTP testing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration
- **ES6 Modules** - Modern JavaScript syntax

### DevOps & Tools
- **Docker & Docker Compose** - Containerization and orchestration
- **Git** - Version control
- **npm** - Package management
- **nodemon** - Development auto-reload

### Core Skills
- Frontend and backend web development
- RESTful API design
- AI/ML integration and prompt engineering
- Test-driven development (TDD)
- Containerization and deployment
- Responsive UI/UX design
- State management in React
- Error handling and validation
- Business logic implementation

---

## Project Architecture

```
Tina-AI-assistant/
├── Backend/
│   ├── services/
│   │   └── genai.js              # AI integration & prompt engineering
│   ├── tests/
│   │   ├── server.test.js        # API endpoint tests
│   │   └── genai.test.js         # AI service tests
│   ├── api.js                    # Express routes & middleware
│   ├── server.js                 # Application entry point
│   ├── Dockerfile                # Backend container config
│   ├── jest.config.cjs           # Test configuration
│   ├── package.json              # Dependencies & scripts
│   └── .env                      # Environment variables
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx    # Message display
│   │   │   ├── Header.jsx        # App header with theme toggle
│   │   │   ├── InputBar.jsx      # User input field
│   │   │   ├── MessageBubble.jsx # Individual message styling
│   │   │   ├── Sidebar.jsx       # Navigation & chat history
│   │   │   └── TypingIndicator.jsx # Loading animation
│   │   ├── api.js                # Backend API client
│   │   ├── App.jsx               # Main app logic & state
│   │   ├── App.css               # Styling & themes
│   │   └── main.jsx              # React entry point
│   ├── public/
│   │   ├── tina.png              # AI avatar
│   │   └── user-avatar.png       # User avatar
│   ├── Dockerfile                # Frontend Nginx container
│   ├── index.html                # HTML template
│   └── package.json              # Dependencies & scripts
├── docker-compose.yml            # Multi-container orchestration
├── .env.example                  # Environment template
├── .dockerignore                 # Docker build exclusions
└── README.md                     # Documentation




## How It Works

### Conversation Flow
1. **Opt-In Request** - Tina introduces herself and asks permission to collect information
2. **Vehicle Type Identification** - User describes their vehicle naturally (no forced options)
3. **Detail Collection** - For standard cars: make, model, year, usage, coverage preferences
4. **Business Rule Application** - AI evaluates eligibility based on vehicle type and age
5. **Recommendation** - Tina suggests appropriate insurance products with clear reasoning
6. **Multi-Vehicle Support** - Process repeats for additional vehicles
7. **Graceful Declines** - Trucks and racing cars receive positive decline messages with specialist referrals

### Technical Flow
1. User sends message via React frontend
2. Frontend makes POST request to `/chat` endpoint with message and conversation history
3. Backend validates input and formats conversation history
4. Gemini AI receives system instructions (business rules) + conversation context
5. AI generates contextually appropriate response following all rules
6. Backend returns response to frontend
7. Frontend displays message with typing animation and optimistic updates

---

## Business Rules Implementation

### Insurance Eligibility Rules

**Mechanical Breakdown Insurance (MBI)**
- ✅ Available for standard cars
- ❌ Declined for trucks (specialist insurers required)
- ❌ Declined for racing cars (motorsport specialists required)

**Comprehensive Car Insurance**
- ✅ Available for vehicles less than 10 years old
- ❌ Declined for vehicles 10+ years old
- ✅ Always available for standard cars meeting age requirement

**Third Party Car Insurance**
- ✅ Available for all motor vehicles
- ✅ No restrictions on vehicle type or age

### Conversational Rules
- **Opt-in required** - Must ask permission before collecting personal information
- **One question at a time** - Never overwhelm users with multiple questions
- **Natural language** - No forced multiple-choice options
- **Warm and professional tone** - Friendly but not overly casual
- **Varied responses** - No robotic repetition of phrases
- **Clear reasoning** - Always explain why a recommendation is made
- **Positive declines** - Provide alternative specialist contacts for ineligible vehicles
- **Sequential processing** - Handle one vehicle completely before moving to the next

### Specialist Referrals (New Zealand)

**Racing Cars:**
- Classic Cover Insurance - classiccover.co.nz, +64 9 478 0111
- Star Insurance Specialists Motorsport - starinsure.co.nz, +64 9 362 4039

**Trucks / Heavy Vehicles:**
- NZI Commercial Motor - nzi.co.nz, 0800 331 332
- Crombie Lockwood - crombielockwood.co.nz, 0800 276 624



## Key Features

### AI-Driven Conversation
- Natural language understanding with Google Gemini
- Context-aware responses based on conversation history
- Dynamic question generation (no hardcoded scripts)
- Multi-turn dialogue with state preservation

### Robust Error Handling
- **400 Bad Request** - Malformed JSON or missing required fields
- **500 Internal Server Error** - AI service failures with user-friendly messages
- Graceful degradation when AI quota limits are reached
- Console logging for debugging without exposing errors to users

### User Experience
- Optimistic UI updates for instant feedback
- Typing indicators during AI processing
- Message deduplication to prevent duplicate responses
- Dark mode toggle with persistent theme
- Mobile-responsive design with collapsible sidebar
- Conversation reset for new chat sessions

### Testing & Quality
- Comprehensive Jest test suite
- Mocked AI service for isolated testing
- HTTP endpoint testing with Supertest
- Validation and error handling coverage
- Future-ready database test scaffolding

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

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Docker Desktop (for containerized deployment)
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Option 1: Local Development

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Tina-AI-assistant-for-insurance-enquiries-frontend-backend-containerised-in-docker
```

#### 2. Backend Setup
```bash
cd Backend
npm install

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start development server (auto-reload)
npm run dev

# Or start production server
npm start
```

Backend runs on: `http://localhost:3000`

#### 3. Frontend Setup
```bash
cd Frontend
npm install

# Start Vite dev server
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Option 2: Docker Deployment (Recommended)

#### 1. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your Gemini API key
```

#### 2. Build and Run
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

**Access the application:**
- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:3005`

#### 3. Stop Services
```bash
docker-compose down
```


---

## Testing

### Run Backend Tests
```bash
cd Backend
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test:server
npm run test:genai
```

### Test Coverage
- ✅ Health check endpoint
- ✅ Chat endpoint validation
- ✅ AI integration
- ✅ Error handling
- ✅ Malformed request handling

---

## API Documentation

### Endpoints

#### GET /
Health check endpoint

**Response:**
```
Backend is running! Use POST /chat to talk to Tina.
```

#### POST /chat
Send a message to Tina and receive AI-generated response

**Request Body:**
```json
{
  "message": "I want to insure my 2020 Honda Civic",
  "history": [
    { "role": "assistant", "content": "Hi there! I'm Tina..." },
    { "role": "user", "content": "Yes, please" }
  ]
}
```

**Success Response (200):**
```json
{
  "reply": "Great! Could you tell me what you primarily use your Honda Civic for?"
}
```

**Error Responses:**
- `400` - Missing message field
- `500` - AI service failure

---

## Dependencies

### Backend Dependencies

**Production:**
- `@google/genai (^1.44.0)` - Google Gemini AI SDK
- `express (^5.2.1)` - Web framework
- `cors (^2.8.6)` - Cross-origin resource sharing
- `dotenv (^17.3.1)` - Environment variable management

**Development & Testing:**
- `jest (^29.7.0)` - Testing framework
- `supertest (^7.2.2)` - HTTP endpoint testing
- `nodemon (^3.1.14)` - Auto-restart on file changes

### Frontend Dependencies

**Production:**
- `react (^19.2.4)` - UI library
- `react-dom (^19.2.4)` - React DOM renderer
- `axios (^1.13.6)` - HTTP client

**Development:**
- `vite (^7.3.1)` - Build tool and dev server
- `@vitejs/plugin-react (^5.1.4)` - React plugin for Vite

### Available Scripts

**Backend:**
```bash
npm start          # Production server
npm run dev        # Development with auto-reload
npm test           # Run all tests
npm run test:watch # Watch mode
```

**Frontend:**
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

---

## Technical Highlights

### Prompt Engineering
The AI system uses a sophisticated prompt structure in `Backend/services/genai.js`:
- **System instructions** - Behavioral rules, tone guidelines, conversation flow
- **Business rules** - Insurance eligibility logic, vehicle type handling
- **Context management** - Last 5 messages sent to AI for cost optimization
- **Response formatting** - Structured output for consistent UI rendering

### State Management
React application uses modern hooks for efficient state handling:
- `useState` - Messages, typing state, theme, sidebar visibility
- `useEffect` - Theme persistence, intro message fetching
- `useCallback` - Memoized functions to prevent unnecessary re-renders
- `useRef` - Prevent double-mounting in React StrictMode

### Docker Architecture
- **Multi-stage builds** - Optimized image sizes
- **Service orchestration** - Frontend depends on backend
- **Port mapping** - Host ports 3001 (frontend) and 3005 (backend)
- **Environment isolation** - Separate .env files for local and container

---

## Challenges & Solutions

### Challenge 1: AI Consistency
**Problem:** Gemini AI sometimes deviated from business rules or repeated questions
**Solution:** Engineered comprehensive system instructions with explicit behavioral rules, tone guidelines, and conversation flow constraints. Implemented conversation history context to maintain continuity.

### Challenge 2: Message Deduplication
**Problem:** React StrictMode and race conditions caused duplicate messages
**Solution:** Implemented useRef guard for intro message and deduplication logic in message state updates.

### Challenge 3: Mobile Responsiveness
**Problem:** Sidebar cluttered small screens
**Solution:** Created collapsible sidebar with overlay, mobile menu button, and responsive CSS breakpoints.

### Challenge 4: Error Handling
**Problem:** AI service failures crashed the application
**Solution:** Implemented try-catch blocks, graceful error messages, and fallback responses to maintain conversation flow.

---

## Future Enhancements

- **Database Integration** - MySQL/PostgreSQL storage for conversation history (would complete the full-stack architecture)
- **User Authentication** - Login system with session persistence
- **Multi-User Support** - User-specific chat sessions
- **Quote Generation** - Calculate and display insurance quotes
- **Policy Comparison** - Side-by-side product comparison tables
- **Analytics Dashboard** - Track conversation metrics and user behavior
- **Cloud Deployment** - Deploy to Azure/AWS with CI/CD pipeline
- **Email Integration** - Send recommendations and quotes via email

---

## Environment Variables

Create a `.env` file in the Backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=development
```

---

## License

This project was developed as part of the Mission Ready Full Stack Diploma program.

---

## Contact

Developed by Adrian  
Portfolio project demonstrating full-stack development, AI integration, and DevOps skills.  