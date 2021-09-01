import express from 'express';
import { getSync, getAll, getBySearchQuery } from '../controllers/posts.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
// user must login to access all this routes
// put auth middleware here

router.get('/sync', auth, getSync);
router.get('/statistics/search', auth, getBySearchQuery);
router.get('/statistics', auth, getAll);

export default router;
