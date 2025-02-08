import express from 'express';
import Blog from './blog';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './userauth';
import authenticateUser from './authenticateuser';

dotenv.config();

const app =express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api',userRouter)



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


app.get('/api/blog/getblog/:id',authenticateUser, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id); // ✅ Await the result

        if (!blog) {
            res.status(404).json({ message: "Blog not found" }); // ✅ Handle non-existent blog
        }

        res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
});


app.get('/api/blog/getblogs',authenticateUser,(req,res)=>{
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

app.get('/api/blog/userblogs',authenticateUser,(req,res)=>{
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


app.post('/api/blog/createblog',authenticateUser,(req,res)=>{
    const request = req;
    console.log(request.body)
    const data=request.body;
    data.authorId=req.body.userId;
    const blog=createBlog(data);
    console.log(blog);
    res.status(200).send("blog created successfully");
})

app.use('/api/auth', userRouter);

app.listen(5000, () => {
    console.log('Server started on port 5000');
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
