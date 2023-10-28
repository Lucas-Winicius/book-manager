import { createClient } from "redis";

const cacheDatabase = createClient({
  url: process.env.REDIS_URL,
});

cacheDatabase.on("error", (err) => console.log("Redis Client Error", err));
cacheDatabase.on("connect", () => console.log("Redis connected"));

cacheDatabase.connect();

export default cacheDatabase;
