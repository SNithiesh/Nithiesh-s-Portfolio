/**
 * Tiny KV layer. Uses Upstash Redis (REST) when configured, otherwise an
 * in-memory store so the app builds and runs locally with zero setup.
 * In-memory data is per-instance and NOT persistent — set the env vars for real storage.
 *   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 */
const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
export const kvConfigured = Boolean(URL && TOKEN);

// in-memory fallback
const mem: Record<string, unknown> = {};

async function cmd<T = unknown>(command: (string | number)[]): Promise<T> {
  if (kvConfigured) {
    const res = await fetch(URL!, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      cache: "no-store",
    });
    const data = await res.json();
    return data.result as T;
  }
  // emulate the handful of commands we use
  const [op, key, ...rest] = command as [string, string, ...string[]];
  if (op === "INCR") { mem[key] = ((mem[key] as number) ?? 0) + 1; return mem[key] as T; }
  if (op === "GET") { return ((mem[key] as number) ?? 0) as T; }
  if (op === "LPUSH") { const arr = (mem[key] as string[]) ?? []; arr.unshift(rest[0]); mem[key] = arr; return arr.length as T; }
  if (op === "LRANGE") { const arr = (mem[key] as string[]) ?? []; return arr.slice(Number(rest[0]), rest[1] === "-1" ? undefined : Number(rest[1]) + 1) as T; }
  return null as T;
}

export const kv = {
  incr: (key: string) => cmd<number>(["INCR", key]),
  get: (key: string) => cmd<number>(["GET", key]),
  lpush: (key: string, val: string) => cmd<number>(["LPUSH", key, val]),
  lrange: (key: string, start = 0, stop = 49) => cmd<string[]>(["LRANGE", key, start, stop]),
};
