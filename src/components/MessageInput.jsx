import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <textarea
        rows={1}
        className="message-input__field"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="message-input__button"
        disabled={!text.trim()}
      >
        Send
      </button>
    </form>
  );
}