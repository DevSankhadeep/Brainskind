import mongoose from 'mongoose';
const companySchema = new mongoose.Schema(
  {
    job:{ type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status:{ type: String, enum: ['pending', 'accepted','rejected'], default: 'applied' },
  },{ timestamps: true });

export const Application = mongoose.model('Application', companySchema);