import JWT from 'jsonwebtoken';
import { ENV_VARS } from '../config/env.config.js';

export const verifyToken = async (req, res, next) => {
  // Extract the authentication token from the cookie
  const token = req.cookies.netflixToken;

  // If no token is present, return an unauthorized response
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized - token not provided' });
  }

  // Verify the token using the JWT secret
  try {
    const decoded = JWT.verify(token, ENV_VARS.JWT_SECRET);

    // If the token is invalid, return an unauthorized response
    if (!decoded) return res.status(401).json({ success: false, message: 'Unauthorized - invalid token' });

    // If the token is expired, return an unauthorized response
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ success: false, message: 'Unauthorized - token expired' });
    }

    // If the token is valid, attach the user's ID to the request and call the next function
    req.userId = decoded.payload;

    next();
  } catch (error) {
    // If the token verification fails, return an error response
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
