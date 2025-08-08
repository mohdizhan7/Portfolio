import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps, MotionStyle } from 'framer-motion';
import './styles.css';

const fadeUp = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:.5,ease:'easeOut'}} };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const rise = { hidden:{opacity:0,y:8}, show:{opacity:1,y:0,transition:{duration:.45,ease:'easeOut'}} };

type MagnetProps = Omit<HTMLMotionProps<'a'>, 'ref'>;
function Magnet(props: MagnetProps){
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x,{stiffness:300,damping:20});
  const sy = useSpring(y,{stiffness:300,damping:20});
  return (
    <motion.a
      {...props}
      style={{ x:sx, y:sy } as MotionStyle}
      onMouseMove={(e)=>{
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width/2)) * 0.12);
        y.set((e.clientY - (r.top + r.height/2)) * 0.12);
      }}
      onMouseLeave={()=>{ x.set(0); y.set(0); }}
    />
  );
}

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
        {logos.map(l => (<li key={l.alt}><img src={`${import.meta.env.BASE_URL}${l.src}`} alt={l.alt} loading="lazy" /></li>))}
      </ul>
    </section>
  );
}

type Project = {
  id:string; brand:string; logo:string;
  title:string; role:string; bullets:string[]; impact:string; thumb:string; gallery:string[];
};
const projects: Project[] = [
  { id:'itc', brand:'ITC', logo:'itc.svg',
    title:'ITC — WMS/TMS Site Setup & Ops Ramp', role:'Assistant Project Manager · StackBOX',
    bullets:['Stabilized 2 sites in 6 weeks; SLA breaches -38%.','CAPEX variance within ±2%; SOPs/KPIs fully adopted.'],
    impact:'Owned BRD→SOP/KPI design, testing, deployment & governance.',
    thumb:'projects/itc-thumb.svg', gallery:['projects/itc-1.svg','projects/itc-2.svg'] },
  { id:'pg', brand:'P&G', logo:'pg.svg',
    title:'P&G Philippines — Rendering Process Optimisation', role:'Project Manager / Account Lead',
    bullets:['Throughput +14%, exceptions -22% via tuned rules & dashboards.','Upskilled floor teams; KPI uplift sustained post-rollout.'],
    impact:'AS-IS→TO-BE, config, dashboards and rollout oversight.',
    thumb:'projects/pg-thumb.svg', gallery:['projects/pg-1.svg','projects/pg-2.svg'] },
  { id:'dtdc', brand:'DTDC', logo:'dtdc.svg',
    title:'DTDC — COVID Backlog Clearance', role:'Branch / Ops Manager',
    bullets:['Cleared 15,000-shipment backlog within one week.','On-time rate restored via routing & shift orchestration.'],
    impact:'Partner network + routing optimization under constraints.',
    thumb:'projects/dtdc-thumb.svg', gallery:['projects/dtdc-1.svg','projects/dtdc-2.svg'] },
];

type Experience = {
  company:string; logo:string; title:string; period:string; bullets:string[];
};
const experience: Experience[] = [
  { company:'StackBOX', logo:'stackbox.svg', title:'Assistant Project Manager · Supply Chain & Delivery', period:'Sep 2023 – Present',
    bullets:[
      'Led ITC site launches end-to-end: BRDs, SOP/KPI design, testing, go-live, governance.',
      'Account lead for P&G PH rendering optimisation: tuned rules, dashboards, training.',
      'Drove cost tracking and inter-team coordination for on-time deployments.'
    ]},
  { company:'Edgistify', logo:'edgistify.svg', title:'Manager, Solution Design', period:'—',
    bullets:['Designed tailored supply-chain solutions to improve KPIs and reduce costs.','Built vendor alignment and stakeholder buy-in for rollouts.']},
  { company:'Mindseed Education', logo:'mindseed.svg', title:'Manager, Procurement & Supply Chain', period:'—',
    bullets:['Owned procurement strategy, benchmarking and cost analysis across categories.','Drove end-to-end operational oversight and supplier performance.']},
  { company:'DTDC Express', logo:'dtdc.svg', title:'Branch / Ops Manager', period:'—',
    bullets:['Cleared 15,000-shipment COVID backlog in one week via routing & shift orchestration.','Implemented dashboards, training and RCA for better service levels.']},
];

