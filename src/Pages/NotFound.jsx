import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found • ChatStans";
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card notfound-card">
        <div className="auth-brand">
          <div className="auth-brand__logo">🔎</div>
          <h1 className="auth-brand__title">404 — Page not found</h1>
          <p className="auth-brand__subtitle">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <div className="notfound-actions">
          <Link to="/chat" className="btn btn--primary btn--block">
            Go to chats
          </Link>
          <Link to="/login" className="btn btn--ghost btn--block">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}