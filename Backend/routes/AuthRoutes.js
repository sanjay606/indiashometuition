import express from 'express';
import { signup } from '../controllers/AuthController.js';
import { login } from '../controllers/logController.js';
// import { verifyOTP } from '../utils/verifyOTP.js';
// import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
// router.post('/verify-otp', verifyOTP);
router.post('/login', login);
// router.get('/protected', verifyToken, (req, res) => {
//   res.json({ message: 'Access granted! You are authenticated.' });
// });

export default router;
