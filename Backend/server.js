// server.js
import app from "./app.js";

// Using an environment variable makes deployment flexible across dev, staging, and production.
// The fallback ensures local development works even if no variable is set.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Logging here helps to immediately know which port to connect to,
  // avoiding confusion when multiple services are running.
  console.log(`Tina backend running on port ${PORT}`);
});


