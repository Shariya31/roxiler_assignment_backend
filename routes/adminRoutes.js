import express from 'express'
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAdminDashboard, getAllStores, getAllUsers, getUserDetails } from '../controllers/adminControllers.js';

const router = express.Router();

router.get('/dashboard', authenticateUser, authorizeRoles('admin'), getAdminDashboard)
router.get('/users', authenticateUser, authorizeRoles('admin'), getAllUsers)
router.get('/stores', authenticateUser, authorizeRoles('admin', 'user', 'store_owner'), getAllStores)
router.get('/user/:id', authenticateUser, authorizeRoles('admin', 'store_owner'), getUserDetails)

export default router;