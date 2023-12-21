import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/User.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();


mongoose.connect(process.env.url).then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(error);
} 
);   

const app = express();
app.use(express.json())
const port = 3000;

app.listen(port,()=>{
    console.log("server is running on port number !!! " , port);
});

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const status_code = err.status_code || 500;
    const msg = err.message || 'Internal Server Error';

    return res.status(status_code).json({
        succuess:false,
        status_code,
        msg
    });
});