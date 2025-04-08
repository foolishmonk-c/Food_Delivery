// routes/zomatoRoute.js
import express from 'express';
import { searchRestaurants } from '../services/zomatoService.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const data = await searchRestaurants(q);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching from Zomato', error: error.message });
  }
});

export default router;
