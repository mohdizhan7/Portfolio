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

const TOTAL_EXPERIENCE = '6+ years';

const companies = {
  itc:   { name:'ITC',   logo:'logos/itc.svg'   },
  hul:   { name:'HUL',   logo:'logos/hul.svg'   },
  pg:    { name:'P&G',   logo:'logos/pg.svg'    },
  dtdc:  { name:'DTDC',  logo:'logos/dtdc.svg'  },
  mind:  { name:'Mindseed Education', logo:'logos/mindseed.svg' },
  edgistify:  { name:'Edgistify', logo:'logos/edgistify.svg' },
};

type Project = {
  id:string; brand:keyof typeof companies; title:string; period?:string;
  summary:string; cover:string;
  caseStudy:{ context:string; role:string; actions:string[]; outcomes:string[]; tools?:string[]; }
};
const projects: Project[] = [
  {
    id:'itc',
    brand:'itc',
    title:'WMS/TMS Site Setup & Operational Ramp',
    period:'2023–24',
    summary:'Two greenfield sites; BRD → SOP/KPIs → testing → go-live. Stabilised ops with clear governance.',
    cover:'projects/itc-thumb.svg',
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
    id:'pg',
    brand:'pg',
    title:'Rendering Optimisation (Philippines)',
    period:'2023–24',
    summary:'AS-IS → TO-BE; tuned rules/exceptions & dashboards. Upskilled teams for sustained gains.',
    cover:'projects/pg-thumb.svg',
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
    id:'dtdc',
    brand:'dtdc',
    title:'COVID Backlog Clearance',
    period:'2020',
    summary:'Partner network + routing & shift orchestration to clear backlog quickly.',
    cover:'projects/dtdc-thumb.svg',
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
      tools:['Routing plans','Daily control tower','RCA + 5S']
    }
  }
];

type ExperienceItem = { company:string; name:string; title:string; period:string; points:string[] };
const experience: ExperienceItem[] = [
  { company:'stackbox', name:'StackBOX', title:'Assistant Project Manager — Supply Chain & Delivery', period:'Sep 2023 – Present',
    points:[
      'End-to-end launches: BRDs, SOP/KPI design, UAT, go-live, governance.',
      'Account lead for P&G PH rendering optimisation (rules, dashboards, training).',
      'Cost tracking and inter-team coordination for on-time deployments.'
    ]},
  { company:'edgistify', name:'Edgistify', title:'Manager, Solution Design', period:'—',
    points:[
      'Designed supply-chain solutions to improve KPIs and reduce costs.',
      'Drove vendor alignment and stakeholder buy-in for rollouts.'
    ]},
  { company:'mindseed', name:'Mindseed Education', title:'Manager, Procurement & Supply Chain', period:'—',
    points:[
      'Owned procurement strategy, benchmarking & cost analysis.',
      'End-to-end operational oversight and supplier performance.'
    ]},
  { company:'dtdc', name:'DTDC Express', title:'Branch / Ops Manager', period:'—',
    points:[
      'Cleared COVID backlog via routing & shift orchestration.',
      'Dashboards, training and RCA to improve service levels.'
    ]},
];

const education = [
  { school:'Bachelor’s Degree', line:'(add discipline & university here)' },
  { school:'Certifications', line:'Lean Six Sigma Foundations · SAP S/4HANA Essentials · Project Mgmt Foundations · Supply Chain Foundations' }
];

