import { experience } from "@/content/projects";
export default function Experience() {
  return (
    <section id="experience">
      <div className="sec-head reveal"><span className="idx">/03</span><h2>Experience.</h2></div>
      <div className="reveal">
        {experience.map((e) => (
          <div className="exp-item glass" key={e.role}>
            <div className="date">{e.date}</div>
            <h3>{e.role}</h3>
            <div className="loc">{e.org}</div>
            <p>{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
