import express from 'express';
import {
  searchPerson,
  searchMovie,
  searchTvShow,
  getSearchHistory,
  removeFromSearchHistory,
} from '../controllers/search.controller.js';

/**
 * Express Router instance for handling search routes.
 */
const router = express.Router();

/**
 * GET request handler for search person details.
 */
router.get('/person/:query', searchPerson);

/**
 * GET request handler for search movie.
 */
router.get('/movie/:query', searchMovie);

/**
 * GET request handler for search TvShow.
 */
router.get('/tv/:query', searchTvShow);

/**
 * GET request handler to get search history.
 */
router.get('/history', getSearchHistory);

/**
 * GET request handler to remove search history from the database.
 */
router.delete('/history/:id', removeFromSearchHistory);

/**
 * Export the Express Router instance for search routes.
 */
export default router;
