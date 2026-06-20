import { stack } from "@/content/projects";
export default function Stack() {
  return (
    <section id="stack">
      <div className="sec-head reveal"><span className="idx">/02</span><h2>Stack.</h2></div>
      <div className="stack-grid reveal">
        {stack.map((s) => (
          <div className="stack-col glass" key={s.title}>
            <h4>{s.title}</h4>
            {s.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}
          </div>
        ))}
      </div>
    </section>
  );
}
