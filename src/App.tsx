import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import type { HTMLMotionProps, MotionStyle } from 'framer-motion';
import './styles.css';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const rise = { hidden: { opacity:0, y: 8 }, show: { opacity:1, y:0, transition: { duration: .45, ease:'easeOut' } } };

type MagnetProps = Omit<HTMLMotionProps<'a'>, 'ref'>;
function Magnet(props: MagnetProps) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  return (
    <motion.a
      {...props}
      style={{ x: sx, y: sy } as MotionStyle}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.12);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    />
  );
}

type Project = {
  id: string;
  title: string;
  role: string;
  bullets: string[];
  impact: string;
  thumb: string;
  gallery: string[];
};
const projects: Project[] = [
  {
    id: 'itc',
    title: 'ITC — WMS/TMS Site Setup & Ops Ramp',
    role: 'Assistant Project Manager · StackBOX',
    bullets: [
      'Stabilized 2 sites in 6 weeks; SLA breaches -38%.',
      'CAPEX variance held within ±2%; SOPs/KPIs fully adopted.',
    ],
    impact: 'Owned BRD→SOP/KPI design, testing, deployment & governance.',
    thumb: 'projects/itc-thumb.svg',
    gallery: ['projects/itc-1.svg','projects/itc-2.svg'],
  },
  {
    id: 'pg',
    title: 'P&G Philippines — Rendering Process Optimisation',
    role: 'Project Manager / Account Lead',
    bullets: [
      'Throughput +14%, exceptions -22% via tuned rules & dashboards.',
      'Upskilled floor teams; KPI uplift sustained post-rollout.',
    ],
    impact: 'Led AS-IS→TO-BE, config, dashboards and rollout oversight.',
    thumb: 'projects/pg-thumb.svg',
    gallery: ['projects/pg-1.svg','projects/pg-2.svg'],
  },
  {
    id: 'dtdc',
    title: 'DTDC — COVID Backlog Clearance',
    role: 'Branch / Ops Manager',
    bullets: [
      'Cleared 15,000-shipment backlog within one week.',
      'On-time rate restored via routing & shift re-orchestration.',
    ],
    impact: 'Partner network + routing optimization under constraints.',
    thumb: 'projects/dtdc-thumb.svg',
    gallery: ['projects/dtdc-1.svg','projects/dtdc-2.svg'],
  },
];

