import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import {
  login,
  signup,
  logout,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';

/**
 * Express Router instance for handling authentication routes.
 */
const router = express.Router();

/**
 * GET request handler to check user authentication (or authorization)
 */
router.get('/auth', verifyToken, checkAuth);

/**
 * POST request handler for user signup.
 */
router.post('/signup', signup);

/**
 * POST request handler for user login.
 */
router.post('/login', login);

/**
 * POST request handler for user logout.
 */
router.post('/logout', logout);

/**
 * POST request handler for verifying user email.
 */
router.post('/verify/email', verifyEmail);

/**
 * POST request handler for sending password reset email.
 */
router.post('/forgot/password', forgotPassword);

/**
 * POST request handler for resetting user password.
 */
router.post('/reset/password/:token', resetPassword);

/**
 * Export the Express Router instance for authentication routes.
 */
export default router;
