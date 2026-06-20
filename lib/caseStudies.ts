import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseMeta = {
  slug: string; title: string; summary: string; cat: string;
  date: string; tags: string[]; repo: string;
};

export function getCaseSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export function getCase(slug: string): { meta: CaseMeta; content: string } | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: { slug, ...(data as Omit<CaseMeta, "slug">) }, content };
}

export function getAllCases(): CaseMeta[] {
  return getCaseSlugs()
    .map((s) => getCase(s)!.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
