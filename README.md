# 📋 Task Manager Pro

Task Manager Pro is a modern, responsive, and secure full-stack web application designed for personal productivity. Users can manage tasks across a secure, private workspace with statistics dashboard insights, live sorting/filtering, and real-time validation.

The design utilizes a premium, professional color palette: **Olive Green (#5C6B3C)** and **Off-White (#F5F5F0)**, featuring smooth hover animations, glassmorphic cards, and an adaptive layout for desktop, tablet, and mobile screens.

---

github link --https:/https://github.com/Lakshmikanthmanibolu/Task-manager-pro
live host link-- https://magenta-taiyaki-2a861f.netlify.app/

## ✨ Features

- **🔐 Secure Authentication & Authorization**: Sign up and login with JWT (JSON Web Tokens) stored securely. All task operations are strictly authorized and scoped to the logged-in user.
- **📊 Interactive Dashboard Statistics**: Visual representation of Total, Completed, Pending, and Overdue tasks with dynamic, real-time counters.
- **📝 Comprehensive Task Management (CRUD)**: Create, view, update, toggle completion status, and delete tasks.
- **🔍 Advanced Filtering, Search & Sorting**:
  - Filter by status: *All*, *Pending*, or *Completed*.
  - Live query search across task titles and descriptions.
  - Sort by *Newest*, *Oldest*, *Priority (High to Low)*, or *Due Date*.
- **⚠️ Priority and Expiry Identifiers**: Color-coded badges for High, Medium, and Low priorities, alongside overdue notifications.
- **🔔 Toast Notifications & Confirmation Dialogs**: Custom-styled success, warning, and error toast alerts using `react-hot-toast` with confirm-before-delete dialogs.

---

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express.js**: Backend application framework.
- **MongoDB** & **Mongoose**: NoSQL Database and object modeling.
- **JSON Web Tokens (JWT)**: Secure user session transmission.
- **Bcrypt.js**: One-way password hashing.
- **Express Validator**: Server-side request schema validation.

### Frontend
- **React.js (Vite)**: Modern fast build frontend library.
- **React Router DOM (v7)**: Seamless client-side routing.
- **Axios**: HTTP client with request interceptors for automatic JWT header attachment.
- **React Icons & React Hot Toast**: Sleek icons and notification system.
- **CSS3 (Vanilla)**: High-performance custom styles, glassmorphism, and responsive design.

---

## 📁 Folder Structure

```
Task Manager Pro/
├── server/                    # Backend API
│   ├── config/db.js           # Database connection
│   ├── controllers/           # Auth and Task route controllers
│   ├── middleware/            # Auth guards, validation, and error handlers
│   ├── models/                # Mongoose schemas (User, Task)
│   ├── routes/                # Express router endpoints
│   ├── server.js              # Server entry point
│   └── .env                   # Local configuration secrets (ignored in git)
│
├── client/                    # Frontend React SPA
│   ├── src/
│   │   ├── api/axios.js       # Global Axios instance
│   │   ├── components/        # Layout, Tasks, UI, and Dashboard components
│   │   ├── context/           # AuthContext and TaskContext providers
│   │   ├── pages/             # Login, Register, Dashboard, and Task pages
│   │   ├── App.jsx            # Main Router setup
│   │   └── index.css          # Olive-Green theme design system
│   ├── index.html
│   └── vite.config.js         # Port proxy setup
│
├── .gitignore                 # Files excluded from GitHub upload
├── package.json               # Root scripts and concurrently config
└── README.md                  # Project documentation
```

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js installed on your computer.
- MongoDB installed locally or a MongoDB Atlas URI connection.

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd task-manager-pro
   ```

2. **Install all dependencies** (installs root, client, and server dependencies in one command):
   ```bash
   npm run install-all
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside the `server/` directory and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   ```

4. **Run the Application**:
   In the root directory, run the following command to start both the frontend client and backend server concurrently:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open your browser and navigate to **`http://localhost:5173`**.

---

## 🔗 REST API Reference

### Authentication
| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user and retrieve token | No |
| `GET` | `/api/auth/me` | Fetch currently logged-in user profile | Yes |

### Tasks
| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| `GET` | `/api/tasks` | Fetch all tasks for user (supports search, sort, filter) | Yes |
| `GET` | `/api/tasks/stats` | Retrieve user-specific task count statistics | Yes |
| `GET` | `/api/tasks/:id` | Fetch details of a single task | Yes |
| `POST` | `/api/tasks` | Create a new task | Yes |
| `PUT` | `/api/tasks/:id` | Update details of a task | Yes |
| `PATCH` | `/api/tasks/:id/toggle` | Toggle task completion | Yes |
| `DELETE` | `/api/tasks/:id` | Delete a single task | Yes |
| `DELETE` | `/api/tasks/completed` | Clear all completed tasks | Yes |
