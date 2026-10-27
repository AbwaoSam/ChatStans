export default function MessageBubble({ message, isSent }) {
  return (
    <div className={`message-bubble ${isSent ? "message-bubble--sent" : "message-bubble--received"}`}>
      <p className="message-bubble__text">{message.text}</p>
      <span className="message-bubble__time">{message.timestamp}</span>
    </div>
  );
}