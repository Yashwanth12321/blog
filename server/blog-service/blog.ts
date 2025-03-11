import mongoose from 'mongoose';

const blogschema= new mongoose.Schema({
    _id:String,
    title:String,
    brief:String,
    content:String,
    createdAt:Date,
    authorId:String,
    authorName:String
})

export default mongoose.model('Blog',blogschema);