import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversation, currentUserId, onSendMessage, onBack }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <main className="chat-window chat-window--empty">
        <div className="chat-window__placeholder">
          <h2>Welcome to ChatStans</h2>
          <p>Select a conversation to start messaging</p>
        </div>
      </main>
    );
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
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className="chat-window__avatar"
        />
        <h2 className="chat-window__name">{conversation.name}</h2>
      </div>

      <div className="chat-window__messages">
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

      <MessageInput onSend={onSendMessage} />
    </main>
  );
}