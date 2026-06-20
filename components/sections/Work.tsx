import Link from "next/link";
import { projects } from "@/content/projects";

export default function Work() {
  return (
    <section id="work">
      <div className="sec-head reveal"><span className="idx">/04</span><h2>Selected Work.</h2></div>
      <div className="proj-grid reveal">
        {projects.map((p: any, i: number) => {
          const inner = (
            <>
              <span className="pidx">/0{i + 1}</span>
              <div className="cat">{p.cat}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="ptags">{p.tags.map((t: string) => (<span className="ptag" key={t}>{t}</span>))}</div>
              <div className="foot">
                <span className="achieve">{p.caseSlug ? "Read case study" : p.achieve}</span>
                <span className="repo">{p.repo} ↗</span>
              </div>
            </>
          );
          return p.caseSlug ? (
            <Link className="proj glass" href={`/case/${p.caseSlug}`} key={p.name}>{inner}</Link>
          ) : (
            <a className="proj glass" href={p.url} target="_blank" rel="noreferrer" key={p.name}>{inner}</a>
          );
        })}
      </div>
    </section>
  );
}
