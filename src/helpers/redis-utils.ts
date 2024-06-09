import client from "../service/redisClient.js";

export async function redisSet(key: string, value: any) {
  try {
    const val = typeof value === "string" ? value : JSON.stringify(value);
    await client.set(key, val);
  } catch (err: unknown) {
    return Promise.resolve();
  }
}

export async function redisGet<T>(key: string): Promise<T | null> {
  try {
    const data = await client.get(key);
    if (data) {
      const val = JSON.parse(data!);
      return val as T;
    } else return null;
  } catch (err) {
    return Promise.resolve(null);
  }
}

export async function redisHSet<T extends Record<string, any>>(key: string, value: T) {
  try {
    await client.hset(key, value);
    return Promise.resolve(true);
  } catch (err) {
    return Promise.resolve(false);
  }
}

export async function redisHGetAll<T = Record<string, any>>(key: string): Promise<T | null> {
  try {
    const data = await client.hgetall(key);
    if (!Object.keys(data).length) return Promise.resolve(null);
    return data as T;
  } catch (err) {
    return Promise.resolve(null);
  }
}
