import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import { getCase, getCaseSlugs } from "@/lib/caseStudies";

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: `${c.meta.title} | S. Nithiesh`, description: c.meta.summary };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return (
    <>
      <Nav />
      <main className="wrap" id="main">
        <article className="case glass" style={{ marginTop: 130, padding: 48 }}>
          <div className="cat">{c.meta.cat}</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,6vw,56px)", fontWeight: 360, letterSpacing: "-.02em", margin: "8px 0 10px" }}>{c.meta.title}</h1>
          <div className="ptags">{c.meta.tags.map((t) => (<span className="ptag" key={t}>{t}</span>))}</div>
          <div className="case-body">
            <MDXRemote source={c.content} />
          </div>
          <div style={{ marginTop: 30, display: "flex", gap: 18 }}>
            <a className="mono" href={c.meta.repo} target="_blank" rel="noreferrer">View repo ↗</a>
            <Link className="mono" href="/case">← all case studies</Link>
          </div>
        </article>
      </main>
      <CommandPalette />
    </>
  );
}
