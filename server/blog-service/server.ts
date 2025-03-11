import express from 'express';
import Blog from './blog';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import zod from 'zod';

// jwt validation
const authenticate = (req:any, res:any, next:any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      console.log(decoded)
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
dotenv.config();

const app =express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

const blogSchema = zod.object({
    _id: zod.string(),
    title: zod.string(),
    brief: zod.string(),
    content: zod.string(),
    authorId: zod.string(),
    authorName: zod.string(),
    createdAt: zod.date(),
})





async function mongooseConnect() {
    const mongoUrl = process.env.MONGO_DB_URL;
    if (!mongoUrl) {
        throw new Error('MONGO_DB_URL is not defined');
    }
    try {
        await mongoose.connect(mongoUrl);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit the process if the DB connection fails
    }
}

mongooseConnect();






app.get('/api/test', (req, res) => {
    const request = req;
    res.send('Hello World'+ request);
});


app.get('/api/blog/getblog/:id', authenticate, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id); 
        if (!blog) {
            res.status(404).json({ message: "Blog not found" }); 
        }

        res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
});


app.get('/api/blog/getblogs', authenticate, (req,res)=>{
    try{
        const blogs= Blog.find();
        const descending= blogs.sort({ createdAt: -1 });
        descending.then((data)=>{
            res.status(200).send(data);
        })
    }catch(err){
        res.status(500).send(err);
    }
})

app.get('/api/blog/userblogs', authenticate, (req,res)=>{
    try{
        const userId=req.body.userId;
        console.log(userId);
        const blogs= Blog.find({ authorId: userId });
        const descending= blogs.sort({ createdAt: -1 });
        descending.then((data)=>{
            if(data.length===0){
                res.status(200).send("No posts");
            }else{
                res.status(200).send(data);
            }
        })
    }catch(err){
        res.status(500).send(err);
    }
})


app.post('/api/blog/createblog', authenticate, (req,res)=>{

    const request=(req.body)

    const data=request;
    data.authorId=req.body.userId;
    const blog=createBlog(data);
    console.log(blog);
    res.status(200).send("blog created successfully");
})


app.listen(5001, () => {
    console.log('Server started on port 5001');
});

async function createBlog(data: any) {

    const blog = new Blog(data);
    try {
        await blog.save();
        console.log('Blog created successfully');
        return blog;
    } catch (err) {
        console.error('Error creating blog:', err);
        throw err;
    }
}
