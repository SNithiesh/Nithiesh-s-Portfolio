import { site } from "@/config/site";
import { about, education, skills, experience, projects } from "@/content/projects";

/**
 * The whole portfolio is only a few KB of text, so the simplest correct
 * "RAG" is to put all of it in the model's context. When your content grows
 * (e.g. long MDX case studies), swap this for embeddings + a vector store.
 */
export function buildPortfolioContext(): string {
  const lines: string[] = [];
  lines.push(`Name: ${site.name}. Role: ${site.role}. Location: ${site.location}.`);
  lines.push(`Summary: ${site.pitch}`);
  lines.push(`About: ${about.bio}`);
  lines.push(`Education: ${education.map(e => `${e.degree} — ${e.school} (${e.detail})`).join("; ")}`);
  lines.push(`Skills: ${skills.map(s => `${s.title}: ${s.items.join(", ")}`).join(" | ")}`);
  lines.push(`Experience: ${experience.map(e => `${e.role} at ${e.org} (${e.date}) — ${e.desc}`).join(" | ")}`);
  lines.push(`Projects: ${projects.map(p => `${p.name} [${p.cat}] — ${p.desc} (tech: ${p.tags.join(", ")}; ${p.url})`).join(" | ")}`);
  lines.push(`Contact: ${site.email}, GitHub ${site.socials.github}, LinkedIn ${site.socials.linkedin}.`);
  return lines.join("\n");
}
