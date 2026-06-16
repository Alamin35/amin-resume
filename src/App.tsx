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
  { label: "BSc Graduate in EEE from BUET" },
  { label: "Based in Dhaka" },
  { label: "Physics-aware ML, CPS, & Signals" },
  { label: "Open to research & engineering roles" },
];

const proficiencies = [
  {
    title: "Skills & Domain",
    items: [
      "Power System Analysis",
      "Control Systems",
      "Signal Processing",
      "Cyber-Physical Systems (CPS)",
      "Anomaly Detection",
      "Research Prototyping"
    ],
  },
  {
    title: "Tools & Simulation",
    items: [
      "PyTorch / TensorFlow",
      "MATLAB",
      "CST Studio Suite",
      "COMSOL Multiphysics",
      "PCB Design",
      "Sensor Fusion"
    ],
  },
  {
    title: "Tech Stack",
    items: [
      "Python (NumPy, Pandas)",
      "C / C++",
      "Arduino & ESP8266",
      "Raspberry Pi",
      "Linux & Git",
      "Web Dev (HTML/CSS/JS)"
    ],
  },
  {
    title: "Spoken Languages",
    items: [
      "English",
      "Bangla"
    ],
  },
];

const experiences: ResumeEntry[] = [
  {
    title: "General Secretary",
    badge: "Current",
    period: "May 2025 - Present",
    organization: "IEEE BUET Signal Processing Society Student Chapter",
    location: "Dhaka, BD",
    description:
      "Directing overall chapter operations and coordinating with the executive committee. Organized technical seminars, hands-on workshops, and major networking events for student builders in the electrical and electronic engineering domain.",
  },
  {
    title: "Assistant General Secretary",
    period: "June 2022 - April 2025",
    organization: "BUET Entrepreneurship Development Club",
    location: "Dhaka, BD",
    description:
      "Organized targeted student skill-development events, managed local and external corporate sponsorships, and arranged EDC Talks along with professional networking sessions.",
  },
  {
    title: "Chief Technology Officer",
    period: "June 2020 - December 2022",
    organization: "Paintbeatart.com",
    location: "Remote",
    description:
      "Architected a scalable e-commerce infrastructure supporting over 100+ independent artists and supervised technical web operations. Recognized for architectural scalability via the Bangabandhu Innovation Grant (BIG) 2021.",
  },
];

const education: ResumeEntry[] = [
  {
    title: "Bachelor of Science in Electrical and Electronic Engineering",
    badge: "Graduated",
    period: "January 2022 - June 2026",
    organization: "Bangladesh University of Engineering & Technology",
    location: "Dhaka, BD",
    description:
      "Completed rigorous engineering coursework across power system analysis, control engineering, digital signal processing (DSP), microprocessors & interfacing, applied machine learning, and data structures.",
  },
  {
    title: "Higher Secondary and Secondary Certificates",
    period: "Graduated with Honors",
    organization: "Sylhet Cadet College",
    location: "Sylhet, BD",
    description:
      "Completed pre-university education within a premier, disciplined pre-military institution. Recognized with a Board Exam Scholarship by the Bangladesh Ministry of Education for academic excellence.",
  },
];

