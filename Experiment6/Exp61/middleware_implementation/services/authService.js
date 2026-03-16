// services/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import constants from '../config/constants.js';
import { ConflictError, AuthenticationError } from '../utils/errors.js';

class AuthService {
  // Register a new user
  static async register(username, password) {
    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    // Hash password
    // bcrypt.hash() is an asynchronous function that takes the plain text password and the number of salt rounds as arguments. It returns a promise that resolves to the hashed password. The number of salt rounds (constants.BCRYPT_ROUNDS) determines how computationally expensive the hashing process will be, which can help protect against brute-force attacks.
    const hashedPassword = await bcrypt.hash(password, constants.BCRYPT_ROUNDS);

    // Create user
    const user = await User.create(username, hashedPassword);

    return user.toPublicData();
  }

  // Authenticate user and return token
  static async login(username, password) {
    // Find user
    const user = await User.findByUsername(username);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Verify password
    // bcrypt.compare() is an asynchronous function that takes the plain text password and the hashed password as arguments. It returns a promise that resolves to a boolean indicating whether the passwords match. If the passwords do not match, an AuthenticationError is thrown with the message 'Invalid credentials'.
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate JWT token
    // jwt.sign() is a synchronous function that takes a payload (in this case, an object containing the user's id and username), a secret key (constants.JWT_SECRET), and an options object (which specifies the token's expiration time). It returns a signed JWT token that can be used for authentication in subsequent requests.
    const token = jwt.sign(
      { id: user.id, username: user.username },
      constants.JWT_SECRET,
      { expiresIn: constants.JWT_EXPIRES_IN }
    );

    return { token, user: user.toPublicData() };
  }

  // Verify JWT token
  // jwt.verify() is a synchronous function that takes a token and a secret key as arguments. It verifies the token's signature and returns the decoded payload if the token is valid. If the token is invalid (e.g., if it has been tampered with or if it has expired), jwt.verify() will throw an error, which is caught and re-thrown as an AuthenticationError with the message 'Invalid token'.
  static verifyToken(token) {
    try {
      return jwt.verify(token, constants.JWT_SECRET);
    } catch (error) {
      throw new AuthenticationError('Invalid token');
    }
  }

  // Get user by ID (for middleware)
  // getUserById() is an asynchronous function that takes a user ID as an argument. It uses the User model's findById() method to retrieve the user from the in-memory cache. If the user is not found, it throws an AuthenticationError with the message 'User not found'. If the user is found, it returns the user's public data (excluding the password) by calling the toPublicData() method on the user object.
  static async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new AuthenticationError('User not found');
    }
    return user.toPublicData();
  }
}

export default AuthService;