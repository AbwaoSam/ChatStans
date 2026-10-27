export const currentUser = {
  id: 1,
  name: "You",
  avatar: "https://i.pravatar.cc/150?img=1",
};

export const conversations = [
  {
    id: 1,
    name: "Alice Jeruto",
    avatar: "https://i.pravatar.cc/150?img=5",
    online: true,
    lastSeen: "just now",
    unread: 0,
    messages: [
      { id: 1, senderId: 2, text: "Hey! How's the project going?", timestamp: "10:30 AM", status: "read" },
      { id: 2, senderId: 1, text: "Going well! Just finished the frontend.", timestamp: "10:32 AM", status: "read" },
      { id: 3, senderId: 2, text: "Nice! Can't wait to see it.", timestamp: "10:33 AM", status: "delivered" },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: false,
    lastSeen: "2h ago",
    unread: 2,
    messages: [
      { id: 1, senderId: 1, text: "Did you check the repo?", timestamp: "9:15 AM", status: "read" },
      { id: 2, senderId: 3, text: "Yes, looks great!", timestamp: "9:20 AM", status: "delivered" },
    ],
  },
  {
    id: 3,
    name: "Carol Wambui",
    avatar: "https://i.pravatar.cc/150?img=9",
    online: false,
    lastSeen: "yesterday",
    unread: 0,
    messages: [
      { id: 1, senderId: 4, text: "Meeting at 3pm?", timestamp: "Yesterday", status: "read" },
      { id: 2, senderId: 1, text: "Works for me.", timestamp: "Yesterday", status: "read" },
    ],
  },
  {
    id: 4,
    name: "David Mbogo",
    avatar: "https://i.pravatar.cc/150?img=15",
    online: true,
    lastSeen: "just now",
    unread: 1,
    messages: [
      { id: 1, senderId: 5, text: "Thanks for the help!", timestamp: "Monday", status: "delivered" },
    ],
  },
];

export const autoReplies = [
  "Got it, thanks! 👍",
  "Sure, let me check and get back to you.",
  "That sounds good to me.",
  "Haha, nice one 😄",
  "Can we talk about this later today?",
  "Perfect, I'll handle it.",
];