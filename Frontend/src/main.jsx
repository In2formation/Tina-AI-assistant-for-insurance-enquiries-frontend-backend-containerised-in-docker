import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// StrictMode is used here to catch mistakes early and highlight unsafe patterns.
// It doesn’t affect production, but it helps keep the app stable as it grows.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Rendering App at the root keeps the entire UI under one predictable tree,
        making global state, theming, and layout far easier to manage. */}
    <App />
  </React.StrictMode>
);

