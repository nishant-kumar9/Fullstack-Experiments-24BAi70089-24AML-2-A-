import app from "../src/app.js";
import { connectRedis } from "../src/config/redis.js";

let redisConnected = false;

export default async function handler(req, res) {
  if (!redisConnected) {
    await connectRedis();
    redisConnected = true;
  }

  return app(req, res);
}   