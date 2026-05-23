# ✅ MERN Todo App

A full-stack task management web application built with the MERN stack featuring JWT authentication, priority levels, and a modern dark-themed dashboard UI.

## 🌐 Live Demo
[Click here to view live](https://mern-todo-rosy-ten.vercel.app) 

## 📸 Features

- 🔐 JWT-based user authentication (Register / Login)
- ✅ Create, edit, complete and delete tasks
- 🎯 Task priority levels (High, Medium, Low)
- 🔍 Filter tasks (All / Active / Completed)
- 📊 Live task statistics dashboard
- 🌙 Modern dark-themed responsive UI
- 💾 MongoDB persistent data storage per user

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React.js | Node.js | MongoDB |
| React Router | Express.js | Mongoose |
| Axios | JWT Auth | |
| CSS3 | bcrypt | |
| Vite | REST API | |

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed locally

### Installation

1. Clone the repository
\```bash
git clone https://github.com/anubhavsuthartech/mern-todo.git
cd mern-todo
\```

2. Install backend dependencies
\```bash
cd backend
npm install
\```

3. Install frontend dependencies
\```bash
cd ../frontend
npm install
\```

### Running the app

1. Start MongoDB
\```bash
"C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath "C:\data\db"
\```

2. Start backend (in a new terminal)
\```bash
cd backend
node server.js
\```

3. Start frontend (in a new terminal)
\```bash
cd frontend
npm run dev
\```

4. Open browser and go to
\```
http://localhost:5173
\```

## 📁 Project Structure

\```
mern-todo/
├── backend/
│   ├── models/
│   │   ├── Todo.js
│   │   └── User.js
│   ├── routes/
│   │   ├── todos.js
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Auth.css
│   │   └── App.jsx
│   └── index.html
└── README.md
\```

## 👨‍💻 Author
**Anubhav Suthar**
- GitHub: [@anubhavsuthartech](https://github.com/anubhavsuthartech)