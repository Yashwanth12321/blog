import express, { Request, Response } from "express";  // Correct import for express
import User from "./user";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

const generateAccessToken = (user: any) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '20d' });
}
const generateRefreshToken = (user: any) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '90d' });
  };

userRouter.post('/register', async (req: Request, res: Response) => {
    const { _id,name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log("exists")
            res.status(400).send('User already exists');
        }else{
        const newUser = new User({ _id, name, email, password });
        await newUser.save().then(() => console.log('user created successfully')).catch((err) => console.log(err));
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


export default userRouter;
