export default function EmptyState({ icon = "💬", title, message, children }) {
  return (
    <div className="state-view">
      <div className="state-view__icon">{icon}</div>
      {title && <h2 className="state-view__title">{title}</h2>}
      {message && <p className="state-view__text">{message}</p>}
      {children}
    </div>
  );
}