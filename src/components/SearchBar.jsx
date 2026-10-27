export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}