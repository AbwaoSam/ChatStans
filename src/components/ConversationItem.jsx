export default function ConversationItem({ conversation, isActive, onSelect }) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <li
      className={`conversation-item ${isActive ? "conversation-item--active" : ""}`}
      onClick={() => onSelect(conversation.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(conversation.id);
        }
      }}
    >
      <div className="conversation-item__avatar-wrap">
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className="conversation-item__avatar"
        />
        {conversation.online && <span className="conversation-item__online-dot" />}
      </div>
      <div className="conversation-item__info">
        <div className="conversation-item__top">
          <span className="conversation-item__name">{conversation.name}</span>
          <span className="conversation-item__time">
            {lastMessage?.timestamp || ""}
          </span>
        </div>
        <div className="conversation-item__bottom">
          <p className="conversation-item__preview">
            {lastMessage?.text || "No messages yet"}
          </p>
          {conversation.unread > 0 && (
            <span className="conversation-item__badge">{conversation.unread}</span>
          )}
        </div>
      </div>
    </li>
  );
}