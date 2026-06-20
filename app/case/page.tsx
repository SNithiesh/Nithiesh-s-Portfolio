import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import CommandPalette from "@/components/CommandPalette";
import { getAllCases } from "@/lib/caseStudies";

export const metadata: Metadata = { title: "Case Studies | S. Nithiesh", description: "Deep dives into selected AI/ML and quantitative projects." };

export default function CaseIndex() {
  const cases = getAllCases();
  return (
    <>
      <Nav />
      <main className="wrap" id="main">
        <section style={{ paddingTop: 140 }}>
          <div className="sec-head reveal"><span className="idx">/ writing</span><h2>Case Studies.</h2></div>
          <div className="proj-grid reveal">
            {cases.map((c) => (
              <Link key={c.slug} className="proj glass" href={`/case/${c.slug}`}>
                <div className="cat">{c.cat}</div>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                <div className="ptags">{c.tags.map((t) => (<span className="ptag" key={t}>{t}</span>))}</div>
                <div className="foot"><span className="achieve">Read case study</span></div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 30 }}><Link href="/" className="mono">← back home</Link></p>
        </section>
      </main>
      <Reveal />
      <CommandPalette />
    </>
  );
}
