import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['recruiter', 'student'],
        default: 'student',
        required: true, 
    },
    profile: {
        bio:{
            type: String,

        },
        skills:[{
            type: String,
        }],
        resume:{
            type: String,//url to the resume file from database
        },
        resumeOriginal:{
            type: String,//original name of the resume file
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Company',
        },
        profilephoto:{
            type: String,//url to the profile photo from database
            default:'',
        },  
    },
}, { timestamps: true });


export const User = mongoose.model('User', userSchema);