import mongoose from 'mongoose';
const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    website:{ type: String, required: true },
    location: { type: String, required: true },
    logo:{ type: String},//url for company logo

    userId:[{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true}],
  },{ timestamps: true });

export const Company = mongoose.model('Company', companySchema);