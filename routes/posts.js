import express from 'express';
import { getSync, getAll, getBySearchQuery, getByContinentQuery, updateCountry } from '../controllers/posts.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
// user must login to access all this routes
// put auth middleware here

router.get('/sync', auth, getSync);
router.get('/statistics/search', auth, getBySearchQuery);
router.get('/statistics/continent', auth, getByContinentQuery);
router.patch('/statistics/search', auth, updateCountry);
router.get('/statistics', auth, getAll);

export default router;
