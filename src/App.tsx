import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/* ─────────────────────────── Content ─────────────────────────── */

const resumeUrl =
  "https://drive.google.com/file/d/1CWkpabhO-R3XEt4o7VIXqH5flWzJBNyf/view?usp=sharing";

const email = "alamin20351@gmail.com";

const navLinks = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

type Research = {
  title: string;
  period: string;
  supervisor: string;
  affiliation: string;
  icon: IconName;
  status?: string;
  points: string[];
  tags: string[];
};

const research: Research[] = [
  {
    title: "Brain Iron and Parkinson’s Disease: Quantitative Susceptibility Mapping and Genetics",
    period: "2026",
    supervisor: "Dr. Maruf Ahmed, Assistant Professor",
    affiliation: "Department of EEE, BUET",
    icon: "brain",
    status: "Manuscript in preparation",
    points: [
      "Studied cortical iron in Parkinson’s disease with QSM (96 patients, 35 controls, 180 regions) against Allen Human Brain Atlas gene expression, using spin-based null models. An exploratory astrocyte-gene association with the disease-related iron increase was modest (r = 0.28) and did not replicate in an independent dataset.",
      "Benchmarked null models for brain-map association tests: naive tests produced at least one false finding in 51–80% of 184-test null studies and competitive tests in 98–100%, while spin-based tests stayed at 0–2.5%.",
      "Ran a pre-registered genetic analysis with UK Biobank brain-iron GWAS (about 39,500 people, 8 deep-brain regions; QSM and T2*): colocalisation at 23 Parkinson’s risk loci found shared signals at LRRK2 (putamen), VPS13C (substantia nigra) and HIP1R, and fine-mapping separated the LRRK2 signal from a neighbouring MUC19 signal. Genome-wide genetic correlation was null.",
    ],
    tags: ["QSM", "Neuroimaging", "Allen Human Brain Atlas", "Spin null models", "UK Biobank GWAS", "Colocalisation", "Fine-mapping"],
  },
  {
    title: "Cyclone Impact Prediction at Upazila Level, Bangladesh",
    period: "2026",
    supervisor: "Prof. Dr. Anisul Haque",
    affiliation: "Institute of Water and Flood Management (IWFM), BUET",
    icon: "storm",
    points: [
      "Built a storm–upazila panel (471 observations, 12 cyclones, 2007–2024) from IBTrACS, ERA5, SRTM and BBS census and poverty data, with damage taken from 560 Department of Disaster Management D-Form records, to predict damage and priority upazilas for the Cyclone Classifier Model (CCM).",
      "Under leave-one-cyclone-out validation, supervised models ranked damage within an unseen storm with mean Spearman ρ = 0.64 (storm-independent model 0.55, exposure-only baseline 0.18). A damage function with a surge-exposure term reached ρ = 0.76 across storms, against at most 0.16 for peak wind.",
    ],
    tags: ["IBTrACS", "ERA5", "SRTM", "Geospatial ML", "Leave-one-cyclone-out CV", "Disaster risk"],
  },
];

type Publication = {
  title: string;
  authors: string[];
  venue: string;
  short: string;
  summary: string;
  href: string;
  logo: string;
  highlights: string[];
};

const me = "Md. Al Amin";

