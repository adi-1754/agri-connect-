# AgriConnect

A small full-stack job board connecting three types of rural agriculture users:
**Farmers**, **Workers**, and **Coordinators**.

## Stack

- **Backend:** Node.js + Express 5 + Mongoose (MongoDB), CORS enabled, port 5000
- **Frontend:** Plain HTML/CSS/JS, one page per role, talking to the backend via `fetch()`

## Project structure

```
AgriConnect/
├── backend/
│   ├── server.js       # Express API + Mongoose Job model
│   └── package.json
└── frontend/
    ├── index.html       # Landing page — pick your role
    ├── farmer.html      # Farmer portal — post jobs
    ├── worker.html       # Worker portal — browse/search jobs
    ├── coordinator.html  # Coordinator panel — open/close jobs
    ├── css/style.css     # (unused by current pages — kept for reference)
    └── js/app.js         # (unused by current pages — kept for reference)
```

## Setup

1. Make sure MongoDB is running locally on the default port (`mongodb://127.0.0.1:27017`).
2. Install backend dependencies:
   ```
   cd backend
   npm install
   npm start
   ```
   This starts the API on `http://localhost:5000` and connects to a database
   called `agroDB`.
3. Open `frontend/index.html` in a browser (or serve the `frontend` folder
   with any static file server) and pick a role.

## API

| Method | Route        | Description                                  |
|--------|--------------|-----------------------------------------------|
| GET    | `/jobs`      | List all jobs                                 |
| POST   | `/jobs`      | Create a job (`name, phone, title, wage, location, status`) |
| PATCH  | `/jobs/:id`  | Update a job (used by the coordinator panel to toggle `status` between `Open`/`Closed`) |

## Notes / known limitations

- **Auth is client-side only.** Each portal stores registered users in
  `localStorage` (`agri_farmers`, `agri_workers`, `agri_coordinators`) and the
  active session in `sessionStorage`. There's no server-side account store,
  password hashing, or token-based auth — this is fine for a demo/prototype
  but should not be used as-is in production.
- The frontend calls `http://localhost:5000` directly, so backend and
  frontend must run on the same machine (or you'll need to update the base
  URL and add proper CORS/host config for a real deployment).
- `css/style.css` and `js/app.js` are earlier/alternate versions of the UI
  logic that aren't wired into the current HTML files. They're kept here for
  reference but can be deleted if you don't need them.

## Fixed in this copy

- Added the missing `PATCH /jobs/:id` route to `backend/server.js`. The
  coordinator panel's status dropdown already called this endpoint, but the
  original backend only defined `GET` and `POST /jobs`, so toggling a job's
  status silently failed.
