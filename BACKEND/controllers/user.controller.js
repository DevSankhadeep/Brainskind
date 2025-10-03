import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=async (req, res) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }
    //covert password to hashes
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
    });

    await newUser.save();
    return res.status(201).json({
        message: `User registered successfully ${fullname}`,
        success: true,
    });
    }

    catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong in registering",
            success: false,
        });
    }
};

export const login=async (req, res) => {
    try {
        const {email,password,role}= req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
    let user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "Incorrect email or password",
            success: false,
        });
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message: "Incorrect email or password",
            success: false,
        });
    }
    //check role correctly or not
    if(user.role!==role){
        return res.status(400).json({
            message: "Please login with correct role",
            success: false,
        });
    }

    //generate jwt token
    const tokenData={
        userId:user._id,
    };
    const token=await jwt.sign(tokenData,process.env.JWT_SECRET,{
        expiresIn:"1d",
    });
user={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phonenumber:user.phoneNumber,
    role:user.role,
    profile:user.profile,
};
    return res.status(200)
        .cookie("token", token, { maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict' })
        .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
    });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong in login",
            success: false,
        });
    }
};

export const logout=async (req, res) => {
    try{
        return res.status(200).cookie("token","",{maxAge:0, httpOnly:true, sameSite:'strict'}).json({
            message:"Logged out successfully",
            success: true,
        });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({
            message:"Something went wrong in logout",
            success: false,
        });
    }
};

export const updateProfile=async (req, res) => {
    try{
        const {fullname,email,phoneNumber,bio, skills}= req.body;
        const file=req.files;



         if(!fullname || !email || !phoneNumber || !bio|| !skills){
            return res.status(400).json({
                message:"All fields are required",
                success: false,
            });
        }


//cloudinary upload




    const skillsArray=skills.split(",");
    const userId=req.userId;//middleware
    let user=await User.findById(userId);
    if(!user){
        return res.status(404).json({
            message:"User not found",
            success: false,
        });

    }

user.fullname=fullname;
user.email=email;
user.phoneNumber=phoneNumber;
user.profile = user.profile || {};
user.profile.bio=bio;
user.profile.skills=skillsArray;
//resume file
await user.save();
user={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phonenumber:user.phoneNumber,
    role:user.role,
    profile:user.profile,
};
return res.status(200).json({
    message:"Profile updated successfully",
    user,
    success: true,  
    });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({
            message:"Something went wrong in update profile",
            success: false,
        });
    }
};