const publications: Publication[] = [
  {
    title:
      "Bridging Spectral Specificity and Semantic Generalization for Respiratory Sound Classification: A Comparative Study of MFCCs and Augmented YAMNet Embeddings",
    authors: [me, "Mohammad Al Hosan Kanon", "Md. Muaz Rahman"],
    venue:
      "2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)",
    short: "IEEE QPAIN 2026",
    summary:
      "Augmented YAMNet pipeline with latent-space SMOTE (k = 5) on ICBHI 2017, reaching 93.03% accuracy, 91.7% recall for infections, and about 0.0005 s per-sample inference latency for edge deployment.",
    href: "https://ieeexplore.ieee.org/document/11546080",
    logo: "/assets/img/project/qpain2026.jpg",
    highlights: ["First author"],
  },
  {
    title: "IoT-Based Real-Time Monitoring and Preservation System for Small-Scale Fruit Storage",
    authors: ["Mohammad Al Hosan Kanon", "Md. Muaz Rahman", "Puspita Mobarak", me],
    venue: "2026 5th International Conference on Electrical, Computer & Telecommunication Engineering (ICECTE)",
    short: "ICECTE 2026",
    summary:
      "Closed-loop control (ESP8266, Arduino) of temperature, humidity and VOC levels to reduce post-harvest loss.",
    href: "https://ieeexplore.ieee.org/document/11429225",
    logo: "/assets/img/project/icete2026.jpg",
    highlights: [],
  },
  {
    title: "Design and Implementation of a Dual-Mode Floor Mopping Robot",
    authors: [
      "Mohammad Al Hosan Kanon",
      "Ilias Ahmad",
      "Dipto Archishman Saha",
      me,
      "Nahian Tasnim",
      "Puspita Mobarak",
    ],
    venue:
      "2025 IEEE 4th International Conference on Robotics, Automation, Artificial-Intelligence and Internet-of-Things (RAAICON)",
    short: "IEEE RAAICON 2025",
    summary: "Autonomous navigation with ultrasonic sensors, gyroscopes and DC motor control.",
    href: "https://ieeexplore.ieee.org/document/11502377",
    logo: "/assets/img/project/raaicon2025.jpg",
    highlights: [],
  },
];

type Category = "Machine Learning" | "Power" | "Signal Processing" | "Electronics";

type Project = {
  title: string;
  label: string;
  category: Category;
  icon: IconName;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
  award?: string;
};

const projects: Project[] = [
  {
    title: "Respiratory Sound Classification",
    label: "Published · IEEE QPAIN 2026",
    category: "Machine Learning",
    icon: "lungs",
    description:
      "Compared MFCC features with augmented YAMNet audio embeddings on the ICBHI 2017 respiratory sound benchmark, using latent-space SMOTE to handle class imbalance, with an eye on low-latency edge deployment.",
    tags: ["YAMNet", "MFCC", "SMOTE", "ICBHI 2017"],
    link: { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11546080" },
  },
  {
    title: "Audio Deepfake Detection",
    label: "Course project · EEE 402",
    category: "Machine Learning",
    icon: "wave",
    description:
      "Revisited audio deepfake detection by comparing handcrafted acoustic features with deep learning models, with a focus on cross-speaker generalisation, speaker adaptation and model interpretability.",
    tags: ["Audio forensics", "Deep learning", "Interpretability"],
  },
  {
    title: "Pulmonary Disease Detection from Lung Sounds",
    label: "Course project · EEE 312",
    category: "Signal Processing",
    icon: "lungs",
    description:
      "Signal processing and machine learning pipeline for lung-sound recordings: spectrogram analysis, handcrafted features and pretrained audio embeddings, evaluated for generalisation across patients.",
    tags: ["DSP", "Spectrograms", "Classification"],
  },
  {
    title: "Deep Learning–Based Emotion Management System",
    label: "International AI Fair, China · 2020",
    category: "Machine Learning",
    icon: "spark",
    description:
      "High-school project that used deep learning for emotion management. Placed runner-up at the International AI Fair for High School Students in China.",
    tags: ["Deep learning"],
    award: "Runner-up",
  },
  {
    title: "Graphene-Based Multiband Terahertz Metasurface Absorber",
    label: "Undergraduate thesis · BUET",
    category: "Electronics",
    icon: "grid",
    description:
      "Designed and optimised a graphene-based multiband THz metasurface absorber on different dielectric substrates, simulated in CST Studio Suite. Supervised by Dr. Md. Shah Alam.",
    tags: ["CST Studio Suite", "Metasurfaces", "Terahertz", "Graphene"],
  },
  {
    title: "Dual-Mode Floor Mopping Robot",
    label: "Published · IEEE RAAICON 2025",
    category: "Electronics",
    icon: "robot",
    description:
      "Autonomous floor-mopping robot with two operating modes, using ultrasonic ranging and gyroscope feedback for navigation and DC motor control.",
    tags: ["Robotics", "Ultrasonic sensors", "Gyroscope", "DC motors"],
    link: { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11502377" },
  },
  {
    title: "IoT Fruit Storage Monitoring and Preservation",
    label: "Published · ICECTE 2026 · EEE 416",
    category: "Electronics",
    icon: "chip",
    description:
      "Real-time monitoring and closed-loop control of temperature, humidity and VOC levels for small-scale fruit storage, built on ESP8266 and Arduino.",
    tags: ["ESP8266", "Arduino", "IoT", "Closed-loop control"],
    link: { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11429225" },
  },
  {
    title: "Precision Pesticide Spraying & Crop Health Drone",
    label: "Course project · EEE 404",
    category: "Electronics",
    icon: "drone",
    description:
      "Drone for targeted pesticide spraying and crop health monitoring, combining onboard cameras, real-time analysis and field mapping on an embedded platform.",
    tags: ["UAV", "Embedded systems", "Agritech"],
  },
  {
    title: "Smart-Grid UPS with Bidirectional Inverter",
    label: "Course project · EEE 316",
    category: "Power",
    icon: "bolt",
    description:
      "Designed and built a smart-grid style UPS around a bidirectional inverter, handling grid-to-battery charging and battery-to-grid supply under microcontroller control.",
    tags: ["Power electronics", "Inverters", "Microcontroller"],
  },
  {
    title: "UART Design in Verilog for FPGA",
    label: "Course project · EEE 304",
    category: "Electronics",
    icon: "chip",
    description:
      "Implemented a UART transmitter and receiver in Verilog HDL for FPGA, covering serial framing, baud-rate timing and synchronous clock-domain design.",
    tags: ["Verilog", "FPGA", "Serial communication"],
  },
  {
    title: "FM Transmitter and Receiver",
    label: "Course project · EEE 310",
    category: "Signal Processing",
    icon: "radio",
    description: "Built and tested a frequency-modulation transmitter and receiver circuit for analog communication.",
    tags: ["Analog communication", "RF circuits"],
  },
  {
    title: "Three-Phase Induction Motor Rewinding",
    label: "Course project · EEE 206",
    category: "Power",
    icon: "motor",
    description:
      "Hands-on rewinding of a three-phase induction motor, from winding schematic to reassembly and performance testing.",
    tags: ["Electrical machines", "Hardware practical"],
  },
  {
    title: "Stability Study of the IEEE 30-Bus System",
    label: "Course project · EEE 306",
    category: "Power",
    icon: "network",
    description:
      "Power-flow and voltage-stability study of the IEEE 30-bus test system under increasing levels of solar PV penetration, simulated in PSS/E.",
    tags: ["PSS/E", "Power systems", "PV integration"],
  },
  {
    title: "Numerical Solution of the Heat Conduction Equation",
    label: "Course project · EEE 212",
    category: "Power",
    icon: "heat",
    description:
      "Solved the heat conduction equation numerically in MATLAB and visualised steady-state temperature distributions and heat-generation profiles.",
    tags: ["MATLAB", "Numerical methods"],
  },
  {
    title: "Integrated Electrical Services Design",
    label: "Course project · EEE 414",
    category: "Power",
    icon: "building",
    description: "Electrical services layout and wiring design for a multi-room building, drafted in AutoCAD.",
    tags: ["AutoCAD", "Building services"],
  },
  {
    title: "AM Modulation and Demodulation",
    label: "Course project · EEE 208",
    category: "Signal Processing",
    icon: "wave",
    description: "Implemented amplitude modulation and demodulation and analysed the resulting signals.",
    tags: ["Communication systems", "Signals"],
  },
];

const categories: Array<"All" | Category> = ["All", "Machine Learning", "Power", "Signal Processing", "Electronics"];

type Experience = {
  role: string;
  organization: string;
  period: string;
  icon: IconName;
  description: string;
};

const experience: Experience[] = [
  {
    role: "General Secretary",
    organization: "IEEE BUET Signal Processing Society Student Chapter",
    period: "May 2025 – June 2026",
    icon: "users",
    description: "Organized technical seminars, workshops and networking events with the executive committee.",
  },
  {
    role: "Assistant General Secretary",
    organization: "BUET Entrepreneurship Development Club",
    period: "June 2022 – April 2025",
    icon: "briefcase",
    description: "Organized skill-development events and managed local and outside sponsorships.",
  },
  {
    role: "Chief Technology Officer",
    organization: "Paintbeatart.com",
    period: "June 2020 – December 2022",
    icon: "code",
    description: "Built an e-commerce platform supporting 100+ artists; won the Bangabandhu Innovation Grant 2021.",
  },
  {
    role: "Fundraiser / Lead",
    organization: "Volunteer for Bangladesh",
    period: "August 2019 – June 2022",
    icon: "heart",
    description: "Distributed 400 kg of food supplies annually to 300+ underprivileged families.",
  },
];

const honors = [
  {
    title: "Runner-up, International AI Fair for High School Students",
    sub: "China · 2020 · for a deep learning-based emotion management system",
  },
  { title: "Appreciation Award, Home Secretary of Bangladesh", sub: "2021" },
  { title: "Bangabandhu Innovation Grant (BIG)", sub: "2021 · Paintbeatart.com" },
  { title: "Fellowship, Centre for Bangladesh Studies (CBS)", sub: "2020" },
  { title: "Champion (Campus Round), Hult Prize", sub: "2023" },
];

const skills = [
  {
    title: "Programming",
    items: ["Python (NumPy, Pandas, SciPy)", "scikit-learn, PyTorch, TensorFlow", "Matplotlib", "C, MATLAB", "SQL, Bash"],
  },
  {
    title: "Machine Learning",
    items: [
      "Large language models (LLMs)",
      "Transformers & attention models",
      "Deep learning (CNN, LSTM)",
      "Transfer learning & audio embeddings (YAMNet)",
      "Gradient-boosted trees",
      "Class imbalance (SMOTE), cross-validation & statistical testing",
    ],
  },
  {
    title: "Signal & Image",
    items: [
      "Audio feature extraction (MFCC)",
      "Computer vision (OpenCV)",
      "Pose estimation",
      "Neuroimaging (QSM, brain atlases)",
    ],
  },
  {
    title: "Hardware / IoT",
    items: ["Arduino, ESP8266", "Raspberry Pi", "Sensor fusion", "PCB design"],
  },
  {
    title: "Tools",
    items: ["CST Studio Suite", "COMSOL Multiphysics", "Git, Linux", "LaTeX"],
  },
  {
    title: "Languages",
    items: ["English", "Bangla"],
  },
];

/* ─────────────────────────── App ─────────────────────────── */

const sectionIds = navLinks.map((link) => link.id);

function App() {
  const activeSection = useActiveSection(sectionIds);
  useRevealOnScroll();

  return (
    <>
      <Nav active={activeSection} />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Education />
        <Divider />
        <ResearchSection />
        <Divider />
        <Publications />
        <Divider />
        <Projects />
        <Divider />
        <ExperienceSection />
        <Divider />
        <Skills />
        <Contact />
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} MD Al Amin · Dhaka, Bangladesh</footer>
    </>
  );
}

function Nav({ active }: { active: string }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#hero">
          MD Al Amin
        </a>
        <nav aria-label="Sections" className="nav-links">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={active === link.id ? "active" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-primary btn-sm nav-cv" href={resumeUrl} target="_blank" rel="noreferrer">
          CV <Icon name="arrow" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-tag">Open to research opportunities</div>
          <h1>
            Machine learning for
            <br />
            <em>brain &amp; biomedical</em> signals.
          </h1>
          <p className="hero-desc">
            I’m <strong>MD Al Amin</strong>, an Electrical and Electronic Engineering graduate of{" "}
            <strong>BUET</strong> (2022–2026). I work on machine learning for biomedical signals and
            neuroimaging, signal and image processing, wireless communication, and metasurfaces.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#publications">
              View Publications
            </a>
            <a className="btn btn-ghost" href={resumeUrl} target="_blank" rel="noreferrer">
              Download CV
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in Touch
            </a>
          </div>
          <div className="hero-stats">
            <Stat num="3" label="Publications" />
            <Stat num="2" label="Research Projects" />
            <Stat num={`${projects.length}`} label="Projects" />
            <Stat num="5" label="Honors & Awards" />
          </div>
        </div>
        <figure className="hero-photo">
          <img src="/assets/img/headshot.jpg" alt="Portrait of MD Al Amin" />
          <figcaption>
            <span className="photo-name">MD Al Amin</span>
            <span className="photo-sub">B.Sc. in EEE · BUET</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="stat-num">{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function SectionHead({ label, title }: { label: string; title: ReactNode }) {
  return (
    <>
      <div className="section-label">{label}</div>
      <h2>{title}</h2>
    </>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id}>
      <div className="container reveal">{children}</div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionHead
        label="About Me"
        title={
          <>
            Engineer by training,
            <br />
            researcher by curiosity.
          </>
        }
      />
      <div className="two-col prose">
        <div>
          <p>
            I studied Electrical and Electronic Engineering at{" "}
            <strong>Bangladesh University of Engineering and Technology (BUET)</strong>. My research interests are
            machine learning for biomedical signals and neuroimaging, brain disorders, quantitative MRI, signal and
            image processing, <strong>wireless communication</strong>, and <strong>metasurfaces</strong> for
            terahertz applications.
          </p>
          <p>
            At BUET my coursework covered <strong>digital signal processing</strong>, random signals and
            processes, <strong>machine learning</strong>, medical imaging, <strong>wireless</strong>, optical, radar and
            satellite communication, control systems, and microprocessors and embedded systems.
          </p>
        </div>
        <div>
          <p>
            I have co-authored <strong>three IEEE conference papers</strong> on respiratory sound classification,
            IoT-based fruit storage and a dual-mode cleaning robot. My undergraduate thesis designed a{" "}
            <strong>graphene-based terahertz metasurface absorber</strong> in CST Studio Suite.
          </p>
          <p>
            Outside the lab I served as General Secretary of the{" "}
            <strong>IEEE BUET Signal Processing Society Student Chapter</strong> and as CTO of Paintbeatart.com, which
            won the Bangabandhu Innovation Grant in 2021.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education">
      <SectionHead label="Education" title="Academic background." />
      <div className="stack">
        <article className="card row-card">
          <IconBox name="cap" />
          <div>
            <div className="card-title">Bangladesh University of Engineering and Technology (BUET), Dhaka</div>
            <div className="card-sub">B.Sc. in Electrical and Electronic Engineering</div>
            <div className="card-meta">January 2022 – June 2026</div>
            <p className="card-body">
              <strong>Undergraduate thesis:</strong> Design and Optimization of Graphene-based Multiband Terahertz
              Meta-Surface Absorber on Different Dielectric Substrates (simulated in CST Studio Suite). Supervisor: Dr.
              Md. Shah Alam.
            </p>
            <Tags
              items={[
                "Digital Signal Processing",
                "Machine Learning",
                "Control Systems",
                "Microprocessors & Interfacing",
                "Data Structures and Algorithms",
              ]}
            />
          </div>
        </article>
        <article className="card row-card">
          <IconBox name="school" />
          <div>
            <div className="card-title">Sylhet Cadet College, Sylhet</div>
            <div className="card-sub">Higher Secondary Certificate (HSC) and Secondary School Certificate (SSC)</div>
          </div>
        </article>
      </div>
    </Section>
  );
}

function ResearchSection() {
  return (
    <Section id="research">
      <SectionHead label="Research Experience" title="What I’ve been investigating." />
      <div className="stack">
        {research.map((item) => (
          <article key={item.title} className="card row-card">
            <IconBox name={item.icon} />
            <div>
              <div className="card-title">{item.title}</div>
              <div className="card-sub">
                Supervisor: {item.supervisor}, {item.affiliation}
              </div>
              <div className="card-meta">
                {item.period}
                {item.status ? <span className="tag accent inline-tag">{item.status}</span> : null}
              </div>
              <ul className="card-list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Tags items={item.tags} accentCount={3} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Publications() {
  return (
    <Section id="publications">
      <SectionHead label="Publications" title="Peer-reviewed work." />
      <ol className="stack pub-list">
        {publications.map((pub, index) => (
          <li key={pub.href} className="card pub-card">
            <a className="pub-logo" href={pub.href} target="_blank" rel="noreferrer" aria-hidden="true" tabIndex={-1}>
              <img src={pub.logo} alt="" />
            </a>
            <div className="pub-content">
              <div className="pub-top">
                <span className="pub-index">[{index + 1}]</span>
                <span className="tag accent">{pub.short}</span>
                {pub.highlights.map((h) => (
                  <span key={h} className="tag award">
                    {h}
                  </span>
                ))}
              </div>
              <h3 className="pub-title">
                <a href={pub.href} target="_blank" rel="noreferrer">
                  {pub.title}
                </a>
              </h3>
              <p className="pub-authors">
                {pub.authors.map((author, i) => (
                  <span key={author}>
                    {author === me ? <strong>{author}</strong> : author}
                    {i < pub.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="pub-venue">{pub.venue}</p>
              <p className="pub-summary">{pub.summary}</p>
              <a className="link-btn" href={pub.href} target="_blank" rel="noreferrer">
                <Icon name="doc" /> Read on IEEE Xplore <Icon name="arrow" />
              </a>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <Section id="projects">
      <SectionHead label="Projects" title="Things I’ve built." />
      <div className="filters" aria-label="Filter projects">
        {categories.map((category) => {
          const count =
            category === "All" ? projects.length : projects.filter((p) => p.category === category).length;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              className={filter === category ? "filter active" : "filter"}
              onClick={() => setFilter(category)}
            >
              {category} <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="projects-grid">
        {visible.map((project) => (
          <article key={project.title} className="card proj-card">
            <div className="proj-header">
              <IconBox name={project.icon} />
              {project.link ? (
                <a className="link-btn small" href={project.link.href} target="_blank" rel="noreferrer">
                  {project.link.label} <Icon name="arrow" />
                </a>
              ) : null}
            </div>
            <div className="proj-label">{project.label}</div>
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-desc">{project.description}</p>
            <div className="tags">
              {project.award ? <span className="tag award">{project.award}</span> : null}
              {project.tags.map((tag, i) => (
                <span key={tag} className={i === 0 ? "tag accent" : "tag"}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience">
      <div className="two-col wide-gap">
        <div>
          <SectionHead label="Experience & Leadership" title="Where I’ve contributed." />
          <div className="stack">
            {experience.map((item) => (
              <article key={item.organization} className="card row-card compact">
                <IconBox name={item.icon} />
                <div>
                  <div className="card-title">{item.role}</div>
                  <div className="card-sub">{item.organization}</div>
                  <div className="card-meta">{item.period}</div>
                  <p className="card-body">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div>
          <SectionHead label="Honors" title="Recognition." />
          <div className="stack">
            {honors.map((honor) => (
              <article key={honor.title} className="card ach-card">
                <IconBox name="award" small />
                <div>
                  <div className="ach-title">{honor.title}</div>
                  <div className="ach-sub">{honor.sub}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHead label="Technical Skills" title="Tools of the trade." />
      <div className="skills-grid">
        {skills.map((group) => (
          <div key={group.title} className="card skill-group">
            <div className="skill-group-title">{group.title}</div>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const links: Array<{ label: string; href: string; icon: IconName }> = [
    { label: email, href: `mailto:${email}`, icon: "mail" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amin035/", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/Alamin35", icon: "github" },
    { label: "Curriculum Vitae", href: resumeUrl, icon: "doc" },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container reveal">
        <div className="section-label">Contact</div>
        <h2>Let’s work together.</h2>
        <p className="subtitle">
          I’m open to research positions and collaborations in biomedical signal processing, neuroimaging and applied
          machine learning. Email is the best way to reach me.
        </p>
        <div className="contact-links">
          {links.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                className="contact-link"
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <Icon name={link.icon} />
                {link.label}
              </a>
            );
          })}
        </div>
        <p className="contact-place">
          <Icon name="pin" /> Dhaka, Bangladesh
        </p>
      </div>
    </section>
  );
}

function Tags({ items, accentCount = 0 }: { items: string[]; accentCount?: number }) {
  return (
    <div className="tags">
      {items.map((item, i) => (
        <span key={item} className={i < accentCount ? "tag accent" : "tag"}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Divider() {
  return <hr className="section-divider" />;
}

/* ─────────────────────────── Hooks ─────────────────────────── */

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.04 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────── Icons ─────────────────────────── */

type IconName =
  | "arrow"
  | "award"
  | "brain"
  | "bolt"
  | "briefcase"
  | "building"
  | "cap"
  | "chip"
  | "code"
  | "doc"
  | "drone"
  | "github"
  | "grid"
  | "heart"
  | "heat"
  | "linkedin"
  | "lungs"
  | "mail"
  | "motor"
  | "network"
  | "pin"
  | "radio"
  | "robot"
  | "school"
  | "spark"
  | "storm"
  | "users"
  | "wave";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M7 17 17 7M9 7h8v8" />,
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 3A2.5 2.5 0 0 0 7 5.5v.1A3 3 0 0 0 4.5 9a3 3 0 0 0 .4 4.5A3 3 0 0 0 7 18.4V19a2 2 0 0 0 4 0V5.5A2.5 2.5 0 0 0 9.5 3Z" />
      <path d="M14.5 3A2.5 2.5 0 0 1 17 5.5v.1A3 3 0 0 1 19.5 9a3 3 0 0 1-.4 4.5 3 3 0 0 1-2.1 4.9V19a2 2 0 0 1-4 0V5.5A2.5 2.5 0 0 1 14.5 3Z" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  briefcase: <path d="M4 7h16v13H4zM9 7V5h6v2M4 13h16" />,
  building: <path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M3 21h18" />,
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  doc: (
    <>
      <path d="M14 3H6v18h12V7l-4-4Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  drone: (
    <>
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  grid: <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />,
  heart: <path d="M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20Z" />,
  heat: <path d="M12 2c1 3-3 5-3 9a3 3 0 0 0 6 0c0-1.5-.8-2.5-1-3.5 2 1 4 3.5 4 6.5a6 6 0 0 1-12 0c0-5 6-7 6-12Z" />,
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  lungs: (
    <>
      <path d="M12 3v9M12 10c-1 2-3 2-3 2M12 10c1 2 3 2 3 2" />
      <path d="M8 7C5 7 3 13 3 17c0 2 1 3 3 3 3 0 3-2 3-4V9c0-1-.5-2-1-2ZM16 7c3 0 5 6 5 10 0 2-1 3-3 3-3 0-3-2-3-4V9c0-1 .5-2 1-2Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  motor: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  network: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M7 6h10M6.5 7.5l4 3M17.5 7.5l-4 3M10.5 13.5l-4 3M13.5 13.5l4 3M7 18h10" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  radio: (
    <>
      <path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9 16h6M2 12v3M22 12v3" />
    </>
  ),
  school: <path d="M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5M12 10h.01" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  storm: (
    <>
      <path d="M21 6c-4-2-9-2-12 1-2 2-2 5 0 7M3 18c4 2 9 2 12-1 2-2 2-5 0-7" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.5.6 4 2.7 4 6" />
    </>
  ),
  wave: <path d="M2 12h2l2-6 3 12 3-15 3 15 3-9 2 3h2" />,
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

function IconBox({ name, small = false }: { name: IconName; small?: boolean }) {
  return (
    <div className={small ? "icon-box small" : "icon-box"}>
      <Icon name={name} />
    </div>
  );
}

export default App;
