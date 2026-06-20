import { site } from "@/config/site";
import { heroMeta } from "@/content/projects";
export default function Hero() {
  return (
    <header id="home">
      <div className="hero">
        <div className="eyebrow reveal"><span className="dot" /><span className="mono">{site.role}</span></div>
        <div className="status reveal"><span className="pulse" />Available for opportunities</div>
        <h1 className="reveal">S. <span className="grad">Nithiesh</span></h1>
        <p className="hero-sub reveal">{site.pitch}</p>
        <div className="hero-cta reveal">
          <a className="btn btn-primary" href="#work">View Work</a>
          <a className="btn btn-ghost" href={site.resumeUrl} target="_blank" rel="noreferrer">Download Résumé ↗</a>
        </div>
        <div className="hero-meta reveal">
          {heroMeta.map((m) => (<div className="cell glass" key={m.k}><span className="mono">{m.k}</span><div className="v">{m.v}</div></div>))}
        </div>
      </div>
    </header>
  );
}
