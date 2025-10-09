import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';
import { applyJob,getApplicants, getAppliedJobs,updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

// Apply to a job
router.route('/apply/:id').post(authenticateToken, applyJob);
router.route('/:id/applicants').get(authenticateToken, getApplicants);
router.route('/get').get(authenticateToken, getAppliedJobs);
router.route('/status/:id/update').put(authenticateToken, updateStatus);

// Get current user's applications


export default router;


