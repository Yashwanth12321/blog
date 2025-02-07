import jwt from "jsonwebtoken";
import User from "./user";
import { Request, Response, NextFunction } from 'express';

const authenticateUser = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(token)
  if (!token) {
    return res.status(404).send('unauthorized')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("expired",decoded)
    if (typeof decoded !== 'string' && 'userId' in decoded) {
      const userId = decoded.userId;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      console.log(user)
      req.body.userId= user._id;
      next();
    } else {
      throw new Error('Invalid payload type');
    }
  } catch (err) {
    console.log(err)
  }
}

export default authenticateUser;