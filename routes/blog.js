import { Router } from "express";
import multer from "multer";
import path from 'path'

import { blog } from "../models/blog.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}_${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })



const blogRouter = Router();


blogRouter.get("/addnew" , (req, res)=>{
    res.render('addBlog');
})

blogRouter.post("/addnew" , upload.single('coverImage') , async (req , res)=>{
    // console.log(req.body);
    // console.log(req.file);

    const newBlog = await blog.create({
        title: req.body.blogTitle,
        body : req.body.body,
        coverImageURL : `/uploads/${req.file.filename}`,
        owner : req.user._id

    })
    res.redirect(`/blog/${newBlog._id}`);
})

export { blogRouter}