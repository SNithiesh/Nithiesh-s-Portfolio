import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to THIS folder so Next.js ignores stray lockfiles
  // elsewhere (e.g. a leftover package-lock.json in your home directory).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
