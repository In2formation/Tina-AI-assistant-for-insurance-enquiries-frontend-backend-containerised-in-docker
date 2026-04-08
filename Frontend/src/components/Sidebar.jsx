import React from "react";

function Sidebar({ onNewChat, recentChats, onSelectChat, activeChat }) {
  return (
    <aside className="sidebar" style={{ backgroundColor: '#1e3a5f', color: '#e2e8f0' }}>

      {/* Logo area sets identity and gives users an immediate sense of brand.
         Keeping it at the top mirrors common app layouts and builds trust. */}
      <div className="sidebar-header">
        <div className="logo-container">

          {/* Car icon uses path + circle commands:
             - path draws the car body using M/L curves
             - circles at (7,17) and (17,17) form wheels in a 24x24 grid. */}
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9
                       C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3
                       c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9
                       l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>

          {/* Text reinforces the product identity and clarifies the assistant’s role. */}
          <div className="logo-text">
            <span className="logo-title">AutoAssist</span>
            <span className="logo-subtitle">Car Insurance Consultant</span>
          </div>
        </div>
      </div>

      {/* New Chat button gives users a clear starting point.
         The plus icon uses two lines (x1,y1 → x2,y2) in the 24x24 grid. */}
      <button className="new-chat-btn" onClick={onNewChat}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />  {/* vertical stroke */}
          <line x1="5" y1="12" x2="19" y2="12" />  {/* horizontal stroke */}
        </svg>
        New Chat
      </button>

      {/* Saved responses give users quick access to reusable answers.
         Bookmark icon uses a single path shaped with M/L commands. */}
      <button className="saved-responses-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        Saved Responses
      </button>

      {/* Recent chats help users resume conversations quickly.
         Keeping this list visible reduces friction and improves workflow. */}
      <div className="recent-chats">
        <h3 className="section-title">Recent Chats</h3>

        <ul className="chat-list">
          {recentChats.map((chat) => (
            <li
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
              onClick={() => onSelectChat(chat.id)}
            >
              {/* Icons are user-defined; showing them improves scanability. */}
              <span className="chat-icon">{chat.icon}</span>

              {/* Chat name gives quick context so users can find the right thread. */}
              <span className="chat-name">{chat.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Settings button provides a predictable place for configuration.
         Gear icon uses circle + path lines arranged around the 24x24 grid. */}
      <div className="sidebar-footer">
        <button className="settings-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />  {/* gear center */}
            <path d="M12 1v2M12 21v2
                     M4.22 4.22l1.42 1.42
                     M18.36 18.36l1.42 1.42
                     M1 12h2M21 12h2
                     M4.22 19.78l1.42-1.42
                     M18.36 5.64l1.42-1.42" />
            {/* path draws gear spokes using straight line commands */}
          </svg>
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
