import { fetchFromTMDB } from '../services/tmdb.service.js';

/**
 * Fetches a (random) trending tv-show from The Movie Database (TMDB) and returns it.
 */
export const getTrendingTvShow = async (req, res) => {
  try {
    const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
    const randomTvShow = data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomTvShow });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Retrieves tv-show trailers from The Movie Database (TMDB) based on the provided tv-show ID.
 */
export const getTvShowTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?&language=en-US`);

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes('404')) return res.status(404).json({ success: false, message: 'Not Found' });

    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Fetches tv-show details from The Movie Database (TMDB) API.
 */
export const getTvShowDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes('404')) return res.status(404).json({ success: false, message: 'Not Found' });

    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Fetches a list of similar tv-shows for the provided tv-show ID from The Movie Database (TMDB).
 */
export const getSimilarTvShows = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Fetches a list of popular, upcoming and top-rated tv-shows from The Movie Database (TMDB) for a given genre.
 */
export const getTvShowByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};
