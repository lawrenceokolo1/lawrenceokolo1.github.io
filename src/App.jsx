import Visual from "./Visual.jsx";
import { EDUCATION, EXPERIENCE, LINKS, NAV, PROJECTS, STACK, STATS } from "./content.js";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M4 10L10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const External = ({ href, children, className = "link" }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children} <Arrow />
  </a>
);

function Nav() {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Site">
        <a href="#top" className="nav__brand">Lawrence Okolo</a>
        {NAV.map(({ label, href }) => (
          <a key={href} href={href} className="nav__link">{label}</a>
        ))}
        <a href="#contact" className="nav__cta">Let's talk</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden />
      <div className="wrap hero__inner">
        <p className="eyebrow">Machine learning engineer · Vancouver, BC</p>
        <h1 className="hero__title">
          I build AI that helps robots <span>understand the world</span> they work in.
        </h1>
        <p className="hero__lead">
          Seven years of production machine learning, from demand forecasting and visual search to LLM agents.
          Today I build autonomous hospital robots and the spatial AI behind them at VASI.
        </p>
        <div className="hero__actions">
          <a href="#work" className="btn">See my work</a>
          <External href={LINKS.github} className="btn btn--ghost">GitHub</External>
        </div>
        <dl className="stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Project({ p, index }) {
  return (
    <article className={`project ${index % 2 ? "project--flip" : ""}`}>
      <div className={`project__visual ${p.visual.startsWith("/") ? "project__visual--shot" : ""}`}>
        <Visual visual={p.visual} title={p.title} />
      </div>
      <div className="project__body">
        <p className="eyebrow">{String(index + 1).padStart(2, "0")} · {p.kicker}</p>
        <h3>{p.title}</h3>
        <p className="project__summary">{p.summary}</p>
        <ul className="project__points">
          {p.points.map((pt) => <li key={pt}>{pt}</li>)}
        </ul>
        <ul className="tags">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="project__links">
          {p.links.map((l) => <External key={l.href} href={l.href}>{l.label}</External>)}
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <header className="section__head">
          <p className="eyebrow">Selected work</p>
          <h2>Things I've built and shipped.</h2>
        </header>
        <div className="projects">
          {PROJECTS.map((p, i) => <Project key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section--tint">
      <div className="wrap split">
        <header className="section__head">
          <p className="eyebrow">Experience</p>
          <h2>Where I've done the work.</h2>
          <p className="section__note">
            {EDUCATION.degree}<br />{EDUCATION.school}
          </p>
        </header>
        <ol className="timeline">
          {EXPERIENCE.map((e) => (
            <li key={e.org + e.period}>
              <span className="timeline__period">{e.period}</span>
              <div>
                <h3>{e.org} <span>· {e.role}</span></h3>
                <p>{e.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <header className="section__head">
          <p className="eyebrow">Stack</p>
          <h2>Tools I reach for.</h2>
        </header>
        <div className="stack">
          {STACK.map((g) => (
            <div key={g.cat} className="stack__group">
              <h3>{g.cat}</h3>
              <ul className="tags">
                {g.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__glow" aria-hidden />
      <div className="wrap contact__inner">
        <p className="eyebrow">Contact</p>
        <h2>Building something with robots or AI? Let's talk.</h2>
        <a href={`mailto:${LINKS.email}`} className="btn">{LINKS.email}</a>
        <div className="contact__links">
          <External href={LINKS.linkedin}>LinkedIn</External>
          <External href={LINKS.github}>GitHub</External>
          <External href={LINKS.huggingface}>Hugging Face</External>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Lawrence Okolo</span>
        <span>Vancouver, British Columbia</span>
      </footer>
    </>
  );
}
