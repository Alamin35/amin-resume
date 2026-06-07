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

type Project = {
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
  "https://drive.google.com/file/d/1RmXgeXgsA91VlESesK9dLXT8tSpitc1Q/view?usp=sharing";

const about: NoteItem[] = [
  { label: "EEE Student at BUET" },
  { label: "Based in Dhaka" },
  { label: "AI, signals, embedded systems" },
  { label: "Open to research and engineering roles" },
];

const proficiencies = [
  {
    title: "Skills",
    items: ["Research prototyping", "Signal processing", "Embedded systems", "Frontend architecture"],
  },
  {
    title: "Tools",
    items: ["PyTorch", "MATLAB", "TypeScript", "Python", "Proteus", "Arduino"],
  },
  {
    title: "Tech Stack",
    items: ["React", "Node.js", "C/C++", "SQL", "DSP workflows", "Agentic software"],
  },
  {
    title: "Spoken Languages",
    items: ["English", "Bangla"],
  },
];

const work: ResumeEntry[] = [
  {
    title: "General Secretary",
    badge: "Current",
    period: "May 2025 - Now",
    organization: "IEEE BUET Signal Processing Society Student Chapter",
    location: "Dhaka, BD",
    description:
      "Directing chapter operations, coordinating technical seminars, and helping students connect around signal processing, AI, and EEE research initiatives.",
  },
  {
    title: "Assistant General Secretary",
    period: "June 2022 - April 2025",
    organization: "BUET Entrepreneurship Development Club",
    location: "Dhaka, BD",
    description:
      "Organized skill-development events, managed sponsorships, and supported professional networking programs for student builders and founders.",
  },
  {
    title: "Chief Technology Officer",
    period: "June 2020 - December 2022",
    organization: "Paintbeatart.com",
    location: "Remote",
    description:
      "Architected an e-commerce platform supporting 100+ artists and managed technical operations through Bangabandhu Innovation Grant recognition.",
  },
];

const education: ResumeEntry[] = [
  {
    title: "BSc in Electrical and Electronic Engineering",
    badge: "Current",
    period: "January 2022 - June 2026",
    organization: "Bangladesh University of Engineering & Technology",
    location: "Dhaka, BD",
    description:
      "Studying power systems, control, digital signal processing, microprocessors, data structures, machine learning, and applied engineering research.",
  },
  {
    title: "Higher Secondary and Secondary Certificates",
    period: "Completed before BUET",
    organization: "Sylhet Cadet College",
    location: "Sylhet, BD",
    description:
      "Completed pre-university education with board scholarship recognition and a foundation in disciplined academics and leadership.",
  },
];

const certificates = [
  {
    title: "IEEE Research Publications in AI, IoT, and Robotics",
    meta: "2025 - 2026",
  },
  {
    title: "Advanced Engineering Coursework in AI, DSP, and Embedded Systems",
    meta: "2022 - 2026",
  },
];

const projects: Project[] = [
  {
    slug: "respiratory-sound-classification",
    title: "Respiratory Sound Classification",
    subtitle: "IEEE QPAIN 2026",
    mark: "RS",
    year: "2026",
    type: "Research Project",
    role: "ML Researcher",
    image: "/assets/img/project/qpain2026.jpg",
    caseStudy: {
      objective:
        "Build a respiratory sound classification workflow that can support non-invasive screening research through repeatable audio preprocessing and machine learning evaluation.",
      process:
        "I shaped the project around feature extraction, model comparison, and careful validation. The work focused on turning noisy clinical-style audio into a structured signal pipeline that could be inspected, tuned, and reused for publication-quality experiments.",
      outcome:
        "The project strengthened my research workflow across biomedical audio, signal processing, and applied machine learning while preparing the system for IEEE QPAIN 2026 submission.",
      features: ["Respiratory audio preprocessing", "Model evaluation pipeline", "Biomedical signal features", "Publication-oriented reporting"],
    },
  },
  {
    slug: "iot-fruit-storage-monitoring",
    title: "IoT Fruit Storage Monitoring",
    subtitle: "ICECTE 2026",
    mark: "IoT",
    year: "2026",
    type: "Published Research",
    role: "Embedded Systems Researcher",
    image: "/assets/img/project/icete2026.jpg",
    externalHref: "https://ieeexplore.ieee.org/document/11429225",
    caseStudy: {
      objective:
        "Design an IoT monitoring approach for fruit storage conditions so environmental data can be tracked and interpreted before quality loss becomes visible.",
      process:
        "The work combined sensing, embedded logic, and data interpretation. I contributed to the technical direction of the monitoring setup, emphasizing practical measurement, reliable communication, and a clear path from collected readings to useful storage decisions.",
      outcome:
        "The project became an IEEE-indexed research output and helped connect my embedded systems experience with agricultural storage and applied IoT problem solving.",
      features: ["Sensor-based monitoring", "Embedded data collection", "Storage condition tracking", "IEEE publication link"],
    },
  },
  {
    slug: "dual-mode-floor-mopping-robot",
    title: "Dual-Mode Floor Mopping Robot",
    subtitle: "RAAICON 2025",
    mark: "RB",
    year: "2025",
    type: "Robotics Project",
    role: "Control and Systems Developer",
    image: "/assets/img/project/raaicon2025.jpg",
    externalHref: "https://ieeexplore.ieee.org/document/11502377",
    caseStudy: {
      objective:
        "Create a dual-mode robotic floor mopping system that could demonstrate practical movement, control, and cleaning behavior in a compact prototype.",
      process:
        "The project required balancing mechanical constraints with electronics and control logic. I worked through prototype behavior, mode switching, and system integration so the robot could operate as a coherent engineering artifact.",
      outcome:
        "The work turned into an IEEE RAAICON 2025 publication and sharpened my ability to move from circuit-level decisions to full-system robotics behavior.",
      features: ["Dual operation modes", "Robot control logic", "Prototype integration", "Published conference work"],
    },
  },
  {
    slug: "audio-deepfake-detection",
    title: "Audio Deepfake Detection",
    subtitle: "Signal ML",
    mark: "AD",
    year: "2025",
    type: "Machine Learning Project",
    role: "Signal ML Developer",
    image: "/assets/img/project/eee402.jpg",
    caseStudy: {
      objective:
        "Explore audio deepfake detection by building a machine learning workflow that can distinguish synthetic speech patterns from authentic audio signals.",
      process:
        "I approached the problem as a signal classification system, focusing on feature preparation, model behavior, and evaluation clarity. The implementation treated audio artifacts as measurable signal patterns rather than only application-level media files.",
      outcome:
        "The project deepened my understanding of trustworthy audio systems, signal-based ML, and adversarial media detection workflows.",
      features: ["Audio feature extraction", "Synthetic speech classification", "Model comparison", "Signal-first ML framing"],
    },
  },
];

const contact: LinkItem[] = [
  { label: "Mail", href: "mailto:alamin20351@gmail.com" },
  { label: "CV", href: resumeUrl },
  { label: "GitHub", href: "https://github.com/Alamin35" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amin035/" },
];

function App() {
  const [path, setPath] = useState(() => window.location.pathname);
  const activeProject = useMemo(() => getProjectFromPath(path), [path]);

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

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
      <Header onNavigate={navigate} />
      {activeProject ? <ProjectDetail project={activeProject} onNavigate={navigate} /> : <ResumeHome onNavigate={navigate} />}
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
            <h1>Md Al-Amin</h1>
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
              Senior year EEE student at BUET working where intelligent software, signal
              processing, embedded systems, and research prototypes meet.
            </p>
          </div>
        </div>
      </section>

      <ResumeSection title="Proficiencies" id="proficiencies">
        {proficiencies.map((group) => (
          <NoteBlock key={group.title} title={group.title} items={group.items.map((label) => ({ label }))} />
        ))}
      </ResumeSection>

      <ResumeSection title="Work" id="work">
        {work.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.organization}`} entry={entry} />
        ))}
      </ResumeSection>

      <ResumeSection title="Education" id="education">
        {education.map((entry) => (
          <TimelineEntry key={`${entry.title}-${entry.organization}`} entry={entry} />
        ))}
      </ResumeSection>

      <ResumeSection title="Certificates" id="certificates">
        {certificates.map((item) => (
          <SimpleEntry key={item.title} title={item.title} meta={item.meta} />
        ))}
      </ResumeSection>

      <ResumeSection title="Projects" id="projects" bodyClassName="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onNavigate={onNavigate} />
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

function Header({ onNavigate }: { onNavigate: (href: string) => void }) {
  const goHome = (event: MouseEvent<HTMLAnchorElement>, hash = "") => {
    event.preventDefault();
    onNavigate(`/${hash}`);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/#hero" className="brand-link" onClick={(event) => goHome(event, "#hero")}>
          Md Al-Amin&apos;s Resume
        </a>
        <nav aria-label="Resume sections">
          <a href="/#proficiencies" onClick={(event) => goHome(event, "#proficiencies")}>Proficiencies</a>
          <a href="/#work" onClick={(event) => goHome(event, "#work")}>Work</a>
          <a href="/#projects" onClick={(event) => goHome(event, "#projects")}>Projects</a>
          <a href="/#contact" onClick={(event) => goHome(event, "#contact")}>Contact</a>
        </nav>
        <a className="menu-button" href={resumeUrl} target="_blank" rel="noreferrer">
          <DownloadIcon />
          CV
        </a>
      </div>
    </header>
  );
}

function ProjectDetail({ project, onNavigate }: { project: Project; onNavigate: (href: string) => void }) {
  const nextProject = getNextProject(project.slug);

  return (
    <main>
      <article className="project-page">
        <section className="project-hero-section" aria-label={`${project.title} project`}>
          <div className="project-page-container">
            <div className="project-hero-top">
              <div className="project-heading">
                <h1>{project.title}</h1>
                <h2>{project.subtitle}</h2>
              </div>
              <ul className="project-facts" aria-label="Project facts">
                <li>
                  <span>Year</span>
                  <strong>{project.year}</strong>
                </li>
                <li>
                  <span>Type of Project</span>
                  <strong>{project.type}</strong>
                </li>
                <li>
                  <span>My Role</span>
                  <strong>{project.role}</strong>
                </li>
              </ul>
            </div>
            <figure className="project-banner">
              <img src={project.image} alt="" />
            </figure>
          </div>
        </section>

        <section className="case-study-section">
          <div className="project-page-container case-study-grid">
            <h2>Case Study</h2>
            <div className="case-study-content">
              <CaseStudyBlock title="Objective">
                <p>{project.caseStudy.objective}</p>
              </CaseStudyBlock>
              <CaseStudyBlock title="Process">
                <p>{project.caseStudy.process}</p>
              </CaseStudyBlock>
              <CaseStudyBlock title="Outcome">
                <p>{project.caseStudy.outcome}</p>
              </CaseStudyBlock>
              <CaseStudyBlock title="Standout Features">
                <ul>
                  {project.caseStudy.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CaseStudyBlock>
              {project.externalHref ? (
                <a className="text-link project-source-link" href={project.externalHref} target="_blank" rel="noreferrer">
                  <span>Publication</span>
                  <ArrowIcon />
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="project-navigation-section">
          <div className="project-page-container nav-grid">
            <h2>More Projects</h2>
            <div className="next-project-row">
              <button type="button" className="text-link next-project-link" onClick={() => onNavigate(`/projects/${nextProject.slug}`)}>
                <span>Next</span>
                <ArrowIcon />
              </button>
              <p>{nextProject.title}</p>
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

function SimpleEntry({ title, meta }: { title: string; meta: string }) {
  return (
    <article className="simple-entry">
      <h3>{title}</h3>
      <p>{meta}</p>
    </article>
  );
}

function ProjectCard({ project, onNavigate }: { project: Project; onNavigate: (href: string) => void }) {
  const content = (
    <>
      <span className="project-arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
      <div className="project-content">
        <span className="project-mark">{project.mark}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
      </div>
    </>
  );

  return (
    <a
      className="project-card"
      href={`/projects/${project.slug}`}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(`/projects/${project.slug}`);
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
      <span>Built as a dark mode technical resume</span>
      <span>Dhaka, Bangladesh</span>
    </footer>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 18v2h14v-2" />
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

function getProjectFromPath(path: string) {
  const match = path.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return undefined;
  return projects.find((project) => project.slug === match[1]);
}

function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export default App;
