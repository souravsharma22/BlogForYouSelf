import mongoose, { Schema } from "mongoose";

const commentSchema  = new mongoose.Schema({
    content :{
        type : String,
        required : true
    },
    blogId: {
        type : Schema.Types.ObjectId,
        ref : 'blog'
    },

    createdBy:{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
})

const comment = mongoose.model('comment', commentSchema)


export {comment}