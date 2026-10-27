export default function ConversationItem({ conversation, isActive, onSelect }) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <li
      className={`conversation-item ${isActive ? "conversation-item--active" : ""}`}
      onClick={() => onSelect(conversation.id)}
    >
      <img
        src={conversation.avatar}
        alt={conversation.name}
        className="conversation-item__avatar"
      />
      <div className="conversation-item__info">
        <div className="conversation-item__top">
          <span className="conversation-item__name">{conversation.name}</span>
          <span className="conversation-item__time">{lastMessage?.timestamp}</span>
        </div>
        <p className="conversation-item__preview">
          {lastMessage?.text || "No messages yet"}
        </p>
      </div>
    </li>
  );
}