import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ messages, isTyping }) {
  const messagesEndRef = useRef(null);

  // We keep a reference to the bottom of the message list so the UI
  // can automatically scroll down whenever new messages appear.
  // This prevents the user from having to manually scroll during a conversation.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Auto‑scrolling on every new message or typing event ensures the chat
    // always feels "live" and responsive — a core expectation in chat UX.
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="chat-window">
      <div className="messages-container">

        {messages.length === 0 ? (
          // When the conversation hasn't started, show a friendly empty state.
          // This avoids a blank screen and guides the user on what Tina can help with.
          <div className="empty-chat">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>Start a conversation</h3>
            <p>Ask Tina about car insurance policies, coverage options, or get a quote.</p>
          </div>
        ) : (
          <>
            {/* Render each message as a bubble.
                Using index as key is acceptable here because messages never reorder. */}
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
          </>
        )}

        {/* Show Tina's typing indicator below the messages.
            This gives the user feedback that a response is coming. */}
        {isTyping && <TypingIndicator />}

        {/* Invisible element used as the scroll target for auto‑scrolling. */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
