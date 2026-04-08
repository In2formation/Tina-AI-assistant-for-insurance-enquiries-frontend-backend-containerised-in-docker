import React from "react";

function TypingIndicator() {
  return (
    <div className="typing-wrapper">

      {/* Avatar reinforces Tina’s presence during typing.
         Fallback avoids broken-image gaps and keeps layout stable. */}
      <div className="avatar assistant-avatar">
        <img 
          src="/tina.png"
          alt="Tina"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="avatar-fallback" style={{ display: 'none' }}>T</div>
      </div>

      <div className="typing-content">
        {/* Name label helps users quickly identify who is typing. */}
        <span className="sender-name">Tina</span>

        <div className="typing-indicator">
          {/* Three dots mimic real chat apps.
             Their animation signals activity and reduces user impatience. */}
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Text reinforces the animation for accessibility and clarity. */}
          <span className="typing-text">is typing...</span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
