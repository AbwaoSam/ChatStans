function StatusIcon({ status }) {
  if (status === "sent") return <span className="msg-status">✓</span>;
  if (status === "delivered") return <span className="msg-status">✓✓</span>;
  if (status === "read")
    return <span className="msg-status msg-status--read">✓✓</span>;
  return null;
}

export default function MessageBubble({ message, isSent }) {
  return (
    <div
      className={`message-bubble ${
        isSent ? "message-bubble--sent" : "message-bubble--received"
      }`}
    >
      <p className="message-bubble__text">{message.text}</p>
      <span className="message-bubble__time">
        {message.timestamp}
        {isSent && <StatusIcon status={message.status} />}
      </span>
    </div>
  );
}