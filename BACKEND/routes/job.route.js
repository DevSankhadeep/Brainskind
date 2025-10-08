import express from 'express';

import authenticateToken from '../middleware/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';


const router = express.Router();

router.route("/get").get(getAllJobs);
router.route("/getadminjobs/:id").get(authenticateToken,getAdminJobs);
router.route("/get/:id").put(authenticateToken,getJobById);
router.route("/post").post(authenticateToken, postJob);
export default router;