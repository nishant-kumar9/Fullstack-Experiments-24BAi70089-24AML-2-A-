# Middleware Implementation (Logging/Auth)

This project demonstrates the implementation of Express middleware for logging and authentication in Node.js applications with a clean, modular architecture.

## Project Structure

```
middleware_implementation/
├── config/
│   └── constants.js          # Application constants and configuration
├── controllers/
│   ├── authController.js     # Authentication route handlers
│   └── protectedController.js # Protected route handlers
├── middleware/
│   ├── asyncErrorHandler.js  # Async error handling wrapper
│   ├── auth.js              # JWT authentication middleware
│   ├── logging.js           # Request/response logging middleware
│   └── validation.js        # Input validation middleware
├── models/
│   └── User.js              # User data model (in-memory storage)
├── routes/
│   ├── auth.js              # Authentication routes (login/register)
│   └── protected.js         # Protected routes requiring authentication
├── services/
│   └── authService.js       # Authentication business logic
├── utils/
│   └── errors.js            # Custom error classes
├── server.js                # Main application entry point
├── package.json
└── README.md
```

## Architecture Overview

This application follows a **modern layered architecture** with clear separation of concerns, using **ES modules** for better code organization and maintainability.

### Layers:
- **Routes**: Define HTTP endpoints and middleware chains (thin layer)
- **Controllers**: Handle HTTP requests/responses, delegate to services
- **Services**: Contain business logic (authentication, user management)
- **Models**: Data access layer for user operations
- **Middleware**: Cross-cutting concerns (auth, logging, validation, error handling)
- **Utils**: Shared utilities and custom error classes
- **Config**: Application configuration and constants

### Key Features:
- **ES Modules**: Modern JavaScript module system
- **In-Memory Storage**: User data stored in RAM only (lost on server restart)
- **Separation of Concerns**: Each layer has a specific responsibility
- **Error Handling**: Centralized error middleware with custom error classes
- **Async Error Handling**: Automatic catching of async errors without try-catch
- **Input Validation**: Middleware-based validation with sanitization
- **Security**: Password hashing, JWT tokens, proper error responses

### Performance Optimizations:
- **Pure In-Memory Operations**: No file I/O for user data access
- **Instant Lookups**: O(1) array operations for user authentication
- **Zero Persistence**: Data exists only while server is running
- **Memory Efficient**: Simple array-based storage

### Error Handling Strategy:
- **No try-catch in controllers**: Async errors automatically caught by `asyncErrorHandler`
- **Custom error classes**: Specific error types with appropriate HTTP status codes
- **Centralized error middleware**: All errors handled consistently

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start MongoDB (optional, for database integration).

3. Start the server:
   ```bash
   npm start
   ```

   Or for development:
   ```bash
   npm run dev
   ```

The server will run on http://localhost:3000

## API Endpoints

### Public Routes
- `GET /` - Welcome message

### Authentication
- `POST /auth/register` - Register a new user
  - Body: `{ "username": "newuser", "password": "password123" }`
  - Returns: `{ "message": "User registered successfully", "userId": 2 }`
- `POST /auth/login` - Login with username and password
  - Body: `{ "username": "testuser", "password": "password" }`
  - Returns: `{ "token": "jwt-token" }`

### Protected Routes
- `GET /api/dashboard` - Protected dashboard (requires Bearer token)
  - Header: `Authorization: Bearer <token>`

## Middleware Sequence

1. Logging middleware (logs all requests)
2. Authentication middleware (for protected routes)
3. Route handlers
4. Error handling middleware (last)

## Testing with Postman

1. Start the server
2. Register a new user: POST to `/auth/register` with credentials
3. Login: POST to `/auth/login` with credentials
4. Copy the token
5. Access protected route: GET `/api/dashboard` with Authorization header

## Expected Outputs

- Request logs in console for all requests
- 401 errors for unauthorized access to protected routes
- Successful access with valid token
- Error handling for internal issues

## Questions

1. **What is middleware in Express?**
   Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

2. **How does the next() function work?**
   The next() function passes control to the next middleware function in the stack. If not called, the request will be left hanging.

3. **Why is the error handler placed last?**
   Error-handling middleware must be placed last because it needs to catch errors from previous middleware and routes.

4. **What is the difference between app.use() and router.use()?**
   app.use() applies middleware to the entire application, while router.use() applies it only to routes defined on that specific router.

5. **How would you implement API rate limiting?**
   Use middleware like express-rate-limit to limit the number of requests from a client within a time window.