const publications: Publication[] = [
  {
    slug: "respiratory-sound-classification",
    title: "Respiratory Sound Classification Study",
    subtitle: "IEEE Xplore Publication",
    mark: "RS",
    year: "2026",
    type: "Comparative Study",
    role: "ML Researcher",
    image: "/assets/img/project/qpain2026.jpg",
    externalHref: "https://ieeexplore.ieee.org/document/11546080",
    caseStudy: {
      objective:
        "Bridge spectral specificity and semantic generalization on the ICBHI 2017 benchmark to construct a robust machine learning screening workflow.",
      process:
        "Developed an augmented YAMNet feature pipeline utilizing latent-space SMOTE (k=5) data expansion to comprehensively balance extreme clinical sample distribution irregularities.",
      outcome:
        "Achieved a 93.03% classification accuracy paired with an exceptional 91.7% recall rate for respiratory infections, demonstrating an ultra-low per-sample edge inference latency of ~0.0005 seconds tailored for remote deployment scenarios.",
      features: ["Augmented YAMNet Embeddings", "Latent-space SMOTE balancing", "Low-latency edge deployment profile", "Comparative MFCC evaluation pipeline"],
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
    externalHref: "https://ieeexplore.ieee.org/document/11429225",
    caseStudy: {
      objective:
        "Design a dependable real-time environment preservation setup optimized for small-scale fruit agricultural systems to lower post-harvest degradation rates.",
      process:
        "Architected a closed-loop automated embedded control node around ESP8266 Wi-Fi transceivers and microcontrollers to track shifting atmospheric signatures.",
      outcome:
        "Built a system that successfully regulates and responds to subtle environmental shifts, allowing growers to manage storage systems intelligently before crop loss occurs.",
      features: ["ESP8266 closed-loop firmware", "Volatile Organic Compound (VOC) monitoring", "Temperature & humidity regulations", "Automated loss mitigation"],
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
    externalHref: "https://ieeexplore.ieee.org/document/11502377",
    caseStudy: {
      objective:
        "Engineer a dependable hardware control approach for an indoor autonomous cleaner capable of transitioning smoothly across alternative operational modalities.",
      process:
        "Developed custom algorithmic tracking sequences utilizing a physical sensor-fusion architecture of ultrasonic ranging arrays and onboard digital gyroscopes.",
      outcome:
        "Created an integrated prototype demonstrating smooth indoor trajectory tracking and active DC motor velocity regulation across variable room surfaces.",
      features: ["Ultrasonic & gyroscope sensor fusion", "DC motor control sequences", "Autonomous navigation algorithm", "Dual-mode hardware implementation"],
    },
  },
];

const honors: ResumeEntry[] = [
  {
    title: "Runner-up",
    period: "2020",
    organization: "International AI Fair for High School Students",
    location: "China",
    description: "Globally recognized for the design and implementation of a Deep Learning-based Emotion Management System.",
  },
  {
    title: "Appreciation Award",
    period: "2021",
    organization: "Home Secretary of Bangladesh",
    location: "Dhaka, BD",
    description: "Awarded high-level civic commendation for impactful social deployment initiatives and leadership.",
  },
  {
    title: "Prestigious Fellowship",
    period: "2020",
    organization: "Centre for Bangladesh Studies (CBS)",
    location: "Dhaka, BD",
    description: "Selected into the selective academic research cohort focusing on engineering-driven socioeconomic research.",
  },
  {
    title: "Champion (Campus Round)",
    period: "2023",
    organization: "Hult Prize",
    location: "BUET, Dhaka",
    description: "Led business architecture and scalable deployment metrics pitching for international social venture generation.",
  },
];

const contact: LinkItem[] = [
  { label: "Mail", href: "mailto:alamin20351@gmail.com" },
  { label: "Web Portal", href: "https://mdalamin.qzz.io/" },
  { label: "GitHub", href: "https://github.com/Alamin35" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amin035/" },
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
            <h1>AL AMIN</h1>
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
            </p>
          </div>
        </div>
      </section>

      <ResumeSection title="Proficiencies" id="proficiencies">
        {proficiencies.map((group) => (
          <NoteBlock key={group.title} title={group.title} items={group.items.map((label) => ({ label }))} />
        ))}
      </ResumeSection>

      <ResumeSection title="Experiences" id="experiences">
        {experiences.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.organization}`} entry={entry} />
        ))}
      </ResumeSection>

      <ResumeSection title="Education" id="education">
        {education.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.organization}`} entry={entry} />
        ))}
      </ResumeSection>

      <ResumeSection title="Publications" id="publications" bodyClassName="project-list">
        {publications.map((pub) => (
          <PublicationCard key={pub.slug} publication={pub} onNavigate={onNavigate} />
        ))}
      </ResumeSection>

      <ResumeSection title="Honors & Awards" id="honors">
        {honors.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.organization}`} entry={entry} />
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
    onNavigate(hash ? `/${hash}` : "/");
  };

  const nextThemeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Updated brand link parameters to pop open your CV link in a new tab[cite: 1] */}
        <a 
          href={resumeUrl} 
          className="brand-link" 
          target="_blank" 
          rel="noreferrer"
        >
          Al Amin&apos;s Portfolio
        </a>
        <nav aria-label="Resume sections">
          <a href="/#proficiencies" onClick={(event) => goHome(event, "#proficiencies")}>Proficiencies</a>
          <a href="/#experiences" onClick={(event) => goHome(event, "#experiences")}>Experiences</a>
          <a href="/#publications" onClick={(event) => goHome(event, "#publications")}>Publications</a>
          <a href="/#honors" onClick={(event) => goHome(event, "#honors")}>Honors</a>
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
                  <span>IEEE Xplore Document</span>
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

// Keeping presentation blocks standard
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
      <span>© 2026 Md Al-Amin</span>
      <span>Dhaka, Bangladesh</span>
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
