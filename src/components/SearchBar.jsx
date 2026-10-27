export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search conversations"
      />
    </div>
  );
}