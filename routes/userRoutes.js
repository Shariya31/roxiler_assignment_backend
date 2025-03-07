import express from 'express'
import {authenticateUser, authorizeRoles} from '../middleware/authMiddleware.js'
import { createUser, getAllUsers, getUserDetails } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/get-users', authenticateUser, authorizeRoles('admin'), getAllUsers);

router.post('/create-user', authenticateUser, authorizeRoles('admin'), createUser);

router.get('/me', authenticateUser, getUserDetails);

export default router
