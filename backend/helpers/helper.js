import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV_VARS } from '../config/env.config.js';

// Constants for helper functions
const PROILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
const SALT_WORK_FACTOR = 10;

export const getCurrentDateTime = () => {
  const currentdate = new Date();
  const datetime =
    'Last Sync: ' +
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  return datetime;
};

export const generateProfilePicture = () => {
  const randomNumber = Math.floor(Math.random() * PROILE_PICS.length);
  return PROILE_PICS[randomNumber];
};

export const generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTokenAndSetCookie = (payload, res) => {
  // Generate a token
  const token = jwt.sign({ payload }, ENV_VARS.JWT_SECRET, { expiresIn: '7d' });

  // Set a cookie with the token
  let options = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === 'production',
    sameSite: 'strict',
  };
  res.cookie('netflixToken', token, options);

  return token;
};

export const hashPassword = async (password) => {
  // Generate a salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // Hash the password using our new salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const getClientUrl = () => {
  const { NODE_ENV, CLIENT_HOST, CLIENT_PORT, PORT } = ENV_VARS;
  return NODE_ENV === 'development' ? `http://${CLIENT_HOST}:${CLIENT_PORT}` : `http://${CLIENT_HOST}:${PORT}`;
};
