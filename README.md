# Talent Tutorial Web Application

A full-stack web application for an educational platform with user authentication, course management, and interactive features.

## Features

- User authentication (login/register)
- Course browsing and enrollment
- User profile management
- Contact form with message management
- Dark/Light theme support
- Responsive design
- Admin dashboard

## Tech Stack

### Frontend
- HTML5
- CSS3 (Bootstrap)
- JavaScript
- FontAwesome icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd talent-tutorial
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/talent_tutorial
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm run dev
```

5. Open the frontend files in your browser or use a local server.

## Project Structure

```
talent-tutorial/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── css/
│   ├── js/
│   └── *.html
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- GET /api/auth/me - Get current user

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- PUT /api/users/settings - Update user settings
- GET /api/users/courses - Get enrolled courses
- POST /api/users/courses/:courseId - Enroll in course

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get course by ID
- POST /api/courses - Create course (admin/teacher)
- PUT /api/courses/:id - Update course (admin/teacher)
- DELETE /api/courses/:id - Delete course (admin/teacher)
- POST /api/courses/:id/ratings - Add course rating

### Messages
- POST /api/messages - Submit contact form
- GET /api/messages - Get all messages (admin)
- GET /api/messages/:id - Get message by ID (admin)
- PATCH /api/messages/:id/status - Update message status (admin)
- DELETE /api/messages/:id - Delete message (admin)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 