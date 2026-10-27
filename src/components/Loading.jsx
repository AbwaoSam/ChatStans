export default function Loading({ label = "Loading..." }) {
  return (
    <div className="state-view">
      <div className="spinner" aria-hidden="true" />
      <p className="state-view__text">{label}</p>
    </div>
  );
}