# Task Management API

A **Task Management API** built using Node.js, Express.js, and MongoDB, designed to create, retrieve, update, and delete tasks with user-based access control. It supports user authentication and provides endpoints for managing tasks efficiently.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)


---

## Features
- **User Authentication**: Secure login and task association per user.
- **CRUD Operations**: Create, read, update, and delete tasks.
- **Task Categorization**: Organize tasks by category.
- **Task Completion Status**: Mark tasks as completed or incomplete.
- **Due Date Tracking**: Set due dates for tasks.
- **Search and Sorting**: Retrieve tasks sorted by date and filter by category.

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **API Documentation**: Swagger (OpenAPI)
- **Middleware**: `morgan`, `helmet`, `express-validator`

---

## API Documentation
The API documentation is available through **Swagger UI**:

- **URL**: `http://localhost:<PORT>/api-docs`

---

## Setup and Installation

### Prerequisites
- Node.js (>= 16.x)
- MongoDB (locally or a cloud database like MongoDB Atlas)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/task-management-api.git
   cd task-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:
   ```bash
   npm start
   ```

5. Visit `http://localhost:<PORT>` to access the API.

---

## Environment Variables
Create a `.env` file in the root of the project and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority
JWT_SECRET=<your-secret-key>
```

- Replace `<username>`, `<password>`, `<cluster-url>`, and `<db-name>` with your MongoDB credentials.
- Set `<your-secret-key>` to a secure random string for signing JWTs.

---

## Usage

### Running in Development Mode
Use `nodemon` for development:
```bash
npm run dev
```



---

## Endpoints

### User Endpoints
| Method | Endpoint        | Description                  | Auth Required |
|--------|-----------------|------------------------------|---------------|
| POST   | `/api/users/register` | Register a new user    | ❌            |
| POST   | `/api/users/login`    | User login             | ❌            |

### Task Endpoints
| Method | Endpoint                | Description                 | Auth Required |
|--------|-------------------------|-----------------------------|---------------|
| POST   | `/api/tasks`            | Create a new task           | ✅            |
| GET    | `/api/tasks`            | Get all tasks for a user    | ✅            |
| GET    | `/api/tasks/:id`        | Get task by ID              | ✅            |
| PUT    | `/api/tasks/:id`        | Update a task               | ✅            |
| DELETE | `/api/tasks/:id`        | Delete a task               | ✅            |
| PUT    | `/api/tasks/:id/status` | Update task status          | ✅            |

**For a detailed description of request and response payloads, visit the Swagger UI.**

---

## Directory Structure
```
task-management-api/
├── src/
│   ├── controller/    # API route controllers
│   ├── middleware/     # Middleware for authentication and error handling
│   ├── model/         # Mongoose models
│   ├── route/         # Route definitions
│   ├── utils/          # Utility functions
│   └── index.js        # Express app setup
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
├── README.md           # Documentation
```

---

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/<feature-name>
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature: <feature-name>"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/<feature-name>
   ```
5. Submit a Pull Request.

---
