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
}
