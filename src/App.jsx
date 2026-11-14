import { EDUCATION, EXPERIENCE, LINKS, NAV, NOTES, PORTRAIT, PROJECTS, STACK, STATS } from "./content.js";

const FEATURED = PROJECTS.filter((p) => p.featured);
const INDEX = PROJECTS.filter((p) => !p.featured);
const pad = (n) => String(n).padStart(2, "0");

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

/** Mono section marker, e.g. "01 / Selected systems", with a rule running to the edge. */
const Marker = ({ num, children }) => (
  <p className="marker"><span>{num}</span>{children}<i aria-hidden /></p>
);

function Nav() {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Site">
        <a href="#top" className="nav__brand">LO</a>
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
      <div className="wrap">
        <p className="hero__meta">
          <span>Machine learning engineer</span>
          <span>Health robotics R&amp;D</span>
          <span>Vancouver, BC</span>
        </p>
        <h1 className="hero__name">Lawrence Okolo</h1>
        <div className="hero__grid">
          <div>
            <p className="hero__statement">
              I build AI that helps robots <em>understand the world</em> they work in.
            </p>
            <p className="hero__lead">
              Seven years of production machine learning, from demand forecasting and visual search to LLM agents.
              Today I build autonomous hospital robots and the spatial AI behind them at VASI.
            </p>
            <div className="hero__actions">
              <a href="#work" className="btn">See the work</a>
              <External href={LINKS.github} className="btn btn--ghost">GitHub</External>
            </div>
          </div>
          <figure className="hero__portrait">
            <img src={PORTRAIT.src} alt={PORTRAIT.alt} width={900} height={1350} fetchPriority="high" />
            <figcaption>{PORTRAIT.caption}<small>{PORTRAIT.credit}</small></figcaption>
          </figure>
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

function Featured({ p, n }) {
  return (
    <article id={p.id} className="feature">
      <header className="feature__head">
        <span className="feature__code">SYS.{pad(n)}</span>
        <p className="feature__kicker">{p.kicker}</p>
        <h3>{p.title}</h3>
      </header>
      <div className="feature__grid">
        <figure className={`feature__visual ${p.photo ? "feature__visual--photo" : ""}`}>
          <img src={p.visual} alt={p.title} loading="lazy" decoding="async" />
          {p.caption && <figcaption>{p.caption}</figcaption>}
        </figure>
        <dl className="spec">
          <div>
            <dt>What</dt>
            <dd>{p.summary}</dd>
          </div>
          <div>
            <dt>Highlights</dt>
            <dd>
              <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd className="spec__mono">{p.stack.join(" / ")}</dd>
          </div>
          <div>
            <dt>Links</dt>
            <dd className="spec__links">
              {p.links.map((l) => <External key={l.href} href={l.href}>{l.label}</External>)}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function IndexRow({ p, n }) {
  return (
    <details className="row">
      <summary>
        <span className="row__num">{pad(n)}</span>
        <span className="row__title">{p.title}</span>
        <span className="row__line">{p.line}</span>
        <span className="row__stack">{p.stack.slice(0, 3).join(" / ")}</span>
        <span className="row__toggle" aria-hidden />
      </summary>
      <div className="row__body">
        <p>{p.summary}</p>
        <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        <div className="spec__links">
          {p.links.map((l) => <External key={l.href} href={l.href}>{l.label}</External>)}
        </div>
      </div>
    </details>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <Marker num="01">Selected systems</Marker>
        <h2 className="section__title">Two systems I'm building now.</h2>
        <div className="features">
          {FEATURED.map((p, i) => <Featured key={p.id} p={p} n={i + 1} />)}
        </div>

        <Marker num="02">Index</Marker>
        <h2 className="section__title">More shipped work.</h2>
        <div className="index">
          {INDEX.map((p, i) => <IndexRow key={p.id} p={p} n={FEATURED.length + i + 1} />)}
        </div>
      </div>
    </section>
  );
}

function Notes() {
  return (
    <section id="notes" className="section section--notes">
      <div className="wrap">
        <Marker num="03">Field notes</Marker>
        <h2 className="section__title">Recently, in the lab and on stage.</h2>
        <ol className="notes">
          {NOTES.map((n) => (
            <li key={n.title}>
              <time className="notes__date">{n.date}</time>
              <div>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section--tint">
      <div className="wrap">
        <Marker num="04">Experience</Marker>
        <h2 className="section__title">Where I've done the work.</h2>
        <ol className="cv">
          {EXPERIENCE.map((e) => (
            <li key={e.org + e.period}>
              <span className="cv__period">{e.period}</span>
              <span className="cv__org">{e.org}</span>
              <span className="cv__role">{e.role}</span>
              <p className="cv__body">{e.body}</p>
            </li>
          ))}
          <li>
            <span className="cv__period">Education</span>
            <span className="cv__org">{EDUCATION.school}</span>
            <span className="cv__role">{EDUCATION.degree}</span>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <Marker num="05">Stack</Marker>
        <dl className="stack">
          {STACK.map((g) => (
            <div key={g.cat}>
              <dt>{g.cat}</dt>
              <dd>{g.items.join(" / ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="hero__glow" aria-hidden />
      <div className="wrap">
        <Marker num="06">Contact</Marker>
        <p className="contact__lead">Building something with robots or AI?</p>
        <a href={`mailto:${LINKS.email}`} className="contact__email">{LINKS.email}</a>
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
        <Notes />
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
