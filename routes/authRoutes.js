import express from 'express'
import {register, login, forgotPassword, resetPassword} from '../controllers/authControllers.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-passowrd', forgotPassword)
router.put('/reset-password/:token', resetPassword)

export default router