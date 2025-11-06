import express from 'express'
import path from 'path'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { userRouter } from './routes/user.js';
import { cheackForAuthentication } from './middlewares/authentication.js';

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/SS22Blogs" ).then(
    console.log("Mongodb Connected Successfully")
).catch((err)=>{
    console.log("OOPS!!! some error connecting to mongodb")
})

app.set('view engine' , 'ejs')
app.set('views' , path.resolve("./views"))

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(cheackForAuthentication("token"))


app.get("/" , (req , res)=>{
    // console.log(req.user)
    return res.render("home" ,{user : req.user})
    // console.log("Hi there ,this is sourav's Blog");
})

app.use('/user', userRouter);

app.listen(PORT , ()=>{
    console.log("Server running on port" , PORT);
})