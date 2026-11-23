import { BACKERS, EDUCATION, EXPERIENCE, LINKS } from "./content.js";
import { POSTS } from "./posts.jsx";

const CERTS = [
  { title: "Privacy and Cybersecurity 101", issued: "Oct 2026", img: "/img/certs/privacy-cybersecurity.webp" },
  { title: "Level 4: Communication and Partner Engagement", issued: "Oct 2026", img: "/img/certs/communication-partner-engagement.webp" },
  { title: "Introduction to Occupational Health and Safety", issued: "Nov 2026", img: "/img/certs/occupational-health-safety.webp" },
];

const TALKS = [
  {
    when: "Oct 2026",
    what: "Vancouver Physical AI Workshop, hosted by Voxel51",
    detail: "Live demo of the VASI Microbot.",
    href: "/notes/physical-ai-workshop-microbot/",
  },
  {
    when: "Mar 2026",
    what: "Vancouver AI Meetup #27 (BC + AI), H.R. MacMillan Space Centre",
    detail: "Opened the meetup with AI agents driving a real robot through AgenticROS.",
    href: "/notes/vancouver-ai-meetup-agenticros/",
  },
  {
    when: "Ongoing",
    what: "VASI meetups and BC robotics events",
    detail: "Hosting VASI community sessions in Vancouver, and joining robotics meetups across BC, including in Victoria.",
  },
];

const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