export default function App() {
  type Theme = 'light' | 'dark';
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (typeof localStorage !== 'undefined'
      ? (localStorage.getItem('theme') as Theme | null)
      : null);
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const [accent, setAccent] = useState<'indigo' | 'green' | 'pink'>('indigo');
  useEffect(() => { document.documentElement.setAttribute('data-accent', accent); }, [accent]);

  const reduceMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(100, (window.scrollY / max) * 100)));
    };
    onScroll(); window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sections = ['about', 'experience', 'work', 'skills', 'contact'] as const;
  const [active, setActive] = useState<(typeof sections)[number]>(sections[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id as typeof active); }),
      { threshold: 0.45 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-8, 16]);
  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [ 8,-10]);

  const resumeUrl = `${import.meta.env.BASE_URL}Izhan-Resume.pdf`;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [current, setCurrent] = useState<Project | null>(null);
  function openModal(p: Project, start = 0) { setCurrent(p); setModalIdx(start); setModalOpen(true); }
  function closeModal(){ setModalOpen(false); }

  useEffect(()=>{
    if(!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if(e.key === 'Escape') closeModal();
      if(!current) return;
      if(e.key === 'ArrowLeft')  setModalIdx(i => Math.max(0, i-1));
      if(e.key === 'ArrowRight') setModalIdx(i => Math.min(current.gallery.length-1, i+1));
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  },[modalOpen, current]);

  return (
    <main>
      <div className="progress" style={{ width: `${progress}%` }} />

      <div className="nav" role="navigation" aria-label="Site navigation">
        <div className="nav-inner">
          <strong>Mohd Izhan Shaikh</strong>
          <nav aria-label="Primary" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>

            <div className="swatches" aria-label="Accent colors" role="group">
              <button type="button" className="swatch indigo" onClick={() => setAccent('indigo')} title="Indigo" aria-label="Use indigo accent" aria-pressed={accent==='indigo'} />
              <button type="button" className="swatch green"  onClick={() => setAccent('green')}  title="Green"  aria-label="Use green accent"  aria-pressed={accent==='green'} />
              <button type="button" className="swatch pink"   onClick={() => setAccent('pink')}   title="Pink"   aria-label="Use pink accent"   aria-pressed={accent==='pink'} />
            </div>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </div>

      <section className="hero" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true"></div>

        <picture>
          <source
            srcSet={`${import.meta.env.BASE_URL}izhan.webp`}
            type="image/webp"
            sizes="(max-width: 700px) 56px, 80px"
          />
          <motion.img
            src={`${import.meta.env.BASE_URL}izhan.jpg`}
            alt="Portrait of Mohd Izhan Shaikh"
            className="avatar"
            width={80}
            height={80}
            sizes="(max-width: 700px) 56px, 80px"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
          />
        </picture>

        <motion.div
          style={{ y: textY }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={rise}>Mohd Izhan Shaikh</motion.h1>
          <motion.p className="title" variants={rise}>Assistant Project Manager, StackBOX — Supply Chain &amp; Project Delivery</motion.p>
          <motion.p className="tagline" variants={rise}>
            I design SOPs/KPIs and scale WMS/TMS rollouts for FMCG — <strong>-22% cost-to-serve</strong>, <strong>+14% throughput</strong>, cleaner handoffs.
          </motion.p>
          <motion.div className="cta" role="group" aria-label="Primary call to action" style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-start'}} variants={rise}>
            <Magnet href="#work" className="btn btn--primary">View Work</Magnet>
            <a href="#contact" className="link">Or, contact me →</a>
          </motion.div>
        </motion.div>
      </section>

      <hr />

      <section id="about" className="section" aria-labelledby="about-heading">
        <motion.h2 id="about-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          About
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          Supply chain professional (6+ yrs) across logistics, procurement, and operations for ITC, HUL &amp; P&amp;G.
          Lean Six Sigma + RCA certified. I design SOPs/KPIs, lead implementations, and deliver measurable efficiency and growth.
        </motion.p>
      </section>

      <hr />

      <section id="experience" className="section" aria-labelledby="exp-heading">
        <motion.h2 id="exp-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          Experience
        </motion.h2>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
          <h3>StackBOX — Assistant Project Manager</h3>
          <p className="muted">Sep 2023 – Present</p>
          <ul>
            <li>ITC Account Lead across two sites; end-to-end process design, SOPs/KPIs, cost management.</li>
            <li>Own BRDs, testing, deployments; coordinate product &amp; dev for on-time delivery.</li>
            <li>P&amp;G (PH/IN): optimize rendering; scalable rollouts and operational success.</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
          <h3>Edgistify — Manager, Solution Design</h3>
          <ul>
            <li>Designed tailored supply-chain solutions; improved KPIs and reduced costs.</li>
            <li>Data-driven optimization; vendor management and stakeholder buy-in.</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
          <h3>Mindseed Education — Manager, Procurement &amp; Supply Chain</h3>
          <ul><li>Procurement strategy, cost analysis &amp; benchmarking, end-to-end oversight.</li></ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
          <h3>DTDC Express — Branch Manager</h3>
          <ul><li>Led 25-member team; dashboards, UAT/training, 5S &amp; RCA; improved service levels.</li></ul>
        </motion.div>
      </section>

      <hr />

      <section id="work" className="section" aria-labelledby="work-heading">
        <motion.h2 id="work-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          Work
        </motion.h2>
        <div className="work-grid" role="list">
          {projects.map((p) => (
            <motion.article
              key={p.title}
              className="card"
              role="listitem"
              aria-label={`${p.title} — ${p.role}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={reduceMotion ? {} : { y: -4, boxShadow: '0 10px 24px rgba(0,0,0,.12)' }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
              onClick={() => openModal(p, 0)}
            >
              <div className="card-media" aria-hidden="true">
                <img className="cover" alt="" src={`${import.meta.env.BASE_URL}${p.thumb}`} loading="lazy" decoding="async" />
                <button className="viewcase" type="button" onClick={(e)=>{ e.stopPropagation(); openModal(p, 0); }}>View case →</button>
              </div>
              <h3>{p.title}</h3>
              <p className="muted">{p.role}</p>
              <ul className="dashlist">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="pill">Impact</div>
              <p>{p.impact}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <hr />

      <section id="skills" className="section" aria-labelledby="skills-heading">
        <motion.h2 id="skills-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          Skills &amp; Certifications
        </motion.h2>
        <motion.p className="muted" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
          Gap Analysis · New Product Rollout · Project Governance · Process Design · Cost Management · Stakeholder Management
          <br />
          Lean Six Sigma Foundations · SAP S/4HANA Essentials · PM Foundations · Root Cause Analysis · Supply Chain Foundations
        </motion.p>
      </section>

      <hr />

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <motion.h2 id="contact-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          Contact
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
          <a href="mailto:mohdizhan7@gmail.com">mohdizhan7@gmail.com</a> ·{' '}
          <a href="https://www.linkedin.com/in/mohd-izhan-shaikh-b2a615181" target="_blank" rel="noreferrer">LinkedIn</a> ·{' '}
          <a href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>
        </motion.p>
      </section>

      <nav className="dots" aria-label="Section navigation">
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`dot ${active === id ? 'active' : ''}`}
            aria-label={`Jump to ${id} section`}
            aria-current={active === id ? 'page' : undefined}
          />
        ))}
      </nav>

      {modalOpen && current && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`${current.title} gallery`}
             onClick={(e)=>{ if(e.target === e.currentTarget) closeModal(); }}>
          <div className="modal__content">
            <button className="modal__close" aria-label="Close" onClick={closeModal}>×</button>
            <img src={`${import.meta.env.BASE_URL}${current.gallery[modalIdx]}`}
                 alt={`${current.title} image ${modalIdx+1}`} />
            <div className="modal__controls">
              <button onClick={()=>setModalIdx(i=>Math.max(0,i-1))} disabled={modalIdx===0} aria-label="Previous image">‹</button>
              <span>{modalIdx+1}/{current.gallery.length}</span>
              <button onClick={()=>setModalIdx(i=>Math.min(current.gallery.length-1,i+1))}
                      disabled={modalIdx===current.gallery.length-1} aria-label="Next image">›</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
