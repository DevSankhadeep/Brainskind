import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';
import { applyJob, getAppliedJobs } from '../controllers/application.controller.js';

const router = express.Router();

// Apply to a job
router.route('/apply/:id').post(authenticateToken, applyJob);

// Get current user's applications
router.route('/my').get(authenticateToken, getAppliedJobs);

export default router;


