import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  conversation,
  currentUserId,
  onSendMessage,
  onBack,
}) {
  const messagesEndRef = useRef(null);
  const messagesRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  function handleScroll() {
    const el = messagesRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distanceFromBottom > 200);
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="chat-window">
      <div className="chat-window__header">
        <button
          className="chat-window__back-btn"
          onClick={onBack}
          aria-label="Back to conversations"
        >
          ←
        </button>
        <div className="chat-window__avatar-wrap">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="chat-window__avatar"
          />
          {conversation.online && <span className="chat-window__online-dot" />}
        </div>
        <div className="chat-window__header-info">
          <h2 className="chat-window__name">{conversation.name}</h2>
          <span className="chat-window__status">
            {conversation.online
              ? "Online"
              : conversation.lastSeen
              ? `Last seen ${conversation.lastSeen}`
              : ""}
          </span>
        </div>
      </div>

      <div
        className="chat-window__messages"
        ref={messagesRef}
        onScroll={handleScroll}
      >
        {conversation.messages.length === 0 ? (
          <p className="chat-window__empty">No messages yet. Say hello!</p>
        ) : (
          conversation.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isSent={message.senderId === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {showScrollBtn && (
        <button
          className="chat-window__scroll-btn"
          onClick={scrollToBottom}
          aria-label="Scroll to latest messages"
        >
          ↓
        </button>
      )}

      <MessageInput onSend={onSendMessage} />
    </main>
  );
}