import express, { Request, Response } from "express";  // Correct import for express
import User from "./user";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = express.Router();




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






const generateAccessToken = (user: any) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '20d' });
}
const generateRefreshToken = (user: any) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '90d' });
  };

userRouter.post('/register', async (req: Request, res: Response) => {
    console.log(req.body);
    const { _id,name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log("exists")
            res.status(400).send('User already exists');
        }else{
        const newUser = new User({ _id, name, email, password });
        await newUser.save().then(() => console.log('user created successfully')).catch((err: any) => console.log(err));
        const accessToken = generateAccessToken(newUser);
        console.log(accessToken);
        const refreshToken = generateRefreshToken(newUser);

        res.status(200).send({ user: newUser, accessToken, refreshToken });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

userRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send('no email found');
        }
        else if (user.password !== password) {
            res.status(401).send('Invalid password');
        }
        else {
            const accessToken = generateAccessToken(user);
            console.log(accessToken);

            const refreshToken = generateRefreshToken(user);
            console.log("user logged in", user._id)
            res.status(200).send({ user, accessToken, refreshToken });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

userRouter.post('/refresh', async (req: Request, res: Response) => {
    const {refreshToken} = req.body;
    if(!refreshToken){
        res.status(401).send('refresh token not found');
    }
    else{
        try{
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!);  
            if (typeof decoded !== 'string' && 'userId' in decoded) {
                const userId = decoded.userId;
                const user = await User.findById(userId);
                if (!user) {
                  throw new Error('User not found');
                }
                req.body.userId= user.authorId;
                console.log(req.body)
                const accessToken = generateAccessToken(user);
                res.status(200).send({ user, accessToken });
              } else {
                throw new Error('Invalid payload type');
              }
        }
        catch(err){
            res.status(401).send('invalid refresh token');
        }
    }
})

app.use('/api/auth', userRouter);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});






