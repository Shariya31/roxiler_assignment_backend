import express from 'express'
import { getStoreOwnerDashboard } from '../controllers/storeOwnerControllers.js';
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authenticateUser, authorizeRoles('store_owner', 'admin'), getStoreOwnerDashboard)

export default router;