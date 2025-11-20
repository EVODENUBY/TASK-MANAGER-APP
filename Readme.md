# Task Manager App

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Features

- 📝 Create, read, update, and delete tasks
- 🏷️ Categorize tasks by status (Pending, In Progress, Completed)
- 🔍 Filter tasks by status
- 📱 Responsive design for all devices
- ⚡ Real-time updates
- 📅 Task creation timestamps

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Styling**: CSS3 with modern flexbox and grid

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task's status
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
.
├── backend/           # Backend server
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Express server setup
└── frontend/         # Frontend React app
    ├── public/       # Static files
    └── src/          # React components and logic
        ├── services/ # API service
        └── App.js    # Main component
```
