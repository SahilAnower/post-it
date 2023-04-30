import express from 'express';
import {
  getUser,
  getUserFreinds,
  addRemoveFreind,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// read
router.get('/:id', verifyToken, getUser);
router.get('/:id/freinds', verifyToken, getUserFreinds);

// update
router.patch('/:__id/:freindId', verifyToken, addRemoveFreind);

export default router;
