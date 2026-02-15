import { Router } from 'express';
import { generateAndSaveFitnessProfile, getFitnessProfile } from '../controllers/fitness.controller';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

// Generate fitness profile with AI and save to database
router.post('/generate', requireAuth, generateAndSaveFitnessProfile);

// Get user's fitness profile
router.get('/profile', requireAuth, getFitnessProfile);

export default router;
