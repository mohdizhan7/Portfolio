import { useState } from 'react';
import './styles.css';

type Case = {
  id: string;
  company: string;
  title: string;
  year: string;
  flags: string[];
  logo: string;
  cover: string;
  summary: string;
  bullets: string[];
};

const CASES: Case[] = [
  {
    id: 'itc',
    company: 'ITC',
    title: 'WMS/TMS Site Setup & Operational Ramp',
    year: '2023–24',
    flags: ['🇮🇳'],
    logo: '/logos/ITC_Limited_Logo.svg',
    cover: '/covers/case-itc.jpg',
    summary:
      'Two greenfield sites; BRD → SOP/KPIs → testing → go-live. Stabilised ops with clear governance.',
    bullets: [
      'Role: Assistant Project Manager (StackBOX), cross-functional with product & ops.',
      'Wrote BRDs → translated to SOPs/KPIs and task configs.',
      'Coordinated UAT, cutover, training and hyper-care.',
      'Set up cadence reviews and cost tracking for handoffs.',
    ],
  },
  {
    id: 'pg',
    company: 'P&G',
    title: 'Rendering Optimisation (Philippines)',
    year: '2023–24',
    flags: ['🇵🇭'],
    logo: '/logos/Procter_&_Gamble_logo.svg.png',
    cover: '/covers/case-pg.jpg',
    summary:
      'AS-IS → TO-BE; tuned rules/exceptions & dashboards. Upskilled teams for sustained gains.',
    bullets: [
      'Mapped current rendering flow; designed TO-BE with tuned rules.',
      'Exception dashboards; training kits for floor teams.',
      'KPI uplift and smoother exception handling post-rollout.',
    ],
  },
  {
    id: 'dtdc',
    company: 'DTDC',
    title: 'COVID Backlog Clearance',
    year: '2020',
    flags: ['🇮🇳'],
    logo: '/logos/creativegaga-2023-03-4dbc16a4-2bb0-4ab0-9ddc-bc08d7918953-DTDC_New_Logo_1.jpeg.avif',
    cover: '/covers/case-dtdc.jpg',
    summary:
      'Partner network + routing & shift orchestration to clear backlog quickly.',
    bullets: [
      'Spun up partner network; re-orchestrated routing & shifts.',
      'Cleared 15,000-shipment backlog in one week.',
      'Restored on-time rate; dashboards + RCA for service levels.',
    ],
  },
];

