import express from "express";
import cors from "cors";
import { generateTinaResponse } from "./services/genai.js";

const app = express();

// JSON parsing middleware is included so every route can rely on structured request bodies;
// this avoids repetitive parsing logic and ensures consistency across endpoints.
app.use(express.json());

// This error handler is placed immediately after JSON parsing so malformed requests
// are caught early and return a clear response instead of crashing the server.
app.use((err, req, res, next) => {
  console.log("JSON PARSE ERROR:", err.message);
  res.status(400).json({ error: "Invalid JSON" });
});

// CORS is enabled so the backend can be safely accessed from browsers hosted on other domains;
// without it, the frontend would be blocked from making requests.
app.use(cors());

// Health check route exists to provide a quick, lightweight way to confirm the service is alive;
// this is useful for monitoring tools.
app.get("/", (req, res) => {
  res.send("Backend is running! Use POST /chat to talk to Tina.");
});

// Chat endpoint is the core of the app: it validates input, passes conversation history
// to the AI service, and returns a reply. Input validation is included so the server
// fails fast on bad requests, and try/catch ensures resilience against AI errors.
app.post("/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message" });
  }


  try {
    const conversationHistory = history || [];
    const reply = await generateTinaResponse(conversationHistory);
    res.json({ reply });
  } catch (err) {
    // This block exists so unexpected failures in the AI service don’t crash the server.
    // Instead, errors are logged for developers and a clear 500 response is sent to the client,
    // keeping the API predictable and user‑friendly even under failure.
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});



export default app;





