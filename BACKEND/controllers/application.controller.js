import { Application } from "../models/application.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({ message: 'Invalid job id', status: false });
        }   
        // Check if the uers has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, user: userId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job', status: false });
        }

        //check if job exists or not
        const job = await Job.findBy(jobId);
        if (!job) {
            return res.status(400).json({ message: 'Job not found', status: false });
        }
        // Create a new application
        const application = new Application({
            job: jobId,
            applicant: userId,
        });
        job,application.push(new application._id);
        await job.save();

        return res.status(201).json({ message: 'Job application successful', status: true, application });


    
    
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
        
    }
};



export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },populate: { path: 'company' }
         options: { sort: { createdAt: -1 } }
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