export default function App() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>

      <header className="siteHeader" aria-label="Primary">
        <div className="wrap headerInner">
          <strong className="brand">Mohd Izhan Shaikh</strong>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#contact" className="cta cta--ghost">Contact</a>
          </nav>
        </div>
      </header>

      <main id="content">
        {/* HERO */}
        <section className="hero">
          <div className="wrap heroInner">
            <img
              src={`${import.meta.env.BASE_URL}izhan.jpg`}
              alt="Portrait of Mohd Izhan Shaikh"
              className="avatar"
              width="96"
              height="96"
              loading="eager"
              decoding="async"
            />
            <h1 className="headline">
              Designing lean, scalable
              <br />
              supply-chain operations.
            </h1>
            <p className="lede">
              Assistant Project Manager at StackBOX. I turn BRDs into SOPs/KPIs and lead WMS/TMS
              rollouts for FMCG, retail &amp; 3PL — clear governance, trained teams, measurable
              control.
            </p>
            <div className="ctaRow">
              <a href="#work" className="cta">View Work</a>
              <a href="#contact" className="cta cta--ghost">Contact</a>
              <a href={`${import.meta.env.BASE_URL}Izhan-Resume.pdf`} className="cta cta--ghost">Download Resume</a>
              <a href="https://www.linkedin.com/in/mohd-izhan-shaikh" target="_blank" rel="noreferrer" className="cta cta--ghost">LinkedIn</a>
            </div>

            <ul className="chips" aria-label="Quick facts">
              <li>6+ years</li>
              <li>FMCG · Retail · 3PL</li>
              <li>WMS/TMS · SAP S/4HANA basics</li>
              <li>Lean Six Sigma · RCA</li>
              <li>Mumbai, IN · open to hybrid/relocation</li>
            </ul>
          </div>
        </section>

        {/* WORK / CASE STUDIES */}
        <section id="work" className="section">
          <div className="wrap">
            <h2>Case Studies</h2>
            <p className="muted sublede">
              From FMCG, logistics &amp; education — each with context, role, actions, outcomes.
            </p>
            <div className="cards">
              {CASES.map(cs => (
                <article key={cs.id} className="card" aria-labelledby={`${cs.id}-t`}>
                  <div className="cardHeader">
                    <img src={cs.logo} alt={`${cs.company} logo`} className="logo" />
                    <div className="meta">
                      <span className="company">{cs.company}</span>
                      <span className="dot">•</span>
                      <span>{cs.year}</span>
                      {cs.flags.map(f => (
                        <span key={f} className="flag">{f}</span>
                      ))}
                    </div>
                  </div>
                  <h3 id={`${cs.id}-t`} className="cardTitle">{cs.title}</h3>
                  <p className="cardSummary">{cs.summary}</p>
                  <div className="cardActions">
                    <button className="cta" onClick={() => setOpen(cs.id)}>
                      Read case study →
                    </button>
                  </div>
                  <img src={cs.cover} alt="" className="cover" loading="lazy" decoding="async" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="wrap">
            <h2>Experience</h2>
            <div className="expGrid">
              <article className="exp">
                <div className="expTop">
                  <div className="expBrand">
                    <img src="/logos/SBX Logo_PNG2.png" alt="StackBOX" className="logo pill" />
                    <h3>StackBOX</h3>
                  </div>
                  <div className="expTime">Sep 2023 – Present · 🇮🇳</div>
                </div>
                <p className="role">Assistant Project Manager — Supply Chain &amp; Delivery</p>
                <ul className="expList">
                  <li>End-to-end launches: BRDs, SOP/KPI design, UAT, go-live, governance.</li>
                  <li>Account lead for P&amp;G PH rendering optimisation (rules, dashboards, training).</li>
                  <li>Cost tracking &amp; inter-team coordination for on-time deployments.</li>
                </ul>
              </article>

              <article className="exp">
                <div className="expTop">
                  <div className="expBrand">
                    <img src="/logos/edgistify.png" alt="Edgistify" className="logo pill" />
                    <h3>Edgistify</h3>
                  </div>
                  <div className="expTime">Aug 2022 – Sep 2023 · 🇮🇳</div>
                </div>
                <p className="role">Manager, Solution Design</p>
                <ul className="expList">
                  <li>Designed supply-chain solutions to improve KPIs and reduce costs.</li>
                  <li>Drove vendor alignment and stakeholder buy-in for rollouts.</li>
                </ul>
              </article>

              <article className="exp">
                <div className="expTop">
                  <div className="expBrand">
                    <img src="/logos/300967522_509073977885691_1283772767524283947_n.png" alt="Mindseed Education" className="logo pill" />
                    <h3>Mindseed Education</h3>
                  </div>
                  <div className="expTime">Dec 2021 – Aug 2022 · 🇮🇳</div>
                </div>
                <p className="role">Manager, Procurement &amp; Supply Chain</p>
                <ul className="expList">
                  <li>Procurement strategy, benchmarking &amp; cost analysis across categories.</li>
                  <li>Operational oversight and supplier performance.</li>
                </ul>
              </article>

              <article className="exp">
                <div className="expTop">
                  <div className="expBrand">
                    <img src="/logos/creativegaga-2023-03-4dbc16a4-2bb0-4ab0-9ddc-bc08d7918953-DTDC_New_Logo_1.jpeg.avif" alt="DTDC" className="logo pill" />
                    <h3>DTDC</h3>
                  </div>
                  <div className="expTime">Jan 2020 – Dec 2021 · 🇮🇳</div>
                </div>
                <p className="role">Branch / Ops Manager</p>
                <ul className="expList">
                  <li>Cleared COVID backlog via routing &amp; shift orchestration.</li>
                  <li>Dashboards, training and RCA to improve service levels.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section">
          <div className="wrap">
            <h2>Education &amp; Certifications</h2>
            <div className="badgeLine">
              <span className="badge">B.E., Mechanical Engineering — Mumbai University</span>
              <span className="badge">Lean Six Sigma Foundations</span>
              <span className="badge">SAP S/4HANA Essentials</span>
              <span className="badge">Project Mgmt Foundations</span>
              <span className="badge">Supply Chain Foundations</span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="wrap">
            <h2>Let’s build clarity into operations.</h2>
            <p className="lede">mohdizhan7@gmail.com · <a href="https://www.linkedin.com/in/mohd-izhan-shaikh" target="_blank" rel="noreferrer">LinkedIn</a></p>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="wrap">© {new Date().getFullYear()} Mohd Izhan Shaikh</div>
      </footer>

      {/* Lightweight modal for case studies */}
      {CASES.map(cs => (
        <dialog key={cs.id} className="modal" open={open === cs.id} onClose={() => setOpen(null)} aria-labelledby={`${cs.id}-modal-title`}>
          <div className="modalBox">
            <button className="modalClose" aria-label="Close" onClick={() => setOpen(null)}>×</button>
            <header className="modalHead">
              <img src={cs.logo} alt="" className="logo" />
              <h3 id={`${cs.id}-modal-title`}>{cs.title}</h3>
              <p className="muted">{cs.company} · {cs.year} {cs.flags.join(' ')}</p>
            </header>
            <div className="modalBody">
              <p className="lede">{cs.summary}</p>
              <div className="modalCols">
                <ul className="modalList">
                  {cs.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
                <img src={cs.cover} alt="" className="modalCover" loading="lazy" />
              </div>
            </div>
          </div>
        </dialog>
      ))}
    </>
  );
}
