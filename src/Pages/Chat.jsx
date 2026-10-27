import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  conversations as initialConversations,
  autoReplies,
} from "../data/sampleData";
import { currentTimeLabel } from "../utils/time";

export default function Chat() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const [conversations, setConversations] = useLocalStorage(
    "chatstans:conversations",
    initialConversations
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileView, setMobileView] = useState("list");

  // Loading state for simulated message fetch on conversation change
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "ready" | "error"

  const numericId = conversationId ? Number(conversationId) : null;
  const selectedConversation = conversations.find((c) => c.id === numericId);

  // ─── Effect: browser title on selected conversation ─────────────────
  useEffect(() => {
    if (selectedConversation) {
      document.title = `${selectedConversation.name} • ChatStans`;
    } else if (conversationId) {
      document.title = "Conversation not found • ChatStans";
    } else {
      document.title = "Chats • ChatStans";
    }
  }, [selectedConversation, conversationId]);

  // ─── Effect: simulated loading when conversation ID changes ────────
  // Cleanup cancels the timeout if the user switches away quickly.
  useEffect(() => {
    if (!conversationId) {
      setStatus("idle");
      return;
    }

    const exists = conversations.some((c) => c.id === Number(conversationId));
    if (!exists) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus("ready");
    }, 600);

    return () => {
      clearTimeout(timer);
    };
    // We intentionally do NOT depend on `conversations` here, so the
    // loading spinner doesn't re-trigger when a message is sent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // ─── Effect: mark conversation read once loaded ────────────────────
  useEffect(() => {
    if (status !== "ready" || !selectedConversation) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConversation.id
          ? {
              ...c,
              unread: 0,
              messages: c.messages.map((m) => ({ ...m, status: "read" })),
            }
          : c
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, selectedConversation?.id]);

  // ─── Effect: track mobile view based on route ─────────────────────
  useEffect(() => {
    if (conversationId) setMobileView("chat");
    else setMobileView("list");
  }, [conversationId]);

  // ─── Handlers ─────────────────────────────────────────────────────
  const handleSelectConversation = useCallback(
    (id) => {
      navigate(`/chat/${id}`);
    },
    [navigate]
  );

  function handleBackToList() {
    navigate("/chat");
  }

  function handleSendMessage(text) {
    if (!selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      senderId: user.id,
      text,
      timestamp: currentTimeLabel(),
      status: "sent",
    };

    const convId = selectedConversation.id;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId ? { ...c, messages: [...c.messages, newMessage] } : c
      )
    );

    // Delivered
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === newMessage.id ? { ...m, status: "delivered" } : m
                ),
              }
            : c
        )
      );
    }, 800);

    // Read
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === newMessage.id ? { ...m, status: "read" } : m
                ),
              }
            : c
        )
      );
    }, 2000);

    // Auto-reply
    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    const otherSenderId =
      selectedConversation.messages.find((m) => m.senderId !== user.id)?.senderId ??
      999;

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    id: Date.now() + 1,
                    senderId: otherSenderId,
                    text: reply,
                    timestamp: currentTimeLabel(),
                    status: "delivered",
                  },
                ],
              }
            : c
        )
      );
    }, 3500);
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  // ─── Filtered list ────────────────────────────────────────────────
  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ─── Render chat pane by status ───────────────────────────────────
  function renderChatPane() {
    if (status === "loading") {
      return (
        <main className="chat-window chat-window--center">
          <Loading label="Loading messages..." />
        </main>
      );
    }
    if (status === "error") {
      return (
        <main className="chat-window chat-window--center">
          <ErrorState
            title="Conversation not found"
            message="That conversation ID doesn't exist. It may have been deleted."
            actionLabel="Back to chats"
            onAction={handleBackToList}
            showHome
          />
        </main>
      );
    }
    if (!selectedConversation) {
      return (
        <main className="chat-window chat-window--center">
          <EmptyState
            icon={<img src="/logo2-removebg-preview.png" alt="ChatStans" className="empty-logo" />}
            title="Welcome to ChatStans"
            message="Select a conversation to start messaging."
          />
        </main>
      );
    }
    return (
      <ChatWindow
        conversation={selectedConversation}
        currentUserId={user.id}
        onSendMessage={handleSendMessage}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <div className={`app__body app__body--${mobileView}`}>
        <Sidebar
          conversations={filteredConversations}
          selectedId={selectedConversation?.id ?? null}
          onSelect={handleSelectConversation}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        {renderChatPane()}
      </div>
    </div>
  );
}