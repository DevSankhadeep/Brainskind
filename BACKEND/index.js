import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';   
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.routes.js';
import jobRoute from './routes/job.route.js';
dotenv.config();
const app = express();
      
   

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const corsOptions = {
    origin: ['http://localhost:5121'], // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
const PORT=process.env.PORT || 5001;

//API'S
app.use('/api/users',userRoutes); //localhost:5000/api/users/register
app.use('/api/company',companyRoute);
app.use("/api/job", jobRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`)
});
