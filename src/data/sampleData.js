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
    messages: [
      { id: 1, senderId: 2, text: "Hey! How's the project going?", timestamp: "10:30 AM" },
      { id: 2, senderId: 1, text: "Going well! Just finished the frontend.", timestamp: "10:32 AM" },
      { id: 3, senderId: 2, text: "Nice! Can't wait to see it.", timestamp: "10:33 AM" },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=12",
    messages: [
      { id: 1, senderId: 1, text: "Did you check the repo?", timestamp: "9:15 AM" },
      { id: 2, senderId: 3, text: "Yes, looks great!", timestamp: "9:20 AM" },
    ],
  },
  {
    id: 3,
    name: "Carol Wambui",
    avatar: "https://i.pravatar.cc/150?img=9",
    messages: [
      { id: 1, senderId: 4, text: "Meeting at 3pm?", timestamp: "Yesterday" },
      { id: 2, senderId: 1, text: "Works for me.", timestamp: "Yesterday" },
    ],
  },
  {
    id: 4,
    name: "David Mbogo",
    avatar: "https://i.pravatar.cc/150?img=15",
    messages: [
      { id: 1, senderId: 5, text: "Thanks for the help!", timestamp: "Monday" },
    ],
  },
];