// middleware/auth.js
import AuthService from '../services/authService.js';
import { AuthenticationError } from '../utils/errors.js';

// Authentication middleware to protect routes
// Working - This middleware checks for the presence of a Bearer token in the Authorization header of incoming requests. If a token is found, it verifies the token using the AuthService's verifyToken method and retrieves the associated user data. If the token is valid and the user exists, the user data is attached to the request object (req.user) for use in subsequent middleware or route handlers. If any step fails (e.g., no token provided, invalid token, user not found), an appropriate error response is sent back to the client.
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.substring(7);

    // Verify token and get user data
    const decoded = AuthService.verifyToken(token);
    const user = await AuthService.getUserById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;