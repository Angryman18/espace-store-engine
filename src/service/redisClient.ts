import { Redis } from "ioredis";

const client = new Redis();

client.on("connect", () => console.log("Redis is connected!"));
client.on("error", () => console.log("Redis Error!!"));

export default client;
