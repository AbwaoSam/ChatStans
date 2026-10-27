import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route-away
  useEffect(() => {
    if (!menuOpen) return;
    function close() { setMenuOpen(false); }
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <header className="header">
      <Link to="/chat" className="header__brand">
        <img src="/logo2-removebg-preview.png" alt="ChatStans Logo" className="header__logo-img" />
        <h1 className="header__title">ChatStans</h1>
      </Link>

      <div className="header__user">
        <button
          className="header__avatar-btn"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          aria-label="Account menu"
        >
          <img
            src={user?.avatar}
            alt={user?.name || "User"}
            className="header__avatar"
          />
        </button>
        <span className="header__username">{user?.name}</span>

        {menuOpen && (
          <div className="header__menu" onClick={(e) => e.stopPropagation()}>
            <div className="header__menu-name">{user?.name}</div>
            <div className="header__menu-email">{user?.email}</div>
            <button className="header__menu-item" onClick={onLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}