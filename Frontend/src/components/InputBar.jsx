import React, { useState, useRef, useEffect } from "react";

function InputBar({ onSend, disabled }) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  // Keep focus in the input when it's usable again so the chat feels responsive.
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      // Focus is handled by the effect above to avoid losing it on re-renders.
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <div className="input-container">

        {/* Attachment icon — SVG path uses coordinates + commands (M,L,A)
           to draw the paperclip shape. Numbers are positions in a 24x24 grid. */}
        <button type="button" className="input-action-btn attachment-btn" title="Attach file">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19
                     a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>

        {/* Main text input — kept focused and keyboard-friendly for fast chatting. */}
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="message-input"
          autoFocus
        />

        {/* Microphone icon — path commands draw the mic body + stand.
           x1/y1 → x2/y2 define straight lines; path d uses M/L to shape curves. */}
        <button type="button" className="input-action-btn mic-btn" title="Voice input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />   {/* vertical stand */}
            <line x1="8" y1="23" x2="16" y2="23" />     {/* base line */}
          </svg>
        </button>

        {/* Notification icon — arcs + curves form the bell shape.
           Numbers map to points in the 24x24 coordinate system. */}
        <button type="button" className="input-action-btn notification-btn" title="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>

      {/* Send icon — simple path lines forming a paper plane.
         M/L commands define straight segments; numbers are grid coordinates. */}
      <button
        type="submit"
        className="send-btn"
        disabled={!message.trim() || disabled}
        title="Send message"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </form>
  );
}

export default InputBar;

