import express from 'express';
import {
  getTrendingTvShow,
  getSimilarTvShows,
  getTvShowTrailers,
  getTvShowDetails,
  getTvShowByCategory,
} from '../controllers/tv.controller.js';

/**
 * Express Router instance for handling TV routes.
 */
const router = express.Router();

/**
 * GET request handler for retrieving trending TvShow.
 */
router.get('/trending', getTrendingTvShow);

/**
 * GET request handler for retrieving TvShow trailers.
 */
router.get('/:id/trailers', getTvShowTrailers);

/**
 * GET request handler for retrieving TvShow details.
 */
router.get('/:id/details', getTvShowDetails);

/**
 * GET request handler for retrieving similar TvShows.
 */
router.get('/:id/similar', getSimilarTvShows);

/**
 * GET request handler for retrieving TvShows by category.
 */
router.get('/:category', getTvShowByCategory);

/**
 * Export the Express Router instance for TV routes.
 */
export default router;
