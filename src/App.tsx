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
      onMouseMove={(e)=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-(r.left+r.width/2))*0.12);y.set((e.clientY-(r.top+r.height/2))*0.12);}}
      onMouseLeave={()=>{x.set(0);y.set(0);}}
    />
  );
}

const companies = {
  stackbox:  { name:'StackBOX',  logo:'logos/stackbox.png', flag:'🇮🇳' },
  edgistify: { name:'Edgistify', logo:'logos/edgistify.png', flag:'🇮🇳' },
  dtdc:      { name:'DTDC',      logo:'logos/dtdc.avif',    flag:'🇮🇳' },
  itc:       { name:'ITC',       logo:'logos/placeholder.svg', flag:'🇮🇳' },   // no real file yet
  pg:        { name:'P&G',       logo:'logos/placeholder.svg', flag:'🇵🇭' },   // Philippines
  mindseed:  { name:'Mindseed Education', logo:'logos/placeholder.svg', flag:'🇮🇳' },
} as const;

type Project = {
  id:string; brand:keyof typeof companies; title:string; period?:string;
  summary:string; cover:string;
  caseStudy:{ context:string; role:string; actions:string[]; outcomes:string[]; tools?:string[]; }
};

const projects: Project[] = [
  {
    id:'itc', brand:'itc', period:'2023–24',
    title:'WMS/TMS Site Setup & Operational Ramp',
    summary:'Two greenfield sites; BRD → SOP/KPIs → testing → go-live. Stabilised ops with clear governance.',
    cover:'logos/dtdc.jpg',   // (swapped) warehouse conveyor image
    caseStudy:{ context:'—', role:'—', actions:[], outcomes:[] }
  },
  {
    id:'pg', brand:'pg', period:'2023–24',
    title:'Rendering Optimisation (Philippines)',
    summary:'AS-IS → TO-BE; tuned rules/exceptions & dashboards. Upskilled teams for sustained gains.',
    cover:'logos/itc.jpg',    // (swapped) bins image
    caseStudy:{ context:'—', role:'—', actions:[], outcomes:[] }
  },
  {
    id:'dtdc', brand:'dtdc', period:'2020',
    title:'COVID Backlog Clearance',
    summary:'Partner network + routing & shift orchestration to clear backlog quickly.',
    cover:'logos/pg.jpg',     // (swapped) people on conveyor image
    caseStudy:{ context:'—', role:'—', actions:[], outcomes:[] }
  }
];

const xp = [
  { company:'stackbox', title:'Assistant Project Manager — Supply Chain & Delivery', period:'Sep 2023 – Present',
    bullets:[
      'End-to-end launches: BRDs, SOP/KPI design, UAT, go-live, governance.',
      'Account lead for P&G PH rendering optimisation (rules, dashboards, training).',
      'Cost tracking and inter-team coordination for on-time deployments.'
    ] },
  { company:'edgistify', title:'Manager, Solution Design', period:'Aug 2022 – Sep 2023',
    bullets:['Designed supply-chain solutions to improve KPIs and reduce costs.','Drove vendor alignment and stakeholder buy-in for rollouts.'] },
  { company:'mindseed', title:'Manager, Procurement & Supply Chain', period:'Dec 2021 – Aug 2022',
    bullets:['Owned procurement strategy, benchmarking & cost analysis.','End-to-end operational oversight and supplier performance.'] },
  { company:'dtdc', title:'Branch / Ops Manager', period:'Jan 2020 – Dec 2021',
    bullets:['Cleared COVID backlog via routing & shift orchestration.','Dashboards, training and RCA to improve service levels.'] },
] as const;

