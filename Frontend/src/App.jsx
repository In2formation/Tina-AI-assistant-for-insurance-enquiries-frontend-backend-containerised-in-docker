import React, { useState, useEffect, useCallback, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import { sendMessage } from "./api";
import "./App.css";

function App() {
  // Centralising state here ensures the app behaves consistently and avoids scattering logic
  const [darkMode, setDarkMode] = useState(false);   // chosen so the theme can be applied globally
  // Keeping theme here avoids each component needing its own theme logic.

  const [messages, setMessages] = useState([]);      // kept at top level so all components share one source of truth
  // This prevents message desync and ensures the UI always reflects the same conversation.

  const [isTyping, setIsTyping] = useState(false);   // prevents overlapping requests and keeps UX predictable
  // This avoids double‑sending and gives the user a clear sense of system activity.

  const [sidebarOpen, setSidebarOpen] = useState(true); // allows responsive design without duplicating layout logic
  // Centralising this avoids each component guessing whether the sidebar is visible.

  const [activeChat, setActiveChat] = useState(null);   // future‑proofing for multiple conversations
  // This makes it easy to add chat history or persistence later without rewriting the app.


  // This guard exists to counter React StrictMode’s double‑mount in dev, avoiding duplicate greetings
  const didFetchIntro = useRef(false);
  // Using a ref avoids re-renders and ensures the intro logic runs exactly once.


  // Hardcoded recent chats give the sidebar some nice styling icons, while signalling where persistence will plug in later
  const recentChats = [
    { id: 1, name: "Car Advice", icon: "🚗" },
    { id: 2, name: "Finance Help", icon: "💰" },
    { id: 3, name: "Vehicle History", icon: "📋" },
  ];
  // These placeholders help users understand the future direction of the app.


  // Syncing dark mode with <body> ensures global CSS themes apply everywhere, not just inside React components
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);
  // This avoids theme flicker and ensures consistent styling across the entire page.


  // Intro fetch is designed to guarantee the user sees a welcome message, but only once, to avoid confusion
  const fetchIntro = useCallback(async (force = false) => {
    if (didFetchIntro.current && !force) return;
    didFetchIntro.current = true;

    setIsTyping(true);
    try {
      const reply = await sendMessage("start", []);
      // Only show a greeting if backend provides something meaningful, so the UI doesn’t mislead
      if (typeof reply === "string" && reply.trim().length) {
        setMessages([{ role: "assistant", content: reply, timestamp: new Date() }]);
      } else {
        setMessages([]); // empty state is clearer than filler text
      }
    } catch (err) {
      console.error("Intro fetch failed:", err);
      setMessages([]); // avoids hard‑coded fallback that could confuse users
    } finally {
      setIsTyping(false);
    }
  }, []);
  // Using useCallback prevents unnecessary re-runs and keeps the intro stable across renders.


  // Triggering intro on mount ensures the app never starts with a blank screen
  useEffect(() => {
    fetchIntro();
  }, [fetchIntro]);
  // This guarantees a predictable first impression every time the app loads.


  // Message handler is built to feel responsive (optimistic updates) while still protecting against duplication
  const handleSendMessage = async (content) => {
    if (!content || isTyping) return; // avoids wasted requests and messy UI

    const userMessage = { role: "user", content, timestamp: new Date() };
    const historyToSend = [...messages, userMessage];

    // Optimistic update makes the app feel instant, even while waiting for backend
    setMessages(historyToSend);
    setIsTyping(true);

    try {
      const response = await sendMessage(content, historyToSend);
      const assistantMessage = { role: "assistant", content: response, timestamp: new Date() };

      // Deduplication logic exists because race conditions or double triggers can otherwise show the same reply twice
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant" && last.content === response) {
          return prev; // prevents clutter and confusion
        }
        return [...prev, assistantMessage];
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Providing a friendly fallback keeps the conversation flowing even if backend fails
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Server error. Please try again.", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  // This structure ensures the chat feels fast, reliable, and forgiving even under errors.


  // Reset logic exists so users can start fresh without stale context bleeding into new conversations
  const handleNewChat = async () => {
    setActiveChat(null);
    setMessages([]);
    didFetchIntro.current = false; // reset guard so intro can run again
    await fetchIntro(true);
  };
  // This keeps the experience clean and avoids confusing leftover messages.


  // Placeholder for loading saved chats — included now so future persistence can be added without restructuring
  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
  };
  // This makes the sidebar functional even before real storage is added.


  // Sidebar toggle is essential for mobile UX, giving users control without cluttering the main view
  const toggleSidebar = () => {
    setSidebarOpen((s) => !s);
  };
  // This avoids forcing desktop-style layouts onto small screens.


  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>

      {/* Mobile toggle exists so navigation remains usable on small screens without overwhelming the layout */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" />  {/* horizontal bar */}
          <line x1="3" y1="6" x2="21" y2="6" />    {/* top bar */}
          <line x1="3" y1="18" x2="21" y2="18" />  {/* bottom bar */}
        </svg>
      </button>

      {/* Sidebar provides continuity and context, making the app feel like a real chat client rather than a single session */}
      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
        <Sidebar
          onNewChat={handleNewChat}
          recentChats={recentChats}
          onSelectChat={handleSelectChat}
          activeChat={activeChat}
        />
      </div>

      {/* Main area is kept clean and focused so the conversation feels central and uncluttered */}
      <main className="main-content">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <ChatWindow messages={messages} isTyping={isTyping} />
        <InputBar onSend={handleSendMessage} disabled={isTyping} />
      </main>

      {/* Overlay exists so mobile users can dismiss the sidebar intuitively, without needing extra buttons */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

export default App;
