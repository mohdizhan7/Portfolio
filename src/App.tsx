import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './styles.css';

const fadeUp = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:.5,ease:'easeOut'}} };

const projects = [
  {
    brand: 'ITC', logo: 'itc.svg',
    title:"ITC — WMS/TMS Site Setup & Ops Ramp",
    role:"Assistant Project Manager · StackBOX",
    bullets:[
      "BRD → SOPs/KPIs, task configuration, stakeholder alignment",
      "Testing → go-live, cost tracking & governance"
    ],
    impact:"Stable operations with clear KPIs and smoother inter-team handoffs."
  },
  {
    brand: 'P&G', logo: 'pg.svg',
    title:"P&G Philippines — Rendering Process Optimisation",
    role:"Project Manager / Account Lead",
    bullets:[
      "AS-IS → TO-BE, tuned rules & task configs",
      "Exception dashboards + training for floor teams"
    ],
    impact:"Faster throughput and fewer escalations across the flow."
  },
  {
    brand: 'DTDC', logo: 'dtdc.svg',
    title:"DTDC — COVID Backlog Clearance",
    role:"Branch / Ops Manager",
    bullets:[
      "Partner network incl. local newspaper distributors",
      "Routing & shift orchestration to maximise coverage"
    ],
    impact:"Cleared 15,000-shipment backlog within a week."
  }
];

function TrustBar(){
  const logos = [
    { src: 'logos/itc.svg',  alt: 'ITC'  },
    { src: 'logos/hul.svg',  alt: 'HUL'  },
    { src: 'logos/pg.svg',   alt: 'P&G'  },
    { src: 'logos/dtdc.svg', alt: 'DTDC' },
  ];
  return (
    <section className="trust" aria-label="Companies I’ve worked with">
      <p className="trust-label">Trusted by teams at</p>
      <ul className="trust-logos">
        {logos.map(l => (
          <li key={l.alt}>
            <img src={`${import.meta.env.BASE_URL}${l.src}`} alt={l.alt} loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function App(){
  const heroRef = useRef<HTMLElement|null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end","end start"] });
  const imgY  = useTransform(scrollYProgress, [0,1], [-8, 16]);
  const textY = useTransform(scrollYProgress, [0,1], [ 8,-10]);

  return (
    <main>
      <div className="nav">
        <div className="nav-inner">
          <strong>Mohd Izhan Shaikh</strong>
          <nav>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>

      <section className="hero" ref={heroRef as any}>
        <motion.picture style={{ y: imgY }}>
          <source srcSet={`${import.meta.env.BASE_URL}izhan.webp`} type="image/webp" />
          <img src={`${import.meta.env.BASE_URL}izhan.jpg`} alt="Mohd Izhan Shaikh" className="avatar" loading="eager"/>
        </motion.picture>
        <motion.div style={{ y: textY }} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}}>
          <h1>Mohd Izhan Shaikh</h1>
          <p className="title">Assistant Project Manager, StackBOX — Supply Chain & Project Delivery</p>
          <p className="tagline">Transforming FMCG operations with data-driven process design, SOPs/KPIs, and cost control.</p>
          <div className="cta">
            <a href="#work" className="btn btn--primary">View Work</a>
            <a href="#contact" className="btn btn--ghost">Contact</a>
          </div>
        </motion.div>
      </section>

      <TrustBar />
      <hr />

      <section id="about" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>About</motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>
          Supply chain professional (6+ yrs) across logistics, procurement, and operations for ITC, HUL &amp; P&amp;G.
          Lean Six Sigma + RCA certified. I design SOPs/KPIs, lead implementations, and deliver measurable efficiency and growth.
        </motion.p>
      </section>

      <hr />

      <section id="work" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>Work</motion.h2>
        <div className="grid">
          {projects.map(p=>(
            <motion.article
              key={p.title}
              className="card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{once:true,amount:.35}}
              whileHover={{y:-4, boxShadow:'0 10px 24px rgba(0,0,0,.12)'}}
              transition={{duration:.25}}
            >
              <div className="card-head">
                <img
                  className="company-logo"
                  src={`${import.meta.env.BASE_URL}logos/${p.logo}`}
                  alt={`${p.brand} logo`}
                  loading="lazy"
                  height={20}
                />
              </div>
              <h3>{p.title}</h3>
              <p className="muted">{p.role}</p>
              <ul className="dashlist">{p.bullets.map(b=> <li key={b}>{b}</li>)}</ul>
              <div className="pill">Impact</div>
              <p>{p.impact}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <hr />

      <section id="skills" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>Skills</motion.h2>
        <p className="muted">Process design · SOP/KPI frameworks · WMS/TMS · RCA · Cost control · Stakeholder mgmt</p>
      </section>

      <hr />

      <section id="contact" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>Get in touch</motion.h2>
        <p>Email: <a href="mailto:izhan@example.com">izhan@example.com</a></p>
      </section>
    </main>
  );
}
