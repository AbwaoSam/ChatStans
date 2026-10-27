import { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { conversations as initialConversations, currentUser } from "./data/sampleData";
import "./App.css";

export default function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Tracks whether the chat window is open on mobile
  const [mobileView, setMobileView] = useState("list"); // "list" | "chat"

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSelectConversation(id) {
    setSelectedId(id);
    setMobileView("chat"); // switch to chat view on mobile
  }

  function handleBackToList() {
    setMobileView("list");
  }

  function handleSendMessage(text) {
    if (!selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <div className={`app__body app__body--${mobileView}`}>
        <Sidebar
          conversations={filteredConversations}
          selectedId={selectedId}
          onSelect={handleSelectConversation}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <ChatWindow
          conversation={selectedConversation}
          currentUserId={currentUser.id}
          onSendMessage={handleSendMessage}
          onBack={handleBackToList}
        />
      </div>
    </div>
  );
}