export default function App(){
  const reduceMotion = useReducedMotion();

  const [accent,setAccent] = useState<'indigo'|'green'|'pink'>('indigo');
  useEffect(()=>{ document.documentElement.setAttribute('data-accent', accent); },[accent]);

  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    const onScroll=()=>{
      const max=document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.max(0,Math.min(100,(window.scrollY/max)*100)));
    };
    onScroll(); window.addEventListener('scroll',onScroll);
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);

  const sections = ['about','experience','work','skills','contact'] as const;
  const [active,setActive]=useState<typeof sections[number]>('about');
  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id as any); }),{threshold:.45});
    sections.forEach(id=>{ const el=document.getElementById(id); if(el) io.observe(el); });
    return ()=>io.disconnect();
  },[]);

  const heroRef = useRef<HTMLElement|null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end','end start'] });
  const imgY  = useTransform(scrollYProgress, [0,1], reduceMotion ? [0,0] : [-8,16]);
  const textY = useTransform(scrollYProgress, [0,1], reduceMotion ? [0,0] : [ 8,-10]);

  const [modalOpen,setModalOpen]=useState(false);
  const [modalIdx,setModalIdx]=useState(0);
  const [current,setCurrent]=useState<Project|null>(null);
  function openModal(p:Project, start=0){ setCurrent(p); setModalIdx(start); setModalOpen(true); }
  function closeModal(){ setModalOpen(false); }
  useEffect(()=>{
    if(!modalOpen) return;
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==='Escape') closeModal();
      if(!current) return;
      if(e.key==='ArrowLeft')  setModalIdx(i=>Math.max(0,i-1));
      if(e.key==='ArrowRight') setModalIdx(i=>Math.min(current.gallery.length-1,i+1));
    };
    document.addEventListener('keydown',onKey);
    const prev=document.body.style.overflow; document.body.style.overflow='hidden';
    return ()=>{ document.removeEventListener('keydown',onKey); document.body.style.overflow=prev; };
  },[modalOpen,current]);

  return (
    <main>
      <div className="progress" style={{width:`${progress}%`}} />

      <div className="nav">
        <div className="nav-inner">
          <strong>Mohd Izhan Shaikh</strong>
          <nav aria-label="Primary" style={{display:'flex',gap:12,alignItems:'center'}}>
            <a href="#about">About</a><a href="#experience">Experience</a><a href="#work">Work</a>
            <a href="#skills">Skills</a><a href="#contact">Contact</a>
            <div className="swatches" role="group" aria-label="Accent colors">
              <button type="button" className="swatch indigo" onClick={()=>setAccent('indigo')} aria-pressed={accent==='indigo'} />
              <button type="button" className="swatch green"  onClick={()=>setAccent('green')}  aria-pressed={accent==='green'} />
              <button type="button" className="swatch pink"   onClick={()=>setAccent('pink')}   aria-pressed={accent==='pink'} />
            </div>
          </nav>
        </div>
      </div>

      <section className="hero" ref={heroRef as any}>
        <div className="hero-bg" aria-hidden="true"></div>
        <picture>
          <source srcSet={`${import.meta.env.BASE_URL}izhan.webp`} type="image/webp" sizes="(max-width:700px) 56px, 80px" />
          <motion.img src={`${import.meta.env.BASE_URL}izhan.jpg`} alt="Portrait of Mohd Izhan Shaikh"
            className="avatar" width={80} height={80} loading="eager" decoding="async" fetchPriority="high"
            style={{ y: imgY }} initial={{opacity:0, scale: reduceMotion ? 1 : .95}} animate={{opacity:1, scale:1}}
            transition={reduceMotion ? {duration:0}:{duration:.5}}/>
        </picture>
        <motion.div style={{ y: textY }} variants={stagger} initial="hidden" animate="show">
          <motion.h1 variants={rise}>Mohd Izhan Shaikh</motion.h1>
          <motion.p className="title" variants={rise}>Assistant Project Manager, StackBOX — Supply Chain &amp; Project Delivery</motion.p>
          <motion.p className="tagline" variants={rise}>
            I design SOPs/KPIs and scale WMS/TMS rollouts for FMCG — <strong>-22% cost-to-serve</strong>, <strong>+14% throughput</strong>.
          </motion.p>
          <motion.div className="cta" role="group" aria-label="Primary call to action" variants={rise}>
            <Magnet href="#work" className="btn btn--primary">View Work</Magnet>
            <Magnet href="#contact" className="btn btn--ghost">Contact</Magnet>
          </motion.div>
        </motion.div>
      </section>

      <TrustBar />
      <div className="break" aria-hidden="true" />

      {/* ABOUT */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <motion.h2 id="about-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>About</motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>
          Supply chain professional (6+ yrs) across logistics, procurement, and operations for ITC, HUL &amp; P&amp;G. Lean Six Sigma + RCA certified.
          I design SOPs/KPIs, lead implementations, and deliver measurable efficiency and growth.
        </motion.p>
      </section>

      <div className="break" aria-hidden="true" />

      {/* EXPERIENCE — Alternating timeline (no side scroll) */}
      <section id="experience" className="section section--surface" aria-labelledby="exp-heading">
        <motion.h2 id="exp-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>Experience</motion.h2>
        <ol className="xp-timeline" role="list">
          {experience.map((x, i)=>(
            <li key={x.company} className={`xp-item ${i%2 ? 'right' : 'left'}`} role="listitem">
              <span className="xp-dot" aria-hidden="true" />
              <article className="card xp-card">
                <header className="xp-head">
                  <img className="company-logo" src={`${import.meta.env.BASE_URL}logos/${x.logo}`} alt={`${x.company} logo`} loading="lazy" height={18}/>
                  <div className="xp-meta">
                    <h3 className="xp-title">{x.company}</h3>
                    <p className="muted">{x.title}</p>
                  </div>
                  <span className="xp-period">{x.period}</span>
                </header>
                <ul className="dashlist">{x.bullets.map(b=> <li key={b}>{b}</li>)}</ul>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <div className="break" aria-hidden="true" />

      {/* WORK (unchanged grid) */}
      <section id="work" className="section section--surface" aria-labelledby="work-heading">
        <motion.h2 id="work-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>Selected Work</motion.h2>
        <div className="work-grid" role="list">
          {projects.map(p=>(
            <motion.article key={p.id} className="card" role="listitem"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.35}}
              whileHover={reduceMotion ? {} : { y: -4, boxShadow: '0 10px 24px rgba(0,0,0,.12)' }}
              transition={reduceMotion ? {duration:0}:{duration:.25}}
              onClick={() => openModal(p,0)}>
              <div className="card-head">
                <img className="company-logo" src={`${import.meta.env.BASE_URL}logos/${p.logo}`} alt={`${p.brand} logo`} loading="lazy" height={20}/>
              </div>
              <div className="card-media" aria-hidden="true">
                <img className="cover" alt="" src={`${import.meta.env.BASE_URL}${p.thumb}`} loading="lazy" decoding="async" />
                <button className="viewcase" type="button" onClick={(e)=>{ e.stopPropagation(); openModal(p,0); }}>View case →</button>
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

      <div className="break" aria-hidden="true" />

      <section id="skills" className="section" aria-labelledby="skills-heading">
        <motion.h2 id="skills-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>
          Skills &amp; Certifications
        </motion.h2>
        <motion.p className="muted" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.45}}>
          Gap Analysis · New Product Rollout · Project Governance · Process Design · Cost Management · Stakeholder Management
          <br/>Lean Six Sigma Foundations · SAP S/4HANA Essentials · PM Foundations · Root Cause Analysis · Supply Chain Foundations
        </motion.p>
      </section>

      <div className="break" aria-hidden="true" />

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <motion.h2 id="contact-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.5}}>Contact</motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,amount:.45}}>
          <a href="mailto:mohdizhan7@gmail.com">mohdizhan7@gmail.com</a> ·{' '}
          <a href="https://www.linkedin.com/in/mohd-izhan-shaikh-b2a615181" target="_blank" rel="noreferrer">LinkedIn</a>
        </motion.p>
      </section>

      <nav className="dots" aria-label="Section navigation">
        {sections.map(id=>(
          <a key={id} href={`#${id}`} className={`dot ${active===id?'active':''}`}
             aria-label={`Jump to ${id} section`} aria-current={active===id?'page':undefined}/>
        ))}
      </nav>

      {modalOpen && current && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`${current.title} gallery`}
             onClick={(e)=>{ if(e.target===e.currentTarget) closeModal(); }}>
          <div className="modal__content">
            <button className="modal__close" aria-label="Close" onClick={closeModal}>×</button>
            <img src={`${import.meta.env.BASE_URL}${current.gallery[modalIdx]}`} alt={`${current.title} image ${modalIdx+1}`} />
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
