import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL || '/';
const img = (p:string)=> `${BASE}${p}`;
const logo = (p:string)=> `${BASE}logos/${p}`;

function QuickFacts(){
  return (
    <div className="facts" aria-label="Quick facts">
      <span>6+ years</span>
      <span>FMCG · Retail · 3PL</span>
      <span>WMS/TMS · SAP S/4HANA basics</span>
      <span>Lean Six Sigma · RCA</span>
      <span>Mumbai, IN · open to hybrid/relocation</span>
    </div>
  );
}

function Hero(){
  return (
    <section className="hero">
      <img src={img('izhan.jpg')} alt="Mohd Izhan Shaikh" className="avatar" />
      <h1>Designing lean, scalable<br/>supply-chain operations.</h1>
      <p className="tagline">
        Assistant Project Manager at StackBOX. I turn BRDs into SOPs/KPIs and lead WMS/TMS rollouts for FMCG, retail &amp; 3PL—clear governance, trained teams, measurable control.
      </p>
      <div className="cta">
        <a href="#work" className="btn btn--primary">View Work</a>
        <a href="mailto:izhan@example.com" className="btn btn--ghost">Contact</a>
        <a className="btn btn--ghost" href={img('Izhan-Resume.pdf')} download>Download Resume</a>
        <a className="btn btn--ghost" href="https://www.linkedin.com/in/mohdizhan7/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <QuickFacts/>
    </section>
  );
}

type Tile = {
  slug: string;
  cover: string;
  logo: string;
  title: string;
  meta: string;
  blurb: string;
};
const tiles: Tile[] = [
  {
    slug: 'itc-ramp',
    cover: 'work/itc-cover.jpg',              // warehouse conveyor
    logo: 'itc.svg',
    title: 'WMS/TMS Site Setup & Operational Ramp',
    meta: 'ITC · 🇮🇳 · 2023–24',
    blurb: 'Two greenfield sites; BRD → SOP/KPIs → testing → go-live. Stabilised ops with clear governance.'
  },
  {
    slug: 'pg-rendering',
    cover: 'work/pg-cover.jpg',          // bins/packaging
    logo: 'pg.png',
    title: 'Rendering Optimisation (Philippines)',
    meta: 'P&G · 🇵🇭 · 2023–24',
    blurb: 'AS-IS → TO-BE; tuned rules/exceptions & dashboards. Upskilled teams for sustained gains.'
  },
  {
    slug: 'dtdc-backlog',
    cover: 'work/dtdc-cover.jpg', // worker/line
    logo: 'dtdc.png',
    title: 'COVID Backlog Clearance',
    meta: 'DTDC · 🇮🇳 · 2020',
    blurb: 'Partner network + routing & shift orchestration to clear backlog quickly.'
  }
];

function Work(){
  return (
    <section id="work" className="section">
      <h2>Case Studies</h2>
      <p className="muted">From FMCG, logistics &amp; education—each with context, role, actions, outcomes.</p>
      <div className="work-grid">
        {tiles.map(t=>(
          <article className="card" key={t.slug}>
            <div className="card__media">
              <img src={img(t.cover)} alt="" />
            </div>
            <div className="card__meta">
              <img className="logo-badge" src={logo(t.logo)} alt="" />
              <span>{t.meta}</span>
            </div>
            <h3>{t.title}</h3>
            <p>{t.blurb}</p>
            <div className="card__actions">
              <Link to={`/work/${t.slug}`} className="btn btn--ghost">Read case study →</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience(){
  return (
    <section id="experience" className="section">
      <h2>Experience</h2>
      <div className="xp-grid">
        <article className="card">
          <div className="card__meta">
            <img className="logo-badge logo-badge--onwhite" src={logo('stackbox.png')} alt="StackBOX logo" />
            <span>Sep 2023 – Present · 🇮🇳</span>
          </div>
          <h3>StackBOX</h3>
          <p className="muted">Assistant Project Manager — Supply Chain &amp; Delivery</p>
          <ul className="dashlist">
            <li>End-to-end launches: BRDs → SOP/KPI design → UAT → go-live → governance.</li>
            <li>Account lead (P&G PH): rendering optimisation; rules, dashboards, training.</li>
            <li>Cost tracking and inter-team coordination for on-time deployments.</li>
          </ul>
        </article>

        <article className="card">
          <div className="card__meta">
            <img className="logo-badge" src={logo('edgistify.png')} alt="Edgistify logo" />
            <span>Aug 2022 – Sep 2023 · 🇮🇳</span>
          </div>
          <h3>Edgistify</h3>
          <p className="muted">Manager, Solution Design</p>
          <ul className="dashlist">
            <li>Designed supply-chain solutions to improve KPIs and reduce costs.</li>
            <li>Drove vendor alignment and stakeholder buy-in for rollouts.</li>
          </ul>
        </article>

        <article className="card">
          <div className="card__meta">
            <img className="logo-badge logo-badge--onwhite" src={logo('mindseed.png')} alt="Mindseed logo" />
            <span>Dec 2021 – Aug 2022 · 🇮🇳</span>
          </div>
          <h3>Mindseed Education</h3>
          <p className="muted">Manager, Procurement &amp; Supply Chain</p>
          <ul className="dashlist">
            <li>Owned procurement strategy, benchmarking &amp; cost analysis.</li>
            <li>End-to-end operational oversight and supplier performance.</li>
          </ul>
        </article>

        <article className="card">
          <div className="card__meta">
            <img className="logo-badge" src={logo('dtdc.png')} alt="DTDC logo" />
            <span>Jan 2020 – Dec 2021 · 🇮🇳</span>
          </div>
          <h3>DTDC Express</h3>
          <p className="muted">Branch / Ops Manager</p>
          <ul className="dashlist">
            <li>Cleared COVID backlog via routing &amp; shift orchestration.</li>
            <li>Dashboards, training and RCA to improve service levels.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function Education(){
  return (
    <section id="education" className="section">
      <h2>Education &amp; Certifications</h2>
      <div className="edu">
        <div><strong>B.E., Mechanical Engineering</strong> — Mumbai University (2015–2019)</div>
        <div className="certs"><strong>Certifications</strong> — Lean Six Sigma Foundations · SAP S/4HANA Essentials · Project Mgmt Foundations · Supply Chain Foundations</div>
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section id="contact" className="section">
      <h2>Let’s build clarity into operations.</h2>
      <p className="muted">Email <a href="mailto:izhan@example.com">izhan@example.com</a> · <a href="https://www.linkedin.com/in/mohdizhan7/" target="_blank" rel="noreferrer">LinkedIn</a></p>
    </section>
  );
}

export default function Home(){
  return (
    <main>
      <Hero/>
      <section className="section-divider" aria-hidden="true"></section>
      <Work/>
      <section className="section-divider" aria-hidden="true"></section>
      <Experience/>
      <section className="section-divider" aria-hidden="true"></section>
      <Education/>
      <section className="section-divider" aria-hidden="true"></section>
      <Contact/>
    </main>
  );
}
