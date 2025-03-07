import express from 'express'
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAdminDashboard } from '../controllers/adminControllers.js';

const router = express.Router();

router.get('/dashboard', authenticateUser, authorizeRoles('admin'), getAdminDashboard)

export default router;