import HeroScan from "./HeroScan.jsx";
import {
  BACKERS, EDUCATION, EXPERIENCE, LINKS, MISSION, NAV, NOTES, PARTNERS, PORTRAIT, PROJECTS, STACK, STATS,
} from "./content.js";

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

/** Mono section marker, e.g. "02 / Selected systems", with a rule running to the edge. */
const Marker = ({ num, children }) => (
  <p className="marker"><span>{num}</span>{children}<i aria-hidden /></p>
);

function Nav() {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Site">
        <a href="#top" className="nav__brand" aria-label="Lawrence Okolo, back to top">
          <img src="/img/avatar.webp" alt="" width={36} height={36} />
        </a>
        {NAV.map(({ label, href }) => (
          <a key={href} href={href} className="nav__link">{label}</a>
        ))}
        <a href="#partner" className="nav__cta">Work with me</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <HeroScan />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__meta">
            <span>Lawrence Okolo</span>
            <span>Health robotics R&amp;D · VASI Systems</span>
            <span>Vancouver, BC</span>
          </p>
          <h1 className="hero__title">{MISSION.statement}</h1>
          <p className="hero__lead">
            I'm Lawrence Okolo, a machine learning engineer building the spatial intelligence and robots that let
            autonomous systems work inside hospitals.
          </p>
          <div className="hero__actions">
            <a href="#partner" className="btn">Partner with me</a>
            <a href="#work" className="btn btn--ghost">See the work</a>
          </div>
        </div>
        {/* Portrait framed as a camera feed, with a detection box: a nod to the vision work. */}
        <figure className="feed">
          <img src={PORTRAIT.src} alt={PORTRAIT.alt} width={900} height={1350} fetchPriority="high" />
          <span className="feed__box" aria-hidden><b>person · l.okolo</b></span>
          <span className="feed__rec" aria-hidden>CAM 01 · LIVE</span>
          <figcaption>{PORTRAIT.caption} · {PORTRAIT.credit}</figcaption>
        </figure>
      </div>
      <div className="wrap">
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

function Mission() {
  return (
    <section id="mission" className="section">
      <div className="wrap">
        <Marker num="01">The mission</Marker>
        <div className="mission__intro">
          <h2 className="section__title">Map. Understand. Act.</h2>
          <p className="mission__body">{MISSION.body}</p>
        </div>
        <ol className="stages">
          {MISSION.stages.map((st) => (
            <li key={st.num}>
              <span className="stages__num">{st.num}</span>
              <h3>{st.title}</h3>
              <p>{st.body}</p>
              <a href={st.proof.href} className="link">{st.proof.label}</a>
            </li>
          ))}
        </ol>
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
    <details id={p.id} className="row">
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
    <section id="work" className="section section--tint">
      <div className="wrap">
        <Marker num="02">Selected systems</Marker>
        <h2 className="section__title">The systems behind the mission.</h2>
        <div className="features">
          {FEATURED.map((p, i) => <Featured key={p.id} p={p} n={i + 1} />)}
        </div>
        <Marker num="03">Index</Marker>
        <h2 className="section__title">More shipped work.</h2>
        <div className="index">
          {INDEX.map((p, i) => <IndexRow key={p.id} p={p} n={FEATURED.length + i + 1} />)}
        </div>
      </div>
    </section>
  );
}

function Partner() {
  return (
    <section id="partner" className="partner">
      <HeroScan />
      <div className="wrap">
        <Marker num="04">Partner with me</Marker>
        <div className="partner__intro">
          <h2 className="section__title">Let's put robots to work where they matter.</h2>
          <p>
            I'm looking for people who want to build this with me: the facilities that need it, the companies whose
            hardware can run it, and the researchers pushing what's possible.
          </p>
        </div>
        <ul className="partners">
          {PARTNERS.map((pt, i) => (
            <li key={pt.who}>
              <span className="partners__num">{pad(i + 1)}</span>
              <h3>{pt.who}</h3>
              <p>{pt.body}</p>
              <a href={pt.href} className="partners__cta">{pt.cta} <Arrow /></a>
            </li>
          ))}
        </ul>
        <div className="backers">
          <span>VASI is supported by</span>
          {BACKERS.map((b) => (
            <span key={b.name} className="backers__tile">
              <img src={b.src} alt={b.name} loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Notes() {
  return (
    <section id="notes" className="section">
      <div className="wrap">
        <Marker num="05">Field notes</Marker>
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
        <Marker num="06">Experience</Marker>
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
      <div className="wrap">
        <Marker num="07">Contact</Marker>
        <p className="contact__lead">Building something with robots or AI? Let's talk.</p>
        <a href={`mailto:${LINKS.email}`} className="contact__email">{LINKS.email}</a>
        <div className="contact__links">
          <External href={LINKS.linkedin}>LinkedIn</External>
          <External href={LINKS.github}>GitHub</External>
          <External href={LINKS.huggingface}>Hugging Face</External>
          <External href="https://vasi.ca">VASI Systems</External>
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
        <Mission />
        <Work />
        <Partner />
        <Notes />
        <Experience />
        <Contact />
      </main>
      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Lawrence Okolo</span>
        <span>Making indoor spaces understandable to AI · Vancouver, BC</span>
      </footer>
    </>
  );
}
