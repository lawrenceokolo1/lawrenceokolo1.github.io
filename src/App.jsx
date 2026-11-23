import { Route, Routes } from "react-router-dom";
import About from "./About.jsx";
import HeroScan from "./HeroScan.jsx";
import HeroVideo from "./HeroVideo.jsx";
import { useScrollMemory } from "./navigation.jsx";
import Post, { NotFound, NotesIndex } from "./Post.jsx";
import { POSTS } from "./posts.jsx";
import {
  ABOUT_FACTS, BACKERS, EDUCATION, EXPERIENCE, LINKS, MISSION, NAV, NOTES, PARTNERS, PROJECTS, STACK,
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
        <a href="/" className="nav__brand" aria-label="Lawrence Okolo, home">
          <img src="/img/avatar.webp" alt="" width={36} height={36} />
        </a>
        {NAV.map(({ label, href }) => (
          <a key={href} href={href} className={`nav__link ${label === "About" ? "nav__link--keep" : ""}`}>{label}</a>
        ))}
        <a href="/#partner" className="nav__cta">Work with me</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero hero--video">
      <HeroVideo />
      <div className="wrap hero__copy">
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
      <p className="hero__caption wrap">Live demo · AgenticROS at BC + AI, Vancouver · Mar 2026 · Video: BC + AI</p>
    </section>
  );
}

function AboutIntro() {
  return (
    <section id="about" className="section about-strip">
      <div className="wrap">
        <Marker num="01">About me</Marker>
        <div className="about-strip__grid">
          <figure className="about-strip__photo">
            <img src="/img/victoria.webp" alt="Lawrence Okolo in Victoria, BC" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h2 className="section__title">Engineer by trade. Founder by choice.</h2>
            <p className="about-strip__lead">
              I build AI systems that work in the physical world. As co-founder of VASI Systems, I lead the robotics,
              spatial intelligence, and AI behind autonomous robots for hospitals. As Lead AI Engineer at HUGE, I take
              AI from model development to production. I stay hands-on: I write the code, build the robots, and deploy
              them myself.
            </p>
            <ul className="about-strip__facts">
              {ABOUT_FACTS.map((f) => <li key={f.k}><span>{f.k}</span>{f.v}</li>)}
            </ul>
            <a href="/about/" className="btn btn--dark">Read more</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="mission">
      <div className="wrap">
        <Marker num="02">The mission</Marker>
        <h2 className="mission__title">Map. Understand. Act.</h2>
        <p className="mission__body">{MISSION.body}</p>
        <ol className="mission__stages">
          {MISSION.stages.map((st) => (
            <li key={st.num}>
              <span className="mission__num" aria-hidden>{st.num}</span>
              <h3>{st.title}</h3>
              <p>{st.body}</p>
              <a href={st.proof.href} className="mission__proof">{st.proof.label}</a>
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
        <Marker num="03">Selected systems</Marker>
        <h2 className="section__title">The systems behind the mission.</h2>
        <div className="features">
          {FEATURED.map((p, i) => <Featured key={p.id} p={p} n={i + 1} />)}
        </div>
        <Marker num="04">Index</Marker>
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
        <Marker num="07">Partner with me</Marker>
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
        <div className="section__head">
          <h2 className="section__title">Recently, in the lab and on stage.</h2>
          <a href="/notes/" className="link">All field notes</a>
        </div>
        <ol className="notes">
          {NOTES.map((n) => (
            <li key={n.title}>
              <time className="notes__date">{n.date}</time>
              <div>
                <h3><a href={`/notes/${n.slug}/`}>{n.title}</a></h3>
                <p>{n.body}</p>
                <a href={`/notes/${n.slug}/`} className="link notes__more">Read the full note</a>
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
        <Marker num="08">Contact</Marker>
        <p className="contact__lead">Building something with robots or AI? Let's talk.</p>
        <p className="contact__label">Work, partnerships &amp; VASI</p>
        <a href={`mailto:${LINKS.vasiEmail}`} className="contact__email">{LINKS.vasiEmail}</a>
        <p className="contact__label contact__label--alt">
          Personal, speaking &amp; research{" "}
          <a href={`mailto:${LINKS.email}`} className="link">{LINKS.email}</a>
        </p>
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

const Home = () => (
  <>
    <Hero />
    <AboutIntro />
    <Mission />
    <Work />
    <Notes />
    <Experience />
    <Partner />
    <Contact />
  </>
);

/** Every prerendered URL with its page head; prerender.js writes one HTML file per entry. */
export const ROUTES = [
  { url: "/" },
  {
    url: "/notes/",
    head: {
      title: "Field notes · Lawrence Okolo",
      description: "Notes from the lab and the stage: robotics, edge AI on NVIDIA Jetson, reinforcement learning, and AI agents for ROS 2.",
    },
  },
  {
    url: "/about/",
    head: {
      title: "About Lawrence Okolo · ML Engineer & Co-founder of VASI",
      description: "Lawrence Okolo: Lead AI Engineer at HUGE and co-founder of VASI Systems. Career, robotics work, talks, healthcare training, and how to work together.",
    },
  },
  ...POSTS.map((p) => ({ url: `/notes/${p.slug}/`, head: { title: `${p.title} · Lawrence Okolo`, description: p.description } })),
];

export default function App() {
  useScrollMemory();
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<NotesIndex />} />
          <Route path="/notes/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Lawrence Okolo</span>
        <span>Making indoor spaces understandable to AI · Vancouver, BC</span>
      </footer>
    </>
  );
}
