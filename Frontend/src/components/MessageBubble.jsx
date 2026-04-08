import React, { useState } from "react";

function MessageBubble({ role, content, timestamp }) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  // Time formatting keeps messages readable and matches user expectations
  // from modern chat apps, reducing cognitive load.
  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Copying messages supports reuse and avoids retyping, especially for
  // long assistant responses users may want to save or share.
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`message-wrapper ${isUser ? "user" : "assistant"}`}>

      {/* Assistant avatar reinforces identity and builds trust.
         Fallback avoids broken-image UI, keeping the layout stable. */}
      {!isUser && (
        <div className="avatar assistant-avatar">
          <img
            src="/tina.png"
            alt="Tina"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="avatar-fallback" style={{ display: "none" }}>T</div>
        </div>
      )}

      <div className="message-content">
        {!isUser && <span className="sender-name">Tina</span>}

        <div className={`message-bubble ${isUser ? "user-bubble" : "assistant-bubble"}`}>
          <p>{content}</p>

          {/* Copy button uses simple SVG geometry:
             - polyline points = checkmark (x,y pairs)
             - rect/path = overlapping sheets
             - all numbers map to positions in a 24x24 grid. */}
          {!isUser && (
            <button
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              title="Copy message"
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" /> {/* checkmark shape */}
                  </svg>
                  <span>Copied</span>
                </>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  {/* rect uses x,y,width,height to define the top sheet */}
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  {/* path uses M/L commands to outline the back sheet */}
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Timestamp helps users track message order without cluttering the UI. */}
        {timestamp && <span className="timestamp">{formatTime(timestamp)}</span>}
      </div>

      {/* User avatar mirrors Tina’s placement for visual balance.
         SVG uses path + circle to draw head/shoulders in a 24x24 grid. */}
      {isUser && (
        <div className="avatar user-avatar-bubble">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            {/* path draws shoulders using curve + line commands */}
            <circle cx="12" cy="7" r="4" /> {/* head circle at (12,7) radius 4 */}
          </svg>
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
