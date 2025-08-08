import { useEffect, useMemo, useState } from 'react';
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
  itc:       { name:'ITC',       logo:'logos/itc.svg',      flag:'🇮🇳' },
  pg:        { name:'P&G',       logo:'logos/pg.png',       flag:'🇵🇭' },
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
    cover:'logos/dtdc.jpg',
    caseStudy:{
      context:'ITC required rapid stand-up of two warehouses with clear KPIs and governance.',
      role:'Assistant Project Manager (StackBOX), cross-functional with product/ops.',
      actions:[
        'Wrote BRDs; translated to SOPs/KPIs and task configurations.',
        'Coordinated UAT, cutover, training and hyper-care.',
        'Set up cost tracking and cadence reviews.'
      ],
      outcomes:[
        'Stable handoffs across teams; smoother daily governance.',
        'SOP/KPI adoption and faster onboarding of floor teams.'
      ],
      tools:['WMS/TMS','SOP/KPI playbooks','Dashboards']
    }
  },
  {
    id:'pg', brand:'pg', period:'2023–24',
    title:'Rendering Optimisation (Philippines)',
    summary:'AS-IS → TO-BE; tuned rules/exceptions & dashboards. Upskilled teams for sustained gains.',
    cover:'logos/itc.jpg',
    caseStudy:{
      context:'Rendering exceptions and throughput variability created delays.',
      role:'Account Lead / PM for the PH program.',
      actions:[
        'Mapped AS-IS vs TO-BE; adjusted rendering rules and SLAs.',
        'Built exception dashboards; trained floor supervisors.',
        'Drove rollout across lanes with change-management.'
      ],
      outcomes:[
        'Throughput uplift with fewer escalations.',
        'Sustained KPI improvement post-rollout.'
      ],
      tools:['Process maps','Exception dashboards','Training kits']
    }
  },
  {
    id:'dtdc', brand:'dtdc', period:'2020',
    title:'COVID Backlog Clearance',
    summary:'Partner network + routing & shift orchestration to clear backlog quickly.',
    cover:'logos/pg.jpg',
    caseStudy:{
      context:'Branch faced a COVID-era delivery backlog.',
      role:'Branch/Ops Manager leading a 25-member team.',
      actions:[
        'Set up partner coverage (incl. newspaper distributors).',
        'Planned routing, shifts and daily targets; triaged issues.',
        'Implemented on-floor dashboards and RCA loops.'
      ],
      outcomes:[
        'Backlog cleared within a week.',
        'Service levels and on-time rate restored.'
      ],
      tools:['Routing plans','Control tower','RCA + 5S']
    }
  }
];

type Xp = { company:keyof typeof companies; title:string; period:string; duration:string; bullets:string[] };
const xp: Xp[] = [
  { company:'stackbox', title:'Assistant Project Manager — Supply Chain & Delivery', period:'Sep 2023 – Present', duration:'1 yr 11 mo',
    bullets:[
      'End-to-end launches: BRDs, SOP/KPI design, UAT, go-live, governance.',
      'Account lead for P&G PH rendering optimisation (rules, dashboards, training).',
      'Cost tracking and inter-team coordination for on-time deployments.'
    ]},
  { company:'edgistify', title:'Manager, Solution Design', period:'Aug 2022 – Sep 2023', duration:'1 yr 2 mo',
    bullets:[
      'Designed supply-chain solutions to improve KPIs and reduce costs.',
      'Drove vendor alignment and stakeholder buy-in for rollouts.'
    ]},
  { company:'mindseed', title:'Manager, Procurement & Supply Chain', period:'Dec 2021 – Aug 2022', duration:'9 mo',
    bullets:[
      'Owned procurement strategy, benchmarking & cost analysis.',
      'End-to-end operational oversight and supplier performance.'
    ]},
  { company:'dtdc', title:'Branch / Ops Manager', period:'Jan 2020 – Dec 2021', duration:'2 yrs',
    bullets:[
      'Cleared COVID backlog via routing & shift orchestration.',
      'Dashboards, training and RCA to improve service levels.'
    ]},
];

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
  // lock a single accent (no color switchers)
  useEffect(()=>{ document.documentElement.setAttribute('data-accent','indigo'); },[]);
  const [active,setActive] = useState<Project|null>(null);

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') setActive(null); };
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[]);

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
                  <button className="btn btn--ghost" onClick={()=>setActive(p)}>Read case study</button>
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
                  <h3 style={{display:'flex',alignItems:'center',gap:10}}>
                    <BrandMark brand={key} /> {c.name}
                  </h3>
                  <span className="xp-period">
                    {row.period} <span aria-hidden="true">•</span> <span className="meta-flag">{c.flag}</span>
                    <span className="xp-duration"> — {row.duration}</span>
                  </span>
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

      {/* Case study modal */}
      {active && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`${active.title} — case study`} onClick={(e)=>{ if(e.target===e.currentTarget) setActive(null); }}>
          <div className="modal__content">
            <button className="modal__close" aria-label="Close" onClick={()=>setActive(null)}>×</button>
            <h3 style={{marginTop:0}}>{active.title}</h3>
            <div className="meta" style={{marginBottom:10}}>
              <BrandMark brand={active.brand} />
              <span className="meta-brand">{companies[active.brand].name}</span>
              <span className="meta-dot">•</span>
              <span className="meta-flag">{companies[active.brand].flag}</span>
              {active.period && <><span className="meta-dot">•</span><span className="meta-period">{active.period}</span></>}
            </div>
            <p className="muted">{active.caseStudy.context}</p>
            <p><strong>Role:</strong> {active.caseStudy.role}</p>
            <h4>Actions</h4>
            <ul className="dashlist">{active.caseStudy.actions.map(a=><li key={a}>{a}</li>)}</ul>
            <h4>Outcomes</h4>
            <ul className="dashlist">{active.caseStudy.outcomes.map(a=><li key={a}>{a}</li>)}</ul>
            {active.caseStudy.tools?.length ? (<p className="muted"><strong>Tools:</strong> {active.caseStudy.tools.join(' · ')}</p>) : null}
          </div>
        </div>
      )}
    </main>
  );
}
