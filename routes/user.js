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
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const currUserToken = await user.matchPasswordAndGenerateToken(email, password);
        // console.log(currUser);
        res.cookie('token', currUserToken)

        return res.redirect("/")
    } catch (err) {
        res.render('signin', { error: "Invalid UserName or Password" })
    }
})

userRouter.get("/logout" , (req, res)=>{
    res.clearCookie('token');
    return res.redirect("/");
})

export {userRouter}