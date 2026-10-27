# ChatStans — Phase 2

A responsive, WhatsApp/Instagram-inspired React chat UI.

## Phase 2 additions

### Task A — Routing
- `react-router-dom` with routes `/login`, `/register`, `/chat`, `/chat/:conversationId`
- `*` route renders a **404 Not Found** page
- `ProtectedRoute` redirects unauthenticated users to `/login`
- Opening `/chat/:conversationId` directly selects the correct conversation
- Navigation between pages uses `<Link>` / `useNavigate` (no full reloads)

### Task B — useEffect
- **Browser title** updates to `"Chats • ChatStans"`, `"<Name> • ChatStans"`, or `"Conversation not found • ChatStans"`
- **Simulated message load** when `conversationId` changes: 600 ms spinner, then content
- **Effect cleanup** clears the pending timeout when switching conversations quickly
- **Invalid conversation ID** shows an error state with a "Back to chats" action
- **Mark-as-read** runs in an effect once messages finish "loading"

### Task C — Forms
- `validateLogin` / `validateRegister` cover required fields, email format, minimum password length, and matching passwords
- Inline field errors + submit-disabled state + simulated async success
- Successful login/register navigates to `/chat`
- Login ⇄ Register links between pages

### Task D — Preserve Phase 1
- Original sidebar + chat layout intact
- Message sending still works (with delivered/read ticks and auto-replies)
- Fully responsive (single-column on mobile with a back button)
- Reusable components under `src/components`, pages under `src/pages`

## Run

```bash
npm install react-router-dom
npm run dev