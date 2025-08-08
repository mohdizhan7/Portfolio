import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

const fadeUp = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:.5,ease:'easeOut'}} };

const projects = [
  {
    title:"ITC — WMS/TMS Site Setup & Ops Ramp",
    role:"Assistant Project Manager · StackBOX",
    bullets:["BRD → SOPs/KPIs, task configuration, stakeholder alignment","Testing → go-live, cost tracking & governance"],
    impact:"Stable operations with clear KPIs and smoother inter-team handoffs."
  },
  {
    title:"P&G Philippines — Rendering Process Optimisation",
    role:"Project Manager / Account Lead",
    bullets:["AS-IS → TO-BE, tuned rules & task configs","Exception dashboards + training for floor teams"],
    impact:"Faster throughput and fewer escalations across the flow."
  },
  {
    title:"DTDC — COVID Backlog Clearance",
    role:"Branch / Ops Manager",
    bullets:["Partner network incl. local newspaper distributors","Routing & shift orchestration to maximise coverage"],
    impact:"Cleared 15,000-shipment backlog within a week."
  }
];

export default function App(){
  const [progress,setProgress] = useState(0);
  useEffect(()=>{
    const onScroll=()=> {
      const max=document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.max(0,Math.min(100,(window.scrollY/max)*100)));
    };
    onScroll(); window.addEventListener('scroll',onScroll);
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);

  const resumeUrl = `${import.meta.env.BASE_URL}Izhan-Resume.pdf`;

  return (
    <main>
      {/* progress bar */}
      <div className="progress" style={{width:`${progress}%`}} />

      {/* frosted nav */}
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

      {/* hero */}
      <section className="hero">
        <motion.img
          src={`${import.meta.env.BASE_URL}izhan.jpg`}
          alt="Mohd Izhan Shaikh"
          className="avatar"
          initial={{opacity:0,scale:.9}}
          animate={{opacity:1,scale:1}}
          transition={{duration:.5}}
        />
        <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.6}} variants={fadeUp}>
          <h1>Mohd Izhan Shaikh</h1>
          <p className="title">Assistant Project Manager, StackBOX — Supply Chain & Project Delivery</p>
          <p className="tagline">Transforming FMCG operations with data-driven process design, SOPs/KPIs, and cost control.</p>
          <div className="cta">
            <a href="#work" className="btn">View Work</a>
            <a href="#contact" className="btn btn--ghost">Contact</a>
          </div>
        </motion.div>
      </section>

      <hr />

      {/* about */}
      <section id="about" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>About</motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>
          Supply chain professional (6+ yrs) across logistics, procurement, and operations for ITC, HUL &amp; P&amp;G.
          Lean Six Sigma + RCA certified. I design SOPs/KPIs, lead implementations, and deliver measurable efficiency and growth.
        </motion.p>
      </section>

      <hr />

      {/* experience */}
      <section id="experience" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>Experience</motion.h2>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>
          <h3>StackBOX — Assistant Project Manager</h3>
          <p className="muted">Sep 2023 – Present</p>
          <ul>
            <li>ITC Account Lead across two sites; end-to-end process design, SOPs/KPIs, cost management.</li>
            <li>Own BRDs, testing, deployments; coordinate product &amp; dev for on-time delivery.</li>
            <li>P&amp;G (PH/IN): optimize rendering; scalable rollouts and operational success.</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>
          <h3>Edgistify — Manager, Solution Design</h3>
          <ul>
            <li>Designed tailored supply-chain solutions; improved KPIs and reduced costs.</li>
            <li>Data-driven optimization; vendor management and stakeholder buy-in.</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>
          <h3>Mindseed Education — Manager, Procurement &amp; Supply Chain</h3>
          <ul><li>Procurement strategy, cost analysis &amp; benchmarking, end-to-end oversight.</li></ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>
          <h3>DTDC Express — Branch Manager</h3>
          <ul><li>Led 25-member team; dashboards, UAT/training, 5S &amp; RCA; improved service levels.</li></ul>
        </motion.div>
      </section>

      <hr />

      {/* work */}
      <section id="work" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>Work</motion.h2>
        <div className="grid">
          {projects.map(p=>(
            <motion.article
              key={p.title}
              className="card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{once:true,amount:.3}}
              whileHover={{y:-4, boxShadow:'0 10px 24px rgba(0,0,0,.12)'}}
              transition={{duration:.25}}
            >
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

      {/* skills */}
      <section id="skills" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>Skills &amp; Certifications</motion.h2>
        <motion.p className="muted" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>
          Gap Analysis · New Product Rollout · Project Governance · Process Design · Cost Management · Stakeholder Management<br/>
          Lean Six Sigma Foundations · SAP S/4HANA Essentials · PM Foundations · Root Cause Analysis · Supply Chain Foundations
        </motion.p>
      </section>

      <hr />

      {/* contact */}
      <section id="contact" className="section">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>Contact</motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.4}}>
          <a href="mailto:mohdizhan7@gmail.com">mohdizhan7@gmail.com</a> ·{' '}
          <a href="https://www.linkedin.com/in/mohd-izhan-shaikh-b2a615181" target="_blank">LinkedIn</a> ·{' '}
          <a href={resumeUrl} target="_blank">Resume</a>
        </motion.p>
      </section>
    </main>
  );
}
