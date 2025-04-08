import express from 'express';
import {
  getTrendingMovie,
  getSimilarMovies,
  getMovieTrailers,
  getMovieDetails,
  getMoviesByCategory,
} from '../controllers/movie.controller.js';

/**
 * Express Router instance for handling movie routes.
 */
const router = express.Router();

/**
 * GET request handler for retrieving trending movies.
 */
router.get('/trending', getTrendingMovie);

/**
 * GET request handler for retrieving movie trailers.
 */
router.get('/:id/trailers', getMovieTrailers);

/**
 * GET request handler for retrieving movie details.
 */
router.get('/:id/details', getMovieDetails);

/**
 * GET request handler for retrieving similar movies.
 */
router.get('/:id/similar', getSimilarMovies);

/**
 * GET request handler for retrieving movies by category.
 */
router.get('/:category', getMoviesByCategory);

/**
 * Export the Express Router instance for movie routes.
 */
export default router;