function BrandMark({brand}:{brand:keyof typeof companies}){
  const c = companies[brand];
  const isPlaceholder = c.logo.endsWith('placeholder.svg');
  if (isPlaceholder) {
    return <span className="logo-chip" aria-label={`${c.name} logo (text)`}>{c.name.replace(' &','&')}</span>;
  }
  return <img className="meta-logo" src={`${import.meta.env.BASE_URL}${c.logo}`} alt={`${c.name} logo`}
              onError={(e)=>{ (e.currentTarget as HTMLImageElement).replaceWith(
                Object.assign(document.createElement('span'),{className:'logo-chip',textContent:c.name})
              ); }} />;
}

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
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
            <div className="swatches" role="group" aria-label="Accent">
              <button className="swatch indigo" onClick={()=>setAccent('indigo')} aria-pressed={accent==='indigo'}/>
              <button className="swatch green"  onClick={()=>setAccent('green')}  aria-pressed={accent==='green'}/>
              <button className="swatch pink"   onClick={()=>setAccent('pink')}   aria-pressed={accent==='pink'}/>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-apple" id="about" aria-label="Intro">
        <div className="hero-glow" aria-hidden="true" />
        <img className="avatar-large" src={`${import.meta.env.BASE_URL}izhan.jpg`} alt="Mohd Izhan Shaikh" width={96} height={96} loading="eager" decoding="async"/>
        <h1>Designing lean, scalable<br/>supply-chain operations.</h1>
        <p className="hero-sub">
          Assistant Project Manager at StackBOX. I partner with FMCG, retail, logistics & 3PL teams to turn BRDs into
          SOPs/KPIs and WMS/TMS rollouts—clear governance, trained teams, measurable control.
        </p>
        <div className="cta">
          <Magnet href="#work" className="btn btn--primary">View Work</Magnet>
          <Magnet href="#contact" className="btn btn--ghost">Contact</Magnet>
        </div>
      </section>

      <section id="work" className="section" aria-labelledby="work-h">
        <div className="section-head">
          <h2 id="work-h">Case Studies</h2>
          <p className="muted">From FMCG, logistics & education—each with context, role, actions, outcomes.</p>
        </div>
        <div className="work-grid">
          {projects.map(p=>{
            const c = companies[p.brand];
            return (
              <article key={p.id} className="card">
                <div className="card-media"><img src={`${import.meta.env.BASE_URL}${p.cover}`} alt="" loading="lazy" decoding="async"/></div>
                <div className="card-body">
                  <div className="meta">
                    <BrandMark brand={p.brand} />
                    <span className="meta-brand">{c.name}</span>
                    <span className="meta-dot">•</span>
                    <span className="meta-flag">{c.flag}</span>
                    {p.period && <span className="meta-dot">•</span>}
                    {p.period && <span className="meta-period">{p.period}</span>}
                  </div>
                  <h3>{p.title}</h3>
                  <p className="muted">{p.summary}</p>
                  <a className="btn btn--ghost" href="#contact">Read case study</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="section" aria-labelledby="xp-h">
        <div className="section-head"><h2 id="xp-h">Experience</h2></div>
        <div className="xp-grid">
          {xp.map(row=>{
            const key = row.company as keyof typeof companies;
            const c = companies[key];
            return (
              <article key={key} className="card xp-card">
                <header className="xp-head">
                  <h3 style={{display:'flex',alignItems:'center',gap:8}}>
                    <BrandMark brand={key} /> {c.name}
                  </h3>
                  <span className="xp-period">{row.period} <span aria-hidden="true">•</span> <span className="meta-flag">{c.flag}</span></span>
                </header>
                <p className="muted">{row.title}</p>
                <ul className="dashlist">{row.bullets.map(b=><li key={b}>{b}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </section>

      <section id="education" className="section">
        <h2>Education & Certifications</h2>
        <ul className="edu-list">
          <li><strong>Mumbai University — B.E. Mechanical Engineering</strong> <span className="muted">— 2015–2019</span></li>
          <li><strong>Atomic Energy Junior College — HSC (Computer Science)</strong> <span className="muted">— 2013–2015</span></li>
          <li><strong>Atomic Energy Central School — SSC</strong> <span className="muted">— 2012–2013</span></li>
          <li><strong>Certifications</strong> <span className="muted">— Lean Six Sigma Foundations · SAP S/4HANA Essentials · Project Mgmt Foundations · Root Cause Analysis · Supply Chain Foundations</span></li>
        </ul>
      </section>

      <section id="contact" className="section section--center">
        <h2>Let’s build clarity into operations.</h2>
        <p className="muted">
          <a href="mailto:mohdizhan7@gmail.com">mohdizhan7@gmail.com</a> ·{' '}
          <a href="https://www.linkedin.com/in/mohd-izhan-shaikh-b2a615181" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </section>
    </main>
  );
}
