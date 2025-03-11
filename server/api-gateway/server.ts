import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import Redis from "ioredis";

const app = express();
app.use(express.json());
app.use(require("cors")());

const redisClient = new Redis({
  host: "redis", //redis 
  port: 6379
});

redisClient.on("connect", () => {
  console.log("Connected to Redis on port 6379");
});



const customRateLimiter = (windowMs:any, maxRequests:any) => {
  return async (req:any, res:any, next:any) => {
    const realIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress; // Get real IP
    const key = `rate_limit:${realIp}`;

    const currentRequests = await redisClient.get(key) || 0; 
    console.log(`🔹 IP: ${realIp} | Requests: ${currentRequests}`);

    if (currentRequests && currentRequests >= maxRequests) {
      return res.status(429).json({ message: "Too many requests, try again later." });
    }

    await redisClient.incr(key); // Increment request count
    await redisClient.expire(key, windowMs / 1000); // Set expiration time
    next();
  };
};



app.get("/", (req, res) => {
  res.send("API Gateway running on port 4000");
});

app.listen(4000, () => console.log("API Gateway running on port 4000"));
