import express from 'express'
import { createStore, getAllStores, getStoreDetails } from '../controllers/storeControllers.js';
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-store', authenticateUser, authorizeRoles('admin'), createStore)
router.get('/all-store', authenticateUser, authorizeRoles('admin'), getAllStores)
router.get('/:id', authenticateUser, authorizeRoles('admin'), getStoreDetails)

export default router