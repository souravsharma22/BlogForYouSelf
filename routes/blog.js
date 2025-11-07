import { Router } from "express";
import multer from "multer";
import path from 'path'

import { blog } from "../models/blog.js";
import { comment } from "../models/comment.js";


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

//rendering new Created blog
blogRouter.get("/:id" ,async (req , res)=>{
	// console.log(req.params.id)
  	const newBlog = await blog.findById(req.params.id).populate('owner');
	const allcomments = await comment.find({blogId : req.params.id}).populate('createdBy')

	// console.log(allcomments);

  res.render('blog' , { user: req.user ,blog : newBlog, comments : allcomments});
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

//commenting on a blog

blogRouter.post("/comment/:blogId" , async (req, res)=>{
		const newComment =  await comment.create({
			content : req.body.content,
			blogId : req.params.blogId,
			createdBy : req.user._id
		})
		res.redirect(`/blog/${req.params.blogId}`)
})


export { blogRouter}