export default function About() {
  return (
    <article className="page">
      <div className="wrap page__wrap">
        <p className="page__meta"><a href="/">Lawrence Okolo</a><span>About</span></p>
        <h1 className="page__title">Engineer by trade. Founder by choice.</h1>

        <div className="about__intro">
          <div className="prose">
            <p className="prose__lead">
              I&apos;m Lawrence Okolo, a machine learning engineer in Vancouver building AI systems that work in the
              physical world. I co-founded VASI Systems, where I lead health robotics R&amp;D for autonomous robots in
              hospitals, and I&apos;m Lead AI Engineer at HUGE.
            </p>
            <p>
              I stay hands-on. I write the code, build and wire the robots, train the models, and deploy them in front
              of real users. My focus is systems that hold up outside the lab: in complex buildings, in regulated
              environments, and at the level of reliability hospitals demand.
            </p>
          </div>
          <figure className="about__portrait">
            <img src="/img/victoria.webp" alt="Lawrence Okolo in front of the BC Parliament Buildings in Victoria" loading="eager" />
            <figcaption>Victoria, BC</figcaption>
          </figure>
        </div>

        <div className="prose">
          <h2>The path here</h2>
          <p>
            I started in production machine learning. At The FMN Group I spent nearly four years as an MLOps engineer,
            building and running the infrastructure behind demand-forecasting models across multiple regions. Those
            models cut inventory costs by 12%, and taught me that a model is only worth what it does once it&apos;s
            deployed.
          </p>
          <p>
            At Cognizant I worked as a machine learning researcher across 13+ technical domains: deep learning,
            statistical modelling, and ML systems design. At the Canadian Red Cross I built data infrastructure and
            quality standards for humanitarian operations across Canada, where bad data has real consequences for
            people who need help.
          </p>
          <p>
            I hold a Master&apos;s in Applied Machine Intelligence from {EDUCATION.school}, focused on machine
            learning systems, robotic autonomy, and spatial reasoning. That&apos;s where the pieces came together:
            production ML, robots, and the question of how a machine understands a building.
          </p>

          <h2>What I do now</h2>
          <h3>VASI Systems: co-founder, health robotics R&amp;D</h3>
          <p>
            Hospitals are short-staffed, and nurses spend a large part of every shift moving supplies, medication, and
            equipment instead of caring for patients. Robots can take that work on, but only if they truly understand
            the building. At <Ext href="https://vasi.ca">VASI</Ext> I build that understanding:
          </p>
          <ul>
            <li>
              <strong>The VASI spatial platform</strong>, which turns hospital floor plans into a live, routable model
              of every room, corridor, lift, and door, shared by robots, wayfinding, and staff.{" "}
              <Ext href="https://spatial.vasi.ca/jj">Open the live map</Ext>.
            </li>
            <li>
              <strong>The robots</strong>: Unitree and AgiBot quadrupeds, and our own custom robots, including the VASI
              Microbot built in our Vancouver lab.
            </li>
            <li>
              <strong>The autonomy</strong>: leading the move from a classical navigation stack to{" "}
              <a href="/notes/classical-navigation-to-reinforcement-learning/">reinforcement learning</a>, and running
              vision-language models <a href="/notes/cosmos-reason-jetson-orin-nano/">on the robot itself</a>.
            </li>
            <li>
              <strong>The language layer</strong>: <Ext href="https://fery.ca">Fery</Ext>, a production AI assistant
              for Canadian ferry schedules, proves the same stack that lets our robots talk with hospital staff.
            </li>
          </ul>
          <p>
            VASI is part of the NVIDIA Inception program and the Google for Startups Cloud Program.
          </p>
          <div className="about__backers">
            {BACKERS.map((b) => <img key={b.name} src={b.src} alt={b.name} loading="lazy" decoding="async" />)}
          </div>

          <h3>HUGE: Lead AI Engineer</h3>
          <p>
            At HUGE I lead AI engineering across robotics and applied AI, from model development to deployment
            infrastructure.
          </p>

          <h3>Open source</h3>
          <p>
            <Ext href="https://agenticros.com">AgenticROS</Ext> lets any AI agent (Claude, Gemini, OpenClaw) control
            and query ROS 2 robots in natural language. I also publish ML projects on{" "}
            <Ext href={LINKS.github}>GitHub</Ext> and <Ext href={LINKS.huggingface}>Hugging Face</Ext>, from visual
            product search over ~148k products to Landsat-based vegetation-loss mapping across Canada.
          </p>

          <h2>Talks and community</h2>
          <ul className="about__list">
            {TALKS.map((t) => (
              <li key={t.what}>
                <span className="about__when">{t.when}</span>
                <div>
                  <strong>{t.href ? <a href={t.href}>{t.what}</a> : t.what}</strong>
                  <span>{t.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <figure className="prose__figure">
            <img src="/img/vasi-meetup.webp" alt="Attendees of a VASI community meetup standing around the VASI banner" loading="lazy" decoding="async" />
            <figcaption>A VASI community meetup in Vancouver.</figcaption>
          </figure>

          <h2>Healthcare training</h2>
          <p>
            Building for hospitals means meeting hospital standards. I&apos;ve completed training through the
            Provincial Health Services Authority (PHSA) LearningHub, BC&apos;s training platform for health-care
            workers. Click a certificate to view it full size.
          </p>
          <ul className="certs">
            {CERTS.map((c) => (
              <li key={c.title}>
                <a href={c.img} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${c.title}`}>
                  <img src={c.img} alt={`PHSA LearningHub record of completion: ${c.title}`} loading="lazy" decoding="async" />
                </a>
                <strong>{c.title}</strong>
                <span>PHSA LearningHub · {c.issued}</span>
              </li>
            ))}
          </ul>

          <h2>Experience</h2>
          <ul className="about__list">
            {EXPERIENCE.map((e) => (
              <li key={e.org + e.period}>
                <span className="about__when">{e.period}</span>
                <div>
                  <strong>{e.role}, {e.org}</strong>
                  <span>{e.body}</span>
                </div>
              </li>
            ))}
            <li>
              <span className="about__when">Education</span>
              <div>
                <strong>{EDUCATION.degree}</strong>
                <span>{EDUCATION.school}</span>
              </div>
            </li>
          </ul>

          <h2>Field notes</h2>
          <ul className="about__list">
            {POSTS.map((p) => (
              <li key={p.slug}>
                <span className="about__when">{p.date}</span>
                <div><strong><a href={`/notes/${p.slug}/`}>{p.title}</a></strong></div>
              </li>
            ))}
          </ul>

          <h2>Work with me</h2>
          <p>
            I want to hear from hospitals and health authorities, robotics companies, researchers, investors, and event
            organisers. For work, partnerships, and VASI, email{" "}
            <a href={`mailto:${LINKS.vasiEmail}`}>{LINKS.vasiEmail}</a>. For speaking, research, and anything
            personal, use <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>. Or see{" "}
            <a href="/#partner">how we can work together</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
