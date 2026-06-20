import { about, education, skills } from "@/content/projects";
export default function About() {
  return (
    <section id="about">
      <div className="sec-head reveal"><span className="idx">/01</span><h2>About.</h2></div>
      <div className="about-grid">
        <div className="reveal">
          <div className="role-card glass">
            <span className="mono">Current Focus</span>
            <h3>{about.title}</h3>
            <span className="company">{about.company}</span>
            <p>{about.bio}</p>
          </div>
          <div className="role-card glass" style={{ marginTop: 16 }}>
            <span className="mono">Education</span>
            {education.map((e) => (
              <div key={e.degree}>
                <h3 style={{ fontSize: 21, marginTop: 12 }}>{e.degree}</h3>
                <span className="company">{e.school}</span>
                <div className="mono" style={{ marginTop: 6 }}>{e.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="skill-cols reveal">
          {skills.map((s) => (
            <div className="skill-block glass" key={s.title}>
              <h4>{s.title}</h4>
              <ul>{s.items.map((i) => (<li key={i}>{i}</li>))}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
