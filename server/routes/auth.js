import express from 'express';
import { login } from '../controllers/auth.js';
import { checkCaptcha } from '../middleware/checkCaptcha.js';

const router = express.Router();

router.post('/login', checkCaptcha, login);

export default router;
