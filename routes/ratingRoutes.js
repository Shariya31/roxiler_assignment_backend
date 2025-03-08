import express from 'express'
import { authenticateUser } from '../middleware/authMiddleware.js';
import { getMyRatings, submitRating } from '../controllers/ratingControllers.js';

const router = express.Router();

router.post('/:id/rating',authenticateUser, submitRating);
router.get('/:id/my-rating', authenticateUser, getMyRatings);

export default router;