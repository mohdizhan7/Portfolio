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

/* Magnetic link (typed for motion.a so MotionValues in style are allowed) */
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

const projects = [
  {
    title: 'ITC — WMS/TMS Site Setup & Ops Ramp',
    role: 'Assistant Project Manager · StackBOX',
    bullets: [
      'BRD → SOPs/KPIs, task configuration, stakeholder alignment',
      'Testing → go-live, cost tracking & governance',
    ],
    impact: 'Stable operations with clear KPIs and smoother inter-team handoffs.',
  },
  {
    title: 'P&G Philippines — Rendering Process Optimisation',
    role: 'Project Manager / Account Lead',
    bullets: [
      'AS-IS → TO-BE, tuned rules & task configs',
      'Exception dashboards + training for floor teams',
    ],
    impact: 'Faster throughput and fewer escalations across the flow.',
  },
  {
    title: 'DTDC — COVID Backlog Clearance',
    role: 'Branch / Ops Manager',
    bullets: [
      'Partner network incl. local newspaper distributors',
      'Routing & shift orchestration to maximise coverage',
    ],
    impact: 'Cleared 15,000-shipment backlog within a week.',
  },
] as const;

export default function App() {
  /* Theme (light/dark) with persistence + system default */
  type Theme = 'light' | 'dark';
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (typeof localStorage !== 'undefined'
      ? (localStorage.getItem('theme') as Theme | null)
      : null);
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  /* Accent color (read by CSS via :root[data-accent]) */
  const [accent, setAccent] = useState<'indigo' | 'green' | 'pink'>('indigo');
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  /* Respect OS "Reduce Motion" */
  const reduceMotion = useReducedMotion();

  /* Top progress bar */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(100, (window.scrollY / max) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Section observer for right-side dots */
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

  /* Hero parallax */
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-8, 16]);
  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [ 8,-10]);

  const resumeUrl = `${import.meta.env.BASE_URL}Izhan-Resume.pdf`;

  return (
    <main>
      {/* scroll progress */}
      <div className="progress" style={{ width: `${progress}%` }} />

      {/* frosted sticky nav */}
      <div className="nav" role="navigation" aria-label="Site navigation">
        <div className="nav-inner">
          <strong>Mohd Izhan Shaikh</strong>
          <nav aria-label="Primary" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>

            {/* accent + theme controls (keyboard & screen reader friendly) */}
            <div className="swatches" aria-label="Accent colors" role="group">
              <button
                type="button"
                className="swatch indigo"
                onClick={() => setAccent('indigo')}
                title="Indigo"
                aria-label="Use indigo accent"
                aria-pressed={accent === 'indigo'}
              />
              <button
                type="button"
                className="swatch green"
                onClick={() => setAccent('green')}
                title="Green"
                aria-label="Use green accent"
                aria-pressed={accent === 'green'}
              />
              <button
                type="button"
                className="swatch pink"
                onClick={() => setAccent('pink')}
                title="Pink"
                aria-label="Use pink accent"
                aria-pressed={accent === 'pink'}
              />
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

      {/* hero */}
      <section className="hero" ref={heroRef}>
        <picture>
          <source srcSet={`${import.meta.env.BASE_URL}izhan.webp`} type="image/webp" />
          <motion.img
            src={`${import.meta.env.BASE_URL}izhan.jpg`}
            alt="Portrait of Mohd Izhan Shaikh"
            className="avatar"
            width={80}
            height={80}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.05 }}
        >
          <h1>Mohd Izhan Shaikh</h1>
          <p className="title">Assistant Project Manager, StackBOX — Supply Chain &amp; Project Delivery</p>
          <p className="tagline">
            Transforming FMCG operations with data-driven process design, SOPs/KPIs, and cost control.
          </p>
          <div className="cta" role="group" aria-label="Primary calls to action">
            <Magnet href="#work" className="btn btn--primary">View Work</Magnet>
            <Magnet href="#contact" className="btn btn--ghost">Contact</Magnet>
          </div>
        </motion.div>
      </section>

      <hr />

      {/* about */}
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

      {/* experience */}
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

      {/* work */}
      <section id="work" className="section" aria-labelledby="work-heading">
        <motion.h2 id="work-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          Work
        </motion.h2>
        <div className="grid" role="list">
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
            >
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

      {/* skills */}
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

      {/* contact */}
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

      {/* right-side section dots (announce + aria-current) */}
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
    </main>
  );
}
