export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">ChatStans</h1>
      <div className="header__user">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="Current user"
          className="header__avatar"
        />
        <span className="header__username">You</span>
      </div>
    </header>
  );
}