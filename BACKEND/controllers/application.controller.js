import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({ message: 'Invalid job id', status: false });
        }   
        // Check if the uers has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job', status: false });
        }

        //check if job exists or not
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({ message: 'Job not found', status: false });
        }
        // Create a new application
        const application = await Application.create({ job: jobId, applicant: userId });

        return res.status(201).json({ message: 'Job application successful', status: true, application });


    
    
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
        
    }
};



export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: { path: 'company' },
                options: { sort: { createdAt: -1 } },
            });
        if (!applications) {
            return res.status(400).json({ message: 'No applications found', status: false });
        }
        return res.status(200).json({ status: true, applications });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });

        
    }
};


