import moongoose from 'mongoose';

const blogschema= new moongoose.Schema({
    _id:String,
    title:String,
    brief:String,
    content:String,
    createdAt:Date,
    authorId:String,
    authorName:String
})

export default moongoose.model('Blog',blogschema);