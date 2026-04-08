import axios from "axios";

// The backend server address is kept in one place.
// This makes it easy to switch between local development,
// staging, or production without changing multiple files.
const BASE_URL = "http://localhost:3000";

async function sendMessage(message, history = []) {
  // POST is used so the chat data is sent in the request body.
  // This avoids URL length limits and keeps the data structured.
  const res = await axios.post(`${BASE_URL}/chat`, {
    message,
    history
  });

  // Only the assistant's reply is returned.
  // This keeps the rest of the app simple and focused on what it needs.
  return res.data.reply;
}

// Exporting the function makes it easy to add more API calls later
// without changing how other parts of the app import them.
export { sendMessage };

