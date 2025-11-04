import {Router} from 'express';
import { user } from '../models/user.js';

const userRouter = Router();

userRouter.get('/signup' , (req,res)=>{
    return res.render('signup');
})

userRouter.get("/signin" , (req,res)=>{
    return res.render('signin');
})

userRouter.post("/signup" ,async (req,res)=>{
    const {name ,email , password} = req.body;
    user.create({
        name : name,
        email: email,
        password : password
    })

    res.redirect("/");
})
userRouter.post("/signin" , async (req , res)=>{
    const {email , password} =req.body;
    const currUser = await user.matchPassword(email, password);
    console.log(currUser);

    return res.redirect("/")
})

export {userRouter}