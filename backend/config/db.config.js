import mongoose from 'mongoose';
import { ENV_VARS } from './env.config.js';
import { getCurrentDateTime } from '../helpers/helper.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Listens for MongoDB connection events and logs relevant messages.
 */
mongoose.connection.on('connected', () =>
  console.log('Mongoose connection established successfully, ' + getCurrentDateTime())
);

mongoose.connection.on('error', (err) => console.log(err.message));

mongoose.connection.on('disconnected', () => console.log('Server disconnected from database'));

/**
 * Handles graceful shutdown for the server by listening for termination signals and closing the MongoDB connection.
 *
 * @param {string[]} signals - An array of termination signals to listen for.
 */
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) =>
  process.on(signal, () => {
    mongoose.connection.close();
    console.log('Server disconnected gracefully at ' + getCurrentDateTime());
    process.exit(0);
  })
);
