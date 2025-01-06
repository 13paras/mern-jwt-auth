# Authentication Application

This is a full-stack authentication application built with a Node.js backend and a frontend framework (e.g., React, Angular, or Vue). The application provides user registration, login, and session management functionalities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with email verification
- User login and authentication
- JWT-based session management
- Password hashing and validation
- Error handling and validation
- Secure cookie management

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Bcrypt for password hashing
  - JSON Web Tokens (JWT) for authentication
  - Zod for schema validation

- **Frontend**:
  - React (or your chosen framework)
  - Axios for API requests
  - Redux (or Context API) for state management

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/auth-app.git
cd auth-app
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Backend Setup

1. Create a `.env` file in the `backend` directory and add the following environment variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

2. Start the backend server:

```bash
npm run dev
```

## Frontend Setup

1. Start the frontend development server:

```bash
npm start
```

## API Endpoints

### Authentication Endpoints

- **POST /api/auth/register**

  - Register a new user.
  - Request body: `{ "email": "test@test.com", "password": "123123" }`

- **POST /api/auth/login**

  - Log in an existing user.
  - Request body: `{ "email": "test@test.com", "password": "123123" }`

- **GET /api/auth/logout**
  - Log out the user.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
