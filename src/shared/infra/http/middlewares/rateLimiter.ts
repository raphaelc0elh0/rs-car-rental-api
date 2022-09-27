import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "../../../errors/AppError";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "limiter",
  points: 10,
  duration: 5,
});

const rateLimiter = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await limiter.consume(request.ip);
    next();
  } catch (error) {
    console.log(error);
    throw new AppError("Too many requests", 429);
  }
};

export { rateLimiter };
