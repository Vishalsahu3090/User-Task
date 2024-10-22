
# MERN Stack User and Task Management App

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for user registration, login, and task management. Users can register, log in, create tasks, update task statuses, and fetch their tasks. The app includes a frontend built with React and a backend RESTful API built with Express.js, using JWT for authentication and authorization.

## Features

- **User Registration**: Create a new account with a username and password.
- **User Login**: Log in to access task management functionalities.
- **JWT Authentication**: Users are authenticated via JSON Web Tokens (JWT).
- **Task Management**: 
  - Add new tasks with a title and status (Pending or Completed).
  - View tasks associated with the authenticated user.
  - Task data includes title and completion status.

## Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: In-memory store (or replaceable with MongoDB)

---

## Installation and Setup Instructions

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm or yarn

### Backend Setup

1. Clone the repository to your local machine:
    \`\`\`bash
    git clone https://github.com/your-username/mern-task-manager.git
    cd mern-task-manager/backend
    \`\`\`

2. Install the backend dependencies:
    \`\`\`bash
    npm install
    \`\`\`

3. Install the dotenv and set enviroment Variables :
    
4. Start the backend server:
    \`\`\`bash
    npm start
    \`\`\`

   The server will run on \`http://localhost:5000\`.

### Frontend Setup

1. Navigate to the frontend folder:
    \`\`\`bash
    cd ../frontend
    \`\`\`

2. Install the frontend dependencies:
    \`\`\`bash
    npm install
    \`\`\`

3. Start the frontend server:
    \`\`\`bash
    npm start
    \`\`\`

   The frontend will run on \`http://localhost:3000\`.

---

## API Endpoints

### Authentication

- **POST /api/users/register**  
  Registers a new user.  
  Request Body:
  \`\`\`json
  {
    "username": "john_doe",
    "password": "your_password"
  }
  \`\`\`

- **POST /api/users/login**  
  Logs in a user and returns a JWT.  
  Request Body:
  \`\`\`json
  {
    "username": "john_doe",
    "password": "your_password"
  }
  \`\`\`
  Response:
  \`\`\`json
  {
    "token": "your_jwt_token"
  }
  \`\`\`

### Task Management (Protected Routes)

- **GET /api/tasks**  
  Fetches all tasks for the authenticated user.  
  Requires: JWT in \`Authorization\` header.

- **POST /api/tasks**  
  Creates a new task for the authenticated user.  
  Request Body:
  \`\`\`json
  {
    "title": "New Task",
    "completed": false
  }
  \`\`\`
  Requires: JWT in \`Authorization\` header.

---

## Frontend Functionality

### Login and Register Pages

- The **Navbar** allows users to toggle between **Login** and **Register** pages.
- After registration, the user can log in and start managing tasks.

### Task Management

Once logged in:
- Users can **Add New Tasks** with a title and a status (Pending/Completed).
- Users can **Fetch Tasks** from the backend, and the list of tasks is displayed.

---
