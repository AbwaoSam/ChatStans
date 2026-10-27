import { Link } from "react-router-dom";

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  actionLabel,
  onAction,
  showHome,
}) {
  return (
    <div className="state-view">
      <div className="state-view__icon">⚠️</div>
      <h2 className="state-view__title">{title}</h2>
      <p className="state-view__text">{message}</p>
      <div className="state-view__actions">
        {onAction && actionLabel && (
          <button className="btn btn--primary" onClick={onAction}>
            {actionLabel}
          </button>
        )}
        {showHome && (
          <Link to="/chat" className="btn btn--ghost">
            Go to chats
          </Link>
        )}
      </div>
    </div>
  );
}