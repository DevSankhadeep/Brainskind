import Job from '../models/job.model.js';
//Admin job posting
export const postJob = async (req,res) => {
    try {
        const { title, description, requirements, salary,location,jobType,position,companyId,experience } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !location || !salary || !jobType || !position || !companyId || !experience) {
            return res.status(400).json({ message: 'All fields are required', status: false});
        }
        const job=await createImageBitmap({ title, description, requirements:requirements.split(","), salary:Number(salary),location,jobType,position,company:companyId,created_by:userId,experiencelevel:experience });
        return res.status(201).json({ message: 'Job posted successfully', status: true, job });

    } catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
    }
};
//users
export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[ 
                {title: { $regex: keyword, $options: 'i' } },
                {description: { $regex: keyword, $options: 'i' } },
            
            ],
        };
        const jobs=await job.find(query).populate({
            path: "company",
        }).sort({ createdAt: -1 });
        if(!jobs){
            return res.status(404).json({ message: 'No jobs found', status: false });
        }
        return res.status(200).json({ message: 'Jobs fetched successfully', status: true });
        
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
    }
};

//users
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({ message: 'Job not found', status: false });
        }   
        return res.status(200).json({ status: true, job });

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
        
    }
};

//Admin job created 
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(400).json({ message: 'No jobs found', status: false });
        }
        return res.status(200).json({ status: true, jobs });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', status: false });
        
    }