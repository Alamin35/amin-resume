import Lenis from "lenis";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

type NoteItem = {
  label: string;
  value?: string;
};

type ResumeEntry = {
  title: string;
  badge?: string;
  period: string;
  organization: string;
  location: string;
  description: string;
};

type Publication = {
  slug: string;
  title: string;
  subtitle: string;
  mark: string;
  year: string;
  type: string;
  role: string;
  image: string;
  externalHref?: string;
  caseStudy: {
    objective: string;
    process: string;
    outcome: string;
    features: string[];
  };
};

type LinkItem = {
  label: string;
  href: string;
};

const resumeUrl =
  "https://drive.google.com/file/d/1CWkpabhO-R3XEt4o7VIXqH5flWzJBNyf/view?usp=sharing";

const about: NoteItem[] = [
  { label: "BSc Graduate in EEE from BUET" }, // Updated fresh graduate hook [cite: 8]
  { label: "Based in Dhaka" }, // [cite: 2]
  { label: "Physics-aware ML, CPS, & Signals" }, // [cite: 4]
  { label: "Open to research & engineering roles" },
];

const proficiencies = [
  {
    title: "Skills & Domain",
    items: [
      "Power System Analysis", // Added EEE Core skills [cite: 8]
      "Control Systems", // [cite: 8]
      "Signal Processing", // [cite: 4]
      "Cyber-Physical Systems (CPS)", // [cite: 4]
      "Anomaly Detection", // [cite: 4]
      "Research Prototyping"
    ],
  },
  {
    title: "Tools & Simulation",
    items: [
      "PyTorch / TensorFlow", // Integrated from CV [cite: 28]
      "MATLAB", // [cite: 28]
      "CST Studio Suite", // Added EEE simulation tool [cite: 30]
      "COMSOL Multiphysics", // Added EEE simulation tool [cite: 30]
      "PCB Design", // Added EEE hardware framework [cite: 29]
      "Sensor Fusion" // [cite: 29]
    ],
  },
  {
    title: "Tech Stack",
    items: [
      "Python (NumPy, Pandas)", // [cite: 28]
      "C / C++", // [cite: 28]
      "Arduino & ESP8266", // [cite: 29]
      "Raspberry Pi", // [cite: 29]
      "Linux & Git", // [cite: 30]
      "Web Dev (HTML/CSS/JS)" // [cite: 30]
    ],
  },
  {
    title: "Honors & Awards",
    items: [
      "Runner-up, International AI Fair China", // Added elite honors directly from your CV [cite: 13]
      "Appreciation Award, Home Secretary of BD", // [cite: 15]
      "Fellowship, Centre for Bangladesh Studies", // [cite: 16]
      "Champion (Campus Round), Hult Prize", // [cite: 17]
      "Board Exam Scholarship" // [cite: 18]
    ],
  },
];

const experiences: ResumeEntry[] = [ // Rebranded data container structure from 'work' to 'experiences'
  {
    title: "General Secretary",
    badge: "Current",
    period: "May 2025 - Present", // [cite: 33]
    organization: "IEEE BUET Signal Processing Society Student Chapter", // [cite: 32]
    location: "Dhaka, BD", // [cite: 6]
    description:
      "Directing overall chapter operations and coordinating with the executive committee. Organized technical seminars, hands-on workshops, and major networking events for student builders in the electrical and electronic engineering domain.", // [cite: 34, 35]
  },
  {
    title: "Assistant General Secretary",
    period: "June 2022 - April 2025", // [cite: 36]
    organization: "BUET Entrepreneurship Development Club", // [cite: 37]
    location: "Dhaka, BD", // [cite: 6]
    description:
      "Organized targeted student skill-development events, managed local and external corporate sponsorships, and arranged EDC Talks along with professional networking sessions.", // [cite: 37, 38]
  },
  {
    title: "Chief Technology Officer",
    period: "June 2020 - December 2022", // [cite: 40]
    organization: "Paintbeatart.com", // [cite: 39]
    location: "Remote",
    description:
      "Architected a scalable e-commerce infrastructure supporting over 100+ independent artists and supervised technical web operations. Recognized for architectural scalability via the Bangabandhu Innovation Grant (BIG) 2021.", // [cite: 41, 42]
  },
];

const education: ResumeEntry[] = [
  {
    title: "Bachelor of Science in Electrical and Electronic Engineering",
    badge: "Graduated", // Updated student tag status to reflect your fresh graduate milestone [cite: 8]
    period: "January 2022 - June 2026", // [cite: 7]
    organization: "Bangladesh University of Engineering & Technology", // [cite: 6]
    location: "Dhaka, BD", // [cite: 6]
    description:
      "Completed rigorous engineering coursework across power system analysis, control engineering, digital signal processing (DSP), microprocessors & interfacing, applied machine learning, and data structures.", // [cite: 8]
  },
  {
    title: "Higher Secondary and Secondary Certificates",
    period: "Graduated with Honors",
    organization: "Sylhet Cadet College", // [cite: 9]
    location: "Sylhet, BD", // [cite: 9]
    description:
      "Completed pre-university education within a premier, disciplined pre-military institution. Recognized with a Board Exam Scholarship by the Bangladesh Ministry of Education for academic excellence.", // Updated description mapping with military context 
  },
];

const publications: Publication[] = [ // Rebranded variable from 'projects' to 'publications'
  {
    slug: "respiratory-sound-classification",
    title: "Respiratory Sound Classification Study",
    subtitle: "Research Publication",
    mark: "RS",
    year: "2026",
    type: "Comparative Study",
    role: "ML Researcher",
    image: "/assets/img/project/qpain2026.jpg",
    caseStudy: {
      objective:
        "Bridge spectral specificity and semantic generalization on the ICBHI 2017 benchmark to construct a robust machine learning screening workflow.", // [cite: 20]
      process:
        "Developed an augmented YAMNet feature pipeline utilizing latent-space SMOTE (k=5) data expansion to comprehensively balance extreme clinical sample distribution irregularities.", // [cite: 21]
      outcome:
        "Achieved a 93.03% classification accuracy paired with an exceptional 91.7% recall rate for respiratory infections, demonstrating an ultra-low per-sample edge inference latency of ~0.0005 seconds tailored for remote deployment scenarios.", // [cite: 21]
      features: ["Augmented YAMNet Embeddings", "Latent-space SMOTE balancing", "Low-latency edge deployment profile", "Comparative MFCC evaluation pipeline"], // [cite: 20, 21]
    },
  },
  {
    slug: "iot-fruit-storage-monitoring",
    title: "IoT-Based Real-Time Storage Monitoring",
    subtitle: "IEEE Xplore Publication",
    mark: "IoT",
    year: "2026",
    type: "Published Research",
    role: "Embedded Developer",
    image: "/assets/img/project/icete2026.jpg",
    externalHref: "https://ieeexplore.ieee.org/document/11429225", // [cite: 2]
    caseStudy: {
      objective:
        "Design a dependable real-time environment preservation setup optimized for small-scale fruit agricultural systems to lower post-harvest degradation rates.", // [cite: 24, 26]
      process:
        "Architected a closed-loop automated embedded control node around ESP8266 Wi-Fi transceivers and microcontrollers to track shifting atmospheric signatures.", // [cite: 26]
      outcome:
        "Built a system that successfully regulates and responds to subtle environmental shifts, allowing growers to manage storage systems intelligently before crop loss occurs.", // [cite: 26]
      features: ["ESP8266 closed-loop firmware", "Volatile Organic Compound (VOC) monitoring", "Temperature & humidity regulations", "Automated loss mitigation"], // [cite: 26]
    },
  },
  {
    slug: "dual-mode-floor-mopping-robot",
    title: "Dual-Mode Floor Mopping Robot Architecture",
    subtitle: "IEEE Robotics Publication",
    mark: "RB",
    year: "2025",
    type: "Robotics System",
    role: "Control Engineer",
    image: "/assets/img/project/raaicon2025.jpg",
    externalHref: "https://ieeexplore.ieee.org/document/11502377", // [cite: 2]
    caseStudy: {
      objective:
        "Engineer a dependable hardware control approach for an indoor autonomous cleaner capable of transitioning smoothly across alternative operational modalities.", // [cite: 22, 23]
      process:
        "Developed custom algorithmic tracking sequences utilizing a physical sensor-fusion architecture of ultrasonic ranging arrays and onboard digital gyroscopes.", // [cite: 23, 29]
      outcome:
        "Created an integrated prototype demonstrating smooth indoor trajectory tracking and active DC motor velocity regulation across variable room surfaces.", // [cite: 23]
      features: ["Ultrasonic & gyroscope sensor fusion", "DC motor control sequences", "Autonomous navigation algorithm", "Dual-mode hardware implementation"], // [cite: 23, 29]
    },
  },
];

