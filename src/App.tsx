import './styles.css';

const projects = [
  {
    title: "ITC — WMS/TMS Site Setup & Ops Ramp",
    role: "Assistant Project Manager · StackBOX",
    bullets: [
      "BRD → SOPs/KPIs, task configuration, stakeholder alignment",
      "Testing → go-live, cost tracking & governance"
    ],
    impact: "Stable operations with clear KPIs and smoother inter-team handoffs."
  },
  {
    title: "P&G Philippines — Rendering Process Optimisation",
    role: "Project Manager / Account Lead",
    bullets: [
      "AS-IS → TO-BE, tuned rules & task configs",
      "Exception dashboards + training for floor teams"
    ],
    impact: "Faster throughput and fewer escalations across the flow."
  },
  {
    title: "DTDC — COVID Backlog Clearance",
    role: "Branch / Ops Manager",
    bullets: [
      "Partner network incl. local newspaper distributors",
      "Routing & shift orchestration to maximise coverage"
    ],
    impact: "Cleared 15,000-shipment backlog within a week."
  },
];

export default function App() {
  return (
    <main>
      {/* HERO */}
      <section className="hero reveal">
        <img src="/izhan.jpg" alt="Mohd Izhan Shaikh" className="avatar" />
        <div>
          <h1>Mohd Izhan Shaikh</h1>
          <p className="title">Assistant Project Manager, StackBOX — Supply Chain & Project Delivery</p>
          <p className="tagline">
            Transforming FMCG operations with data-driven process design, SOPs/KPIs, and cost control.
          </p>
          <div className="cta">
            <a href="#work" className="btn">View Work</a>
            <a href="#contact" className="btn btn--ghost">Contact</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section reveal">
        <h2>About</h2>
        <p>
          Supply chain professional (6+ yrs) across logistics, procurement, and operations for ITC, HUL &amp; P&amp;G.
          Lean Six Sigma + RCA certified. I design SOPs/KPIs, lead implementations, and deliver measurable
          efficiency and growth.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section reveal">
        <h2>Experience</h2>

        <div className="xp">
          <h3>StackBOX — Assistant Project Manager</h3>
          <p className="muted">Sep 2023 – Present</p>
          <ul>
            <li>ITC Account Lead across two sites; end-to-end process design, SOPs/KPIs, cost management.</li>
            <li>Own BRDs, testing, deployments; coordinate product &amp; dev for on-time delivery.</li>
            <li>P&amp;G (PH/IN): optimize rendering; scalable rollouts and operational success.</li>
          </ul>
        </div>

        <div className="xp">
          <h3>Edgistify — Manager, Solution Design</h3>
          <ul>
            <li>Designed tailored supply-chain solutions; improved KPIs and reduced costs.</li>
            <li>Data-driven optimization; vendor management and stakeholder buy-in.</li>
          </ul>
        </div>

        <div className="xp">
          <h3>Mindseed Education — Manager, Procurement &amp; Supply Chain</h3>
          <ul>
            <li>Procurement strategy, cost analysis &amp; benchmarking, end-to-end oversight.</li>
          </ul>
        </div>

        <div className="xp">
          <h3>DTDC Express — Branch Manager</h3>
          <ul>
            <li>Led 25-member team; dashboards, UAT/training, 5S &amp; RCA; improved service levels.</li>
          </ul>
        </div>
      </section>

      {/* WORK / PROJECTS */}
      <section id="work" className="section reveal">
        <h2>Work</h2>
        <div className="grid">
          {projects.map((p) => (
            <article key={p.title} className="card">
              <h3>{p.title}</h3>
              <p className="muted">{p.role}</p>
              <ul className="dashlist">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="pill">Impact</div>
              <p>{p.impact}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SKILLS / CERTS */}
      <section id="skills" className="section reveal">
        <h2>Skills &amp; Certifications</h2>
        <div className="chips">
          {[
            'Gap Analysis','New Product Rollout','Project Governance','Process Design',
            'Cost Management','Stakeholder Management'
          ].map(s => <span key={s} className="chip">{s}</span>)}
        </div>
        <div className="chips">
          {[
            'Lean Six Sigma Foundations','SAP S/4HANA Essentials','PM Foundations',
            'Root Cause Analysis','Supply Chain Foundations'
          ].map(c => <span key={c} className="chip chip--ghost">{c}</span>)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section reveal">
        <h2>Contact</h2>
        <p><a href="mailto:mohdizhan7@gmail.com">mohdizhan7@gmail.com</a></p>
        <p><a href="https://www.linkedin.com/in/mohd-izhan-shaikh-b2a615181" target="_blank">LinkedIn</a></p>
      </section>
    </main>
  );
}import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Linkedin, ArrowRight, Download, Briefcase, GraduationCap,
  MapPin, ChevronRight, Star, Gauge, Sparkles,
} from 'lucide-react'

const PROFILE = {
  name: 'Mohd. Izhan Shaikh',
  title: 'Assistant Project Manager · Supply Chain',
  location: 'Bengaluru, India',
  email: 'mohdizhan7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohd-izhan-shaikh-b2a615181',
  summary:
    'Supply chain specialist with 6+ years across logistics, procurement, and operations. Experienced with FMCG leaders (ITC, HUL, P&G). Certified in Lean Six Sigma and RCA. I design resilient processes, ship on schedule, and delight stakeholders.',
}

const HIGHLIGHTS = [
  { kpi: '+6 yrs', label: 'Experience' },
  { kpi: 'FMCG', label: 'ITC · HUL · P&G' },
  { kpi: 'Lean', label: 'Six Sigma & RCA' },
  { kpi: 'E2E', label: 'Design → Go-Live' },
]

const EXPERIENCES = [
  {
    company: 'StackBOX',
    role: 'Assistant Project Manager / ITC Account Lead',
    period: 'Sep 2023 — Present',
    location: 'Bengaluru, IN',
    bullets: [
      'Optimised P&G Philippines rendering processes to global standards.',
      'Led ITC & P&G programs across multiple sites; drove SOPs, KPIs, and cost control.',
      'Coordinated cross‑functional teams for smooth deployments and adoption.',
    ],
  },
  {
    company: 'Edgistify',
    role: 'Manager – Solution Design',
    period: 'Aug 2022 — Sep 2023',
    location: 'India',
    bullets: [
      'Designed customer‑centric supply chain solutions that cut costs and cycle times.',
      'Reviewed KPIs, streamlined global workflows, and scaled best practices.',
      'Owned vendor management and delivered measurable savings.',
    ],
  },
  {
    company: 'Mindseed Education',
    role: 'Manager – Procurement & Supply Chain',
    period: 'Dec 2021 — Aug 2022',
    location: 'Mumbai, IN',
    bullets: [
      'Built procurement strategies and end‑to‑end supply chain controls.',
      'Implemented metric tracking and benchmarking to reduce spend.',
    ],
  },
  {
    company: 'DTDC Express Limited',
    role: 'Branch Manager',
    period: 'Jan 2020 — Dec 2021',
    location: 'MMR, IN',
    bullets: [
      'Directed a 25‑member team; improved service levels and dashboards.',
      'Ran UATs, trainings, and change management for new solutions.',
    ],
  },
  {
    company: 'Elite Finishing Systems',
    role: 'Design Engineer',
    period: 'Jun 2019 — Oct 2019',
    location: 'Mumbai, IN',
    bullets: [
      '3D CAD design for paint booths; coordinated suppliers and EHS compliance.',
    ],
  },
]

const EDUCATION = [
  { school: 'University of Mumbai', program: 'B.E. – Mechanical Engineering', period: '2015 — 2019' },
]

const SKILLS = [
  'Gap Analysis', 'New Product Rollout', 'Project Governance', 'SOP & KPI Design',
  'Cost Analysis', 'Stakeholder Management', 'WMS / TMS', 'Process Automation',
]

const CERTS = [
  'Lean Six Sigma Foundations',
  'Root Cause Analysis',
  'Project Management Foundations',
  'SAP S/4HANA Essentials',
  'Supply Chain Foundations',
]

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs backdrop-blur dark:border-white/10 dark:bg-white/5">
    <Sparkles className="size-3" /> {children}
  </span>
)

const NeumorphicButton: React.FC<{
  href?: string
  onClick?: () => void
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}> = ({ href, onClick, icon: Icon, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="group relative inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_8px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_12px_40px_rgba(0,0,0,0.16)] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100"
  >
    <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-sky-500/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    {Icon && <Icon className="size-4" />}
    <span>{children}</span>
    <ArrowRight className="size-4 translate-x-0 transition group-hover:translate-x-0.5" />
  </a>
)

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl"
    >
      {title}
    </motion.h2>
    {children}
  </section>
)

export default function App() {
  const [dark, setDark] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(Math.max(0, Math.min(100, (window.scrollY / max) * 100)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'education', label: 'Education' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  )

  const resumeUrl = import.meta.env.BASE_URL + 'Izhan-Resume.pdf'

  return (
    <div className="relative min-h-screen scroll-smooth bg-[radial-gradient(1200px_800px_at_70%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(1000px_600px_at_10%_-20%,rgba(99,102,241,0.18),transparent)] text-zinc-800 dark:bg-[radial-gradient(1200px_800px_at_70%_-10%,rgba(56,189,248,0.12),transparent),radial-gradient(1000px_600px_at_10%_-20%,rgba(99,102,241,0.12),transparent)] dark:text-zinc-200">
      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
        <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />
      </div>

      {/* Nav */}
      <header className="sticky top-2 z-40 mx-auto w-full max-w-6xl px-4">
        <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-zinc-900/60">
          <a href="#home" className="font-semibold tracking-tight">
            {PROFILE.name}
          </a>
          <nav className="hidden gap-2 sm:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full px-3 py-1 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-zinc-800"
            >
              <Star className="size-3" /> {dark ? 'Dark' : 'Light'}
            </button>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/10 bg-white/70 p-2 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-zinc-800"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto w-full max-w-6xl px-4 pt-24 sm:pt-32">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-white to-zinc-50 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:border-white/10 dark:from-zinc-900 dark:to-zinc-900/40">
          <div className="pointer-events-none absolute -inset-40 -z-10 blur-3xl [background:conic-gradient(from_140deg_at_50%_50%,#38bdf8_0deg,transparent_60deg,#6366f1_120deg,transparent_200deg)] opacity-30" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500"
          >
            <Gauge className="size-3" /> Transforming Supply Chains
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-balance text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl"
          >
            Apple‑clean. Human‑friendly. Execution‑obsessed.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-3xl text-pretty text-base text-zinc-600 dark:text-zinc-300 sm:text-lg"
          >
            {PROFILE.summary}
          </motion.p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>
              <MapPin className="size-3" /> {PROFILE.location}
            </Badge>
            {HIGHLIGHTS.map((h, i) => (
              <Badge key={i}>
                <strong className="font-semibold">{h.kpi}</strong>· {h.label}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <NeumorphicButton href={`mailto:${PROFILE.email}`} icon={Mail}>
              Contact
            </NeumorphicButton>
            <NeumorphicButton href={resumeUrl} icon={Download}>
              Download Résumé
            </NeumorphicButton>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-black/10 bg-white/60 p-3 text-sm backdrop-blur dark:border-white/10 dark:bg-zinc-800/60">
            <div className="flex animate-[marquee_30s_linear_infinite] gap-8 whitespace-nowrap [--tw:translateX(0)]">
              {[ 'ITC', 'HUL', 'P&G', 'Process Design', 'WMS', 'TMS', 'Cost Control', 'SOP · KPI', 'Change Management',
                 'Go‑Live', 'Stakeholders', 'Lean', 'Automation', 'Dashboards' ]
                .concat([ 'ITC', 'HUL', 'P&G', 'Process Design', 'WMS', 'TMS', 'Cost Control', 'SOP · KPI', 'Change Management',
                 'Go‑Live', 'Stakeholders', 'Lean', 'Automation', 'Dashboards' ])
                .map((t, i) => (
                  <span key={i} className="text-zinc-600 dark:text-zinc-300">{t}</span>
              ))}
            </div>
            <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
          </div>
        </div>
      </section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.company + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              className="group rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="size-5 text-sky-500" />
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                </div>
                <div className="text-xs text-zinc-500">{exp.period}</div>
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {exp.company} · {exp.location}
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                {exp.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 size-4 shrink-0 text-sky-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Certifications">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-zinc-900/60">
            <h3 className="mb-3 font-medium">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-zinc-900/60">
            <h3 className="mb-3 font-medium">Certifications</h3>
            <ul className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              {CERTS.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <Star className="size-4 text-indigo-500" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="grid gap-6">
          {EDUCATION.map((e) => (
            <div key={e.school} className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-5 text-indigo-500" />
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{e.school}</h3>
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    {e.program} · {e.period}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Let’s build something great">
        <div className="rounded-3xl border border-black/10 bg-gradient-to-b from-white to-zinc-50 p-8 text-center dark:border-white/10 dark:from-zinc-900 dark:to-zinc-900/40">
          <p className="mx-auto max-w-2xl text-pretty text-zinc-600 dark:text-zinc-300">
            I love tough problems, clear metrics, and calm execution. If you’re scaling an FMCG or operations‑heavy business, I can help design and ship the right solution.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <NeumorphicButton href={`mailto:${PROFILE.email}`} icon={Mail}>
              Email {PROFILE.email}
            </NeumorphicButton>
            <NeumorphicButton href={PROFILE.linkedin} icon={Linkedin}>
              Connect on LinkedIn
            </NeumorphicButton>
          </div>
        </div>
      </Section>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-4 text-xs text-zinc-500 dark:border-white/10 dark:bg-zinc-900/60">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind, and Framer Motion.
        </div>
      </footer>
    </div>
  )
}
