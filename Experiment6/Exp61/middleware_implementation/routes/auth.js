// routes/auth.js
import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import asyncErrorHandler from '../middleware/asyncErrorHandler.js';

const router = express.Router();

// Register route
// Validation middleware is applied before the controller to ensure the request body is valid before processing
router.post('/register', validateRegistration, asyncErrorHandler(register));

// Login route
// Validation middleware is applied before the controller to ensure the request body is valid before processing
router.post('/login', validateLogin, asyncErrorHandler(login));

export default router;