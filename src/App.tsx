import Lenis from "lenis";
import { useEffect, useState } from "react";

type Project = {
  title: string;
  category: string;
  image: string;
  href?: string;
};

type Experience = {
  organization: string;
  role: string;
  description: string;
  period: string;
  location: string;
  logo: string;
  logoClass: string;
};

type Education = {
  school: string;
  degree: string;
  description: string;
  period: string;
  location: string;
};

type Certification = {
  title: string;
  date: string;
  href?: string;
};

type Tool = {
  name: string;
  label: string;
  mark: string;
  tone: string;
};

type ContactLink = {
  label: string;
  value: string;
  href: string;
};

const resumeUrl =
  "https://drive.google.com/file/d/1RmXgeXgsA91VlESesK9dLXT8tSpitc1Q/view?usp=sharing";

const projects: Project[] = [
  {
    title: "Respiratory Sound Classification",
    category: "IEEE QPAIN 2026",
    image: "/assets/img/project/qpain2026.jpg",
  },
  {
    title: "IoT Fruit Storage Monitoring",
    category: "ICECTE 2026",
    image: "/assets/img/project/icete2026.jpg",
    href: "https://ieeexplore.ieee.org/document/11429225",
  },
  {
    title: "Dual-Mode Floor Mopping Robot",
    category: "RAAICON 2025",
    image: "/assets/img/project/raaicon2025.jpg",
    href: "https://ieeexplore.ieee.org/document/11502377",
  },
  {
    title: "Audio Deepfake Detection",
    category: "Signal ML",
    image: "/assets/img/project/eee402.jpg",
  },
];

const experience: Experience[] = [
  {
    organization: "IEEE BUET Signal Processing Society Student Chapter",
    role: "General Secretary",
    description:
      "Directing chapter operations, coordinating technical seminars, and helping students connect around signal processing, AI, and EEE research initiatives.",
    period: "May 2025 - Now",
    location: "Dhaka, BD",
    logo: "S",
    logoClass: "logo-red",
  },
  {
    organization: "BUET Entrepreneurship Development Club",
    role: "Assistant General Secretary",
    description:
      "Organized skill-development events, managed sponsorships, and supported professional networking programs for student builders and founders.",
    period: "June 2022 - April 2025",
    location: "Dhaka, BD",
    logo: "E",
    logoClass: "logo-mauve",
  },
  {
    organization: "Paintbeatart.com",
    role: "Chief Technology Officer",
    description:
      "Architected an e-commerce platform supporting 100+ artists and managed technical operations through Bangabandhu Innovation Grant recognition.",
    period: "June 2020 - December 2022",
    location: "Remote",
    logo: "P",
    logoClass: "logo-lime",
  },
];

const education: Education[] = [
  {
    school: "Bangladesh University of Engineering & Technology",
    degree: "BSc in Electrical and Electronic Engineering",
    description:
      "Studying power systems, control, digital signal processing, microprocessors, data structures, machine learning, and applied engineering research.",
    period: "January 2022 - June 2026",
    location: "Dhaka, BD",
  },
  {
    school: "Sylhet Cadet College",
    degree: "Higher Secondary and Secondary Certificates",
    description:
      "Completed pre-university education with board scholarship recognition and a foundation in disciplined academics and leadership.",
    period: "Completed before BUET",
    location: "Sylhet, BD",
  },
];

const certifications: Certification[] = [
  {
    title: "IEEE Research Publications in AI, IoT, and Robotics",
    date: "2025 - 2026",
  },
  {
    title: "Advanced Engineering Coursework in AI, DSP, and Embedded Systems",
    date: "2022 - 2026",
  },
];

const tools: Tool[] = [
  { name: "PyTorch", label: "AI Framework", mark: "P", tone: "tool-black" },
  { name: "MATLAB", label: "Engineering Tool", mark: "M", tone: "tool-green" },
  { name: "TypeScript", label: "Software Tool", mark: "TS", tone: "tool-blue" },
  { name: "Cursor", label: "AI Code Tool", mark: "C", tone: "tool-cream" },
];

const contactLinks: ContactLink[] = [
  { label: "E-mail", value: "alamin20351@gmail.com", href: "mailto:alamin20351@gmail.com" },
  { label: "Phone", value: "+880 160-186-2350", href: "tel:+8801601862350" },
  { label: "LinkedIn", value: "/in/amin035", href: "https://www.linkedin.com/in/amin035/" },
  { label: "GitHub", value: "github.com/Alamin35", href: "https://github.com/Alamin35" },
  { label: "BUET Mail", value: "2006088@eee.buet.ac.bd", href: "mailto:2006088@eee.buet.ac.bd" },
];

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    };

    updateTime();
    const clock = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1.2,
      touchMultiplier: 1,
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

  return (
    <main className="page-shell">
      <HeaderPill time={time} />

      <section className="hero-card reveal">
        <img className="hero-portrait" src="/assets/img/profile.jpg" alt="Md Al-Amin" />
        <div className="hero-content">
          <div className="availability">
            <span />
            Available for Work
          </div>
          <h1>Md Al-Amin</h1>
          <p>EEE Student at BUET · AI Researcher · Software Architect</p>
          <div className="hero-actions">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="pill-button">
              <DownloadIcon />
              Download CV
            </a>
            <a href="mailto:alamin20351@gmail.com" className="pill-button">
              <MailIcon />
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <SectionCard title="Overview">
        <div className="overview-copy">
          <p>
            Senior year Electrical and Electronic Engineering student at BUET, graduating in June
            2026. My work bridges hardware-level physics and advanced artificial intelligence,
            combining terahertz metasurface research with hands-on machine learning and software
            systems.
          </p>
          <p>
            I enjoy shaping practical engineering systems, from respiratory sound classification and
            robotics to embedded IoT control and agentic full-stack applications. I work best where
            signals, hardware, and intelligent software meet.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Projects">
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Experience">
        <div className="row-stack">
          {experience.map((item) => (
            <ExperienceRow key={item.organization} item={item} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Education">
        <div className="row-stack">
          {education.map((item) => (
            <EducationRow key={item.school} item={item} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Certification">
        <div className="row-stack">
          {certifications.map((item) => (
            <ActionRow key={item.title} title={item.title} meta={item.date} href={item.href} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Tools">
        <div className="tools-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </SectionCard>

      <footer className="contact-card reveal" id="contacts">
        <div className="contact-list">
          {contactLinks.map((link) => (
            <a href={link.href} key={link.label} className="contact-row" target={isExternal(link.href) ? "_blank" : undefined} rel={isExternal(link.href) ? "noreferrer" : undefined}>
              <span>{link.label}</span>
              <strong>{link.value}</strong>
              <ArrowIcon />
            </a>
          ))}
        </div>
        <p>2026 © Md Al-Amin</p>
      </footer>
    </main>
  );
}

function HeaderPill({ time }: { time: string }) {
  return (
    <header className="top-pill reveal">
      <span className="location">
        <PinIcon />
        Dhaka, Bangladesh
      </span>
      <span className="time">
        {time || "Loading"}
        <MoonIcon />
      </span>
    </header>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section-card reveal">
      <h2 className="section-chip">{title}</h2>
      {children}
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const content = (
    <>
      <div className="project-media">
        {failed ? (
          <div className="project-fallback">{project.title}</div>
        ) : (
          <img src={project.image} alt="" loading="lazy" onError={() => setFailed(true)} />
        )}
      </div>
      <div className="project-caption">
        <div>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
        <span className="arrow-button" aria-hidden="true">
          <ArrowIcon />
        </span>
      </div>
    </>
  );

  if (project.href) {
    return (
      <a className="project-card" href={project.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <article className="project-card">{content}</article>;
}

function ExperienceRow({ item }: { item: Experience }) {
  return (
    <article className="detail-row experience-row">
      <div className={`logo-mark ${item.logoClass}`}>{item.logo}</div>
      <div className="detail-copy">
        <span className="muted-label">{item.organization}</span>
        <h3>{item.role}</h3>
        <p>{item.description}</p>
        <MetaLine period={item.period} location={item.location} />
      </div>
    </article>
  );
}

function EducationRow({ item }: { item: Education }) {
  return (
    <article className="detail-row education-row">
      <div className="detail-copy full">
        <span className="muted-label">{item.school}</span>
        <h3>{item.degree}</h3>
        <p>{item.description}</p>
        <MetaLine period={item.period} location={item.location} />
      </div>
    </article>
  );
}

function ActionRow({ title, meta, href }: { title: string; meta: string; href?: string }) {
  const row = (
    <>
      <div>
        <h3>{title}</h3>
        <span className="date-meta">
          <CalendarIcon />
          {meta}
        </span>
      </div>
      <span className="arrow-button" aria-hidden="true">
        <ArrowIcon />
      </span>
    </>
  );

  if (href) {
    return (
      <a className="action-row" href={href} target="_blank" rel="noreferrer">
        {row}
      </a>
    );
  }

  return <article className="action-row">{row}</article>;
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="tool-card">
      <div className={`tool-mark ${tool.tone}`}>{tool.mark}</div>
      <div>
        <h3>{tool.name}</h3>
        <p>{tool.label}</p>
      </div>
    </article>
  );
}

function MetaLine({ period, location }: { period: string; location: string }) {
  return (
    <div className="meta-line">
      <span>
        <CalendarIcon />
        {period}
      </span>
      <span>
        <PinIcon />
        {location}
      </span>
    </div>
  );
}

function isExternal(href: string) {
  return href.startsWith("http");
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
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

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7.6 7.6 0 1 0 21 14.5Z" />
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default App;