const contact: LinkItem[] = [
  { label: "Mail", href: "mailto:alamin20351@gmail.com" }, // [cite: 2]
  { label: "Web Portal", href: "https://mdalamin.qzz.io/" }, // Added personalized web target from your CV [cite: 2]
  { label: "GitHub", href: "https://github.com/Alamin35" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amin035/" }, // [cite: 2]
];

type Theme = "dark" | "light";

function App() {
  const [path, setPath] = useState(() => 
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  const [theme, setTheme] = useState<Theme>("dark");
  const activePublication = useMemo(() => getPublicationFromPath(path), [path]);

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1.1,
      smoothWheel: true,
      orientation: "vertical",
    });

    let frame = 0;
    const raf = (timeInMs: number) => {
      lenis.raf(timeInMs);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const navigate = (href: string) => {
    window.history.pushState(null, "", href);
    setPath(window.location.pathname);
    const hash = href.includes("#") ? href.split("#")[1] : "";
    if (hash) {
      window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="site-shell">
      <Header onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      {activePublication ? (
        <PublicationDetail publication={activePublication} onNavigate={navigate} />
      ) : (
        <ResumeHome onNavigate={navigate} />
      )}
      <Footer />
    </div>
  );
}

function ResumeHome({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <main>
      <section className="hero-section" id="hero" aria-label="Hero">
        <div className="section-grid hero-grid">
          <div className="section-title">
            <h1>AL AMIN</h1> {/* [cite: 1] */}
          </div>
          <div className="section-body hero-body">
            <figure className="profile-figure">
              <div className="profile-card">
                <div
                  className="profile-photo"
                  role="img"
                  aria-label="Portrait of Md Al-Amin"
                />
              </div>
            </figure>
            <NoteBlock title="About" items={about} />
            <p className="short-bio">
              Recent Electrical and Electronic Engineering graduate from BUET working at the intersections of Physics-aware Machine Learning, Cyber-Physical Systems (CPS), signal workflows, and resilient edge architectures.
            </p> {/* Updated biography for a fresh graduate engineering focus  */}
          </div>
        </div>
      </section>

      <ResumeSection title="Proficiencies" id="proficiencies">
        {proficiencies.map((group) => (
          <NoteBlock key={group.title} title={group.title} items={group.items.map((label) => ({ label }))} />
        ))}
      </ResumeSection>

      <ResumeSection title="Experiences" id="experiences"> {/* Rebranded from Work to Experiences */}
        {experiences.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.organization}`} entry={entry} />
        ))}
      </ResumeSection>

      <ResumeSection title="Education" id="education">
        {education.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.organization}`} entry={entry} />
        ))}
      </ResumeSection>

      <ResumeSection title="Publications" id="publications" bodyClassName="project-list"> {/* Rebranded from Projects to Publications */}
        {publications.map((pub) => (
          <PublicationCard key={pub.slug} publication={pub} onNavigate={onNavigate} />
        ))}
      </ResumeSection>

      <ResumeSection title="Contact" id="contact" bodyClassName="contact-list">
        {contact.map((link) => (
          <TextLink key={link.label} link={link} />
        ))}
      </ResumeSection>
    </main>
  );
}

