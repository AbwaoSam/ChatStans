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

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-input__field"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="message-input__button">
        Send
      </button>
    </form>
  );
}