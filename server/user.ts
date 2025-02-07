import mongoose from "mongoose";

const userschema= new mongoose.Schema({
    _id:String,
    name:String,
    email:String,
    password:String,
    authorId:String
})

export default mongoose.model('User',userschema);