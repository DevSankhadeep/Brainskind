import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';   
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import jobRoute from './routes/job.route.js';
import companyRoute from './routes/company.route.js';
import applicationRoute from './routes/application.route.js';
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
app.use('/api/job', jobRoute);
app.use('/api/application', applicationRoute);

// Connect to DB first, then start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database, exiting.', err);
        process.exit(1);
    });
