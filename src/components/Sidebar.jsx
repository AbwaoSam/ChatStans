import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";

export default function Sidebar({
  conversations,
  selectedId,
  onSelect,
  searchTerm,
  onSearchChange,
}) {
  return (
    <aside className="sidebar">
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    </aside>
  );
}