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


// Get applicants for a specific job (typically for job poster/admin)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({ message: 'Invalid job id', status: false });
        }

        const applications = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'applicant',
                // select can be adjusted based on privacy needs
            });

        return res.status(200).json({ status: true, applications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
    }
};

// Update application status (accepted/rejected/pending)
export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        const allowedStatuses = ['pending', 'accepted', 'rejected'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value', status: false });
        }

        const updated = await Application.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Application not found', status: false });
        }

        return res.status(200).json({ message: 'Status updated successfully', status: true, application: updated });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
    }
};

