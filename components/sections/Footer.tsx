import { site } from "@/config/site";
import { contact } from "@/content/projects";
import ViewCounter from "@/components/ViewCounter";
export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-glass glass">
          <div className="foot-grid">
            <div>
              <h3>S. Nithiesh.</h3>
              <p>Leveraging mathematical rigor to build intelligent, GenAI-driven solutions.</p>
            </div>
            <div className="foot-col"><h5>Index</h5><a href="#home">/ Home</a><a href="#work">/ Work</a><a href="#ask">/ Ask AI</a><a href="#contact">/ Contact</a></div>
            <div className="foot-col"><h5>Socials</h5>
              {contact.filter((c) => c.label !== "Phone").map((c) => (<a key={c.label} href={c.href} target="_blank" rel="noreferrer">{c.label.toUpperCase()} ↗</a>))}
            </div>
          </div>
          <div className="foot-bottom"><span>© 2026 // Nithiesh</span><ViewCounter /><span>Mathematical rigor, intelligently applied.</span></div>
        </div>
      </div>
    </footer>
  );
}