export default function App(){
  const [accent,setAccent] = useState<'indigo'|'green'|'pink'>('indigo');
  useEffect(()=>{ document.documentElement.setAttribute('data-accent',accent); },[accent]);

  const [activeProject,setActiveProject] = useState<Project|null>(null);

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
        <img
          className="avatar-large"
          src={`${import.meta.env.BASE_URL}izhan.jpg`}
          alt="Mohd Izhan Shaikh"
          width={96} height={96} loading="eager" decoding="async"
        />
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

      <section className="section bento" aria-label="Capabilities">
        <article className="tile t1"><h3>Process → Playbook</h3><p>BRDs to SOP/KPIs with adoption & cadence.</p></article>
        <article className="tile t2"><h3>WMS/TMS rollouts</h3><p>Config, testing, cutover & hyper-care.</p></article>
        <article className="tile t3"><h3>Control & cost</h3><p>Dashboards, RCA, cost tracking and reviews.</p></article>
        <article className="tile t4"><h3>Enablement</h3><p>Training kits, handoffs, buy-in across teams.</p></article>
      </section>

      <section id="work" className="section" aria-labelledby="work-h">
        <div className="section-head">
          <h2 id="work-h">Selected Work</h2>
          <p className="muted">Case studies from FMCG, logistics & education contexts.</p>
        </div>
        <div className="work-grid">
          {projects.map(p=>(
            <article key={p.id} className="card">
              <div className="card-media"><img src={`${import.meta.env.BASE_URL}${p.cover}`} alt="" loading="lazy" decoding="async" /></div>
              <div className="card-body">
                <div className="meta">
                  <img className="meta-logo" src={`${import.meta.env.BASE_URL}${companies[p.brand].logo}`} alt={`${companies[p.brand].name} logo`} />
                  <span className="meta-brand">{companies[p.brand].name}</span>
                  {p.period && <span className="meta-dot">•</span>}
                  {p.period && <span className="meta-period">{p.period}</span>}
                </div>
                <h3>{p.title}</h3>
                <p className="muted">{p.summary}</p>
                <button className="btn btn--ghost" onClick={()=>setActiveProject(p)}>Read case study</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section" aria-labelledby="xp-h">
        <div className="section-head">
          <h2 id="xp-h">Experience</h2>
          <span className="badge">{TOTAL_EXPERIENCE} total</span>
        </div>
        <div className="xp-grid">
          {experience.map(x=>(
            <article key={x.name} className="card xp-card">
              <header className="xp-head">
                <h3>{x.name}</h3>
                <span className="xp-period">{x.period}</span>
              </header>
              <p className="muted">{x.title}</p>
              <ul className="dashlist">{x.points.map(b=><li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="section" aria-labelledby="edu-h">
        <h2 id="edu-h">Education & Certifications</h2>
        <ul className="edu-list">
          {education.map(e=>(
            <li key={e.school}><strong>{e.school} — </strong><span className="muted">{e.line}</span></li>
          ))}
        </ul>
      </section>

      <section id="contact" className="section section--center">
        <h2>Let’s build clarity into operations.</h2>
        <p className="muted">
          <a href="mailto:mohdizhan7@gmail.com">mohdizhan7@gmail.com</a> ·{' '}
          <a href="https://www.linkedin.com/in/mohd-izhan-shaikh-b2a615181" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </section>

      {activeProject && (
        <div className="modal" role="dialog" aria-modal="true" onClick={(e)=>{ if(e.target===e.currentTarget) setActiveProject(null); }}>
          <div className="modal__content">
            <button className="modal__close" aria-label="Close" onClick={()=>setActiveProject(null)}>×</button>
            <div className="meta meta-lg">
              <img className="meta-logo" src={`${import.meta.env.BASE_URL}${companies[activeProject.brand].logo}`} alt="" />
              <span className="meta-brand">{companies[activeProject.brand].name}</span>
              {activeProject.period && <span className="meta-dot">•</span>}
              {activeProject.period && <span className="meta-period">{activeProject.period}</span>}
            </div>
            <h3 className="cs-title">{activeProject.title}</h3>
            <p className="muted">{activeProject.caseStudy.context}</p>
            <div className="cs-two">
              <div>
                <h4>Role</h4>
                <p className="muted">{activeProject.caseStudy.role}</p>
                {activeProject.caseStudy.tools && (
                  <>
                    <h4>Toolkit</h4>
                    <p className="muted">{activeProject.caseStudy.tools.join(' · ')}</p>
                  </>
                )}
              </div>
              <div>
                <h4>What I did</h4>
                <ul className="dashlist">{activeProject.caseStudy.actions.map(a=><li key={a}>{a}</li>)}</ul>
                <h4>Outcomes</h4>
                <ul className="dashlist">{activeProject.caseStudy.outcomes.map(o=><li key={o}>{o}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