function Header({
  onNavigate,
  theme,
  onToggleTheme,
}: {
  onNavigate: (href: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const goHome = (event: MouseEvent<HTMLAnchorElement>, hash = "") => {
    event.preventDefault();
    onNavigate(`/${hash}`);
  };

  const nextThemeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/#hero" className="brand-link" onClick={(event) => goHome(event, "#hero")}>
          Al Amin&apos;s Portfolio
        </a>
        <nav aria-label="Resume sections">
          <a href="/#proficiencies" onClick={(event) => goHome(event, "#proficiencies")}>Proficiencies</a>
          <a href="/#experiences" onClick={(event) => goHome(event, "#experiences")}>Experiences</a> {/* Updated label alignment */}
          <a href="/#publications" onClick={(event) => goHome(event, "#publications")}>Publications</a> {/* Updated label alignment */}
          <a href="/#contact" onClick={(event) => goHome(event, "#contact")}>Contact</a>
        </nav>
        <button
          type="button"
          className="menu-button theme-toggle"
          onClick={onToggleTheme}
          aria-label={nextThemeLabel}
          title={nextThemeLabel}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

function PublicationDetail({ publication, onNavigate }: { publication: Publication; onNavigate: (href: string) => void }) {
  const nextPub = getNextPublication(publication.slug);

  return (
    <main>
      <article className="project-page">
        <section className="project-hero-section" aria-label={`${publication.title} publication`}>
          <div className="project-page-container">
            <div className="project-hero-top">
              <div className="project-heading">
                <h1>{publication.title}</h1>
                <h2>{publication.subtitle}</h2>
              </div>
              <ul className="project-facts" aria-label="Publication facts">
                <li>
                  <span>Year</span>
                  <strong>{publication.year}</strong>
                </li>
                <li>
                  <span>Classification</span>
                  <strong>{publication.type}</strong>
                </li>
                <li>
                  <span>My Contribution</span>
                  <strong>{publication.role}</strong>
                </li>
              </ul>
            </div>
            <figure className="project-banner">
              <img src={publication.image} alt="" />
            </figure>
          </div>
        </section>

        <section className="case-study-section">
          <div className="project-page-container case-study-grid">
            <h2>Breakdown</h2>
            <div className="case-study-content">
              <CaseStudyBlock title="Objective">
                <p>{publication.caseStudy.objective}</p>
              </CaseStudyBlock>
              <CaseStudyBlock title="Methodology & Process">
                <p>{publication.caseStudy.process}</p>
              </CaseStudyBlock>
              <CaseStudyBlock title="Key Findings & Outcome">
                <p>{publication.caseStudy.outcome}</p>
              </CaseStudyBlock>
              <CaseStudyBlock title="Technical Features">
                <ul>
                  {publication.caseStudy.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CaseStudyBlock>
              {publication.externalHref ? (
                <a className="text-link project-source-link" href={publication.externalHref} target="_blank" rel="noreferrer">
                  <span>IEEE Explore Document</span>
                  <ArrowIcon />
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="project-navigation-section">
          <div className="project-page-container nav-grid">
            <h2>More Outputs</h2>
            <div className="next-project-row">
              <button type="button" className="text-link next-project-link" onClick={() => onNavigate(`/projects/${nextPub.slug}`)}>
                <span>Next Research</span>
                <ArrowIcon />
              </button>
              <p>{nextPub.title}</p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

function CaseStudyBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="case-study-block">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function ResumeSection({
  title,
  id,
  children,
  bodyClassName,
}: {
  title: string;
  id: string;
  children: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section className="resume-section" id={id}>
      <div className="section-grid">
        <div className="section-title">
          <h2>{title}</h2>
        </div>
        <div className={["section-body", bodyClassName].filter(Boolean).join(" ")}>{children}</div>
      </div>
    </section>
  );
}

function NoteBlock({ title, items }: { title: string; items: NoteItem[] }) {
  return (
    <article className="note-block">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            {item.value ? <strong>{item.value}</strong> : null}
          </li>
        ))}
      </ul>
    </article>
  );
}

function TimelineEntry({ entry }: { entry: ResumeEntry }) {
  return (
    <article className="timeline-entry">
      <div className="entry-head">
        <h3>{entry.title}</h3>
        {entry.badge ? <span className="badge">{entry.badge}</span> : null}
      </div>
      <div className="entry-meta" aria-label="Entry details">
        <span>
          <CalendarIcon />
          {entry.period}
        </span>
        <span>
          <BriefcaseIcon />
          {entry.organization}
        </span>
        <span>
          <PinIcon />
          {entry.location}
        </span>
      </div>
      <p>{entry.description}</p>
    </article>
  );
}

function PublicationCard({ publication, onNavigate }: { publication: Publication; onNavigate: (href: string) => void }) {
  const content = (
    <>
      <span className="project-arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
      <div className="project-content">
        <span className="project-mark">{publication.mark}</span>
        <div>
          <h3>{publication.title}</h3>
          <p>{publication.subtitle}</p>
        </div>
      </div>
    </>
  );

  return (
    <a
      className="project-card"
      href={`/projects/${publication.slug}`}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(`/projects/${publication.slug}`);
      }}
    >
      {content}
    </a>
  );
}

function TextLink({ link }: { link: LinkItem }) {
  const external = link.href.startsWith("http");
  return (
    <a className="text-link" href={link.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span>{link.label}</span>
      <ArrowIcon />
    </a>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Md Al-Amin</span> {/* [cite: 1] */}
      <span>Dhaka, Bangladesh</span> {/* [cite: 2, 6] */}
    </footer>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v4M17 3v4M4 8h16M5 5h14v15H5z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v13H4zM9 7V5h6v2M4 13a18 18 0 0 0 16 0M11 12h3" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z" />
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function getPublicationFromPath(path: string) {
  const match = path.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return undefined;
  return publications.find((pub) => pub.slug === match[1]);
}

function getNextPublication(slug: string) {
  const index = publications.findIndex((pub) => pub.slug === slug);
  return publications[(index + 1) % publications.length];
}

export default App;
