import express from 'express';
import { registerUser, loginUser, googleLogin } from '../controllers/authController.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('api/auth/register', registerUser);
router.post('api/auth/login', loginUser);
router.post('api/auth/google-login', googleLogin);

export default router;

