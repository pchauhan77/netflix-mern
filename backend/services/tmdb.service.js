import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Fetches data from The Movie Database (TMDB) using the provided URL and API key.
 */
export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`, // Use the token from .env
    },
  };

  try {
    const response = await axios.get(url, options);
    if (response.status !== 200) {
      throw new Error('Failed to fetch data from TMDB');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error.message);
    throw new Error('Failed to fetch data from TMDB: ' + error.message);
  }
};
