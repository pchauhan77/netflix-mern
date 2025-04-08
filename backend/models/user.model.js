import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateProfilePicture, hashPassword } from '../helpers/helper.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    profilePic: {
      type: String,
      default: generateProfilePicture,
    },
    searchHistory: {
      type: Array,
      default: [],
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await hashPassword(this.password);
    // override the cleartext password with the hashed one
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function comparePassword(userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
