import { useEffect, useState } from 'react';
import { motion, type HTMLMotionProps, useMotionValue, useSpring } from 'framer-motion';
import './styles.css';

type MagnetProps = Omit<HTMLMotionProps<'a'>,'ref'>;
function Magnet(props: MagnetProps){
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x,{stiffness:300,damping:20});
  const sy = useSpring(y,{stiffness:300,damping:20});
  return (
    <motion.a {...props} style={{x:sx,y:sy}}
      onMouseMove={(e)=>{ const r=e.currentTarget.getBoundingClientRect(); x.set((e.clientX-(r.left+r.width/2))*0.12); y.set((e.clientY-(r.top+r.height/2))*0.12); }}
      onMouseLeave={()=>{x.set(0);y.set(0);}}
    />
  );
}

const projects = [
  { id:'itc',  brand:'ITC',  logo:'logos/itc.svg',  thumb:'projects/itc-thumb.svg',
    title:'WMS/TMS Site Setup & Ramp', blurb:'Stabilized two sites in six weeks; SLA breaches -38%.' },
  { id:'pg',   brand:'P&G',  logo:'logos/pg.svg',   thumb:'projects/pg-thumb.svg',
    title:'Rendering Optimisation (PH)', blurb:'+14% throughput, -22% exceptions via tuned rules & dashboards.' },
  { id:'dtdc', brand:'DTDC', logo:'logos/dtdc.svg', thumb:'projects/dtdc-thumb.svg',
    title:'COVID Backlog Clearance', blurb:'Cleared 15,000 shipments in a week; on-time restored.' },
];

const experience = [
  { company:'StackBOX', title:'Assistant Project Manager — Supply Chain & Delivery', period:'Sep 2023 – Present',
    bullets:[
      'End-to-end launches: BRDs, SOP/KPI design, testing, go-live, governance.',
      'P&G PH rendering optimisation: tuned rules, dashboards, training.',
      'Cost tracking and inter-team coordination for on-time deployments.'
    ]},
  { company:'Edgistify', title:'Manager, Solution Design', period:'—',
    bullets:['Designed supply-chain solutions to improve KPIs and reduce costs.',
             'Built vendor alignment and stakeholder buy-in for rollouts.']},
  { company:'Mindseed Education', title:'Manager, Procurement & Supply Chain', period:'—',
    bullets:['Owned procurement strategy, benchmarking & cost analysis.',
             'Drove operational oversight and supplier performance.']},
  { company:'DTDC Express', title:'Branch / Ops Manager', period:'—',
    bullets:['Cleared COVID backlog via routing & shift orchestration.',
             'Dashboards, training, RCA → better service levels.']},
];

export default function App(){
  const [accent,setAccent] = useState<'indigo'|'green'|'pink'>('indigo');
  useEffect(()=>{ document.documentElement.setAttribute('data-accent',accent); },[accent]);

  return (
    <main>
      <header className="nav">
        <div className="nav-inner">
          <strong>Mohd Izhan Shaikh</strong>
          <nav>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <div className="swatches" role="group" aria-label="Accent">
              <button className="swatch indigo" onClick={()=>setAccent('indigo')} aria-pressed={accent==='indigo'}/>
              <button className="swatch green"  onClick={()=>setAccent('green')}  aria-pressed={accent==='green'}/>
              <button className="swatch pink"   onClick={()=>setAccent('pink')}   aria-pressed={accent==='pink'}/>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO — full, quiet, Apple-like */}
      <section className="hero-apple" id="home" aria-label="Intro">
        <div className="hero-glow" aria-hidden="true" />
        <h1>Designing lean operations for FMCG.</h1>
        <p className="hero-sub">Assistant Project Manager, StackBOX — I turn BRDs into KPIs, SOPs, and rollouts that lower cost-to-serve and lift throughput.</p>
        <div className="cta">
          <Magnet href="#work" className="btn btn--primary">View Work</Magnet>
          <Magnet href="#contact" className="btn btn--ghost">Contact</Magnet>
        </div>
      </section>

      {/* HIGHLIGHTS — simple bento */}
      <section className="section bento" aria-label="Highlights">
        <article className="tile t1">
          <h3>–22% cost-to-serve</h3>
          <p>Governance + SOP/KPI adoption at scale.</p>
        </article>
        <article className="tile t2">
          <h3>+14% throughput</h3>
          <p>Rendering optimisation, tuned rules & dashboards.</p>
        </article>
        <article className="tile t3">
          <h3>6-week ramp</h3>
          <p>Two sites stabilised end-to-end.</p>
        </article>
        <article className="tile t4">
          <h3>Playbooks</h3>
          <p>Repeatable rollouts with training & buy-in.</p>
        </article>
      </section>

      {/* WORK — clean product grid */}
      <section id="work" className="section" aria-labelledby="work-h">
        <h2 id="work-h">Selected Work</h2>
        <div className="work-grid">
          {projects.map(p=>(
            <article key={p.id} className="card">
              <div className="card-media">
                <img src={`${import.meta.env.BASE_URL}${p.thumb}`} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="card-body">
                <div className="meta">
                  <img className="meta-logo" src={`${import.meta.env.BASE_URL}${p.logo}`} alt={`${p.brand} logo`} />
                  <span className="meta-brand">{p.brand}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="muted">{p.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERIENCE — calm two-column */}
      <section id="experience" className="section" aria-labelledby="xp-h">
        <h2 id="xp-h">Experience</h2>
        <div className="xp-grid">
          {experience.map(x=>(
            <article key={x.company} className="card xp-card">
              <header className="xp-head">
                <h3>{x.company}</h3>
                <span className="xp-period">{x.period}</span>
              </header>
              <p className="muted">{x.title}</p>
              <ul className="dashlist">{x.bullets.map(b=><li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section--center">
        <h2>Let’s build clarity into operations.</h2>
        <p className="muted">mohdizhan7@gmail.com · LinkedIn</p>
      </section>
    </main>
  );
}
