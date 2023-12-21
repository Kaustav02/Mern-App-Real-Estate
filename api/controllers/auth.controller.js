import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs'
import { error_handler } from "../utils/error.js";



export const signup = async (req,res,next)=>{
    const {username , email , password} = req.body;
    const hashed_password = bcryptjs.hashSync(password,5);
    const newUser = new User({username,email,password:hashed_password});
    try {
        await newUser.save();
        res.status(201).json('user created successfully');
    } catch (error) {
        next(error_handler(500,'Internal server error'));
    }
};


