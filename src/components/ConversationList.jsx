import ConversationItem from "./ConversationItem";

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
}) {
  if (conversations.length === 0) {
    return (
      <div className="conversation-list__empty">
        <p>No conversations found</p>
      </div>
    );
  }

  return (
    <ul className="conversation-list">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}