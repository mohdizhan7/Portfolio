import { Link } from 'react-router-dom';
const BASE = import.meta.env.BASE_URL || '/';
const img = (p:string)=> `${BASE}${p}`;
const logo = (p:string)=> `${BASE}logos/${p}`;

export default function CaseItc(){
  return (
    <main className="case">
      <header className="case__head">
        <p className="crumb"><Link to="/">← Back to work</Link></p>
        <h1>WMS/TMS Site Setup & Operational Ramp</h1>
        <div className="meta">
          <img className="logo-badge" src={logo('ITC_Limited_Logo.svg')} alt="ITC" />
          <span>ITC · 🇮🇳 · 2023–24</span>
        </div>
      </header>

      <figure className="case__cover">
        <img src={img('logos/Image from Pinterest.jpg')} alt="" />
      </figure>

      <section className="case__grid">
        <div>
          <h3>Context</h3>
          <p>Rapid stand-up of two greenfield warehouses with clear KPIs and governance.</p>
        </div>
        <div>
          <h3>Role</h3>
          <p>Assistant Project Manager (StackBOX); cross-functional with product/ops.</p>
        </div>
        <div>
          <h3>Actions</h3>
          <p>Wrote BRDs and translated them into SOPs/KPIs and task configurations. Coordinated UAT, cutover, training and hyper-care. Set up cost tracking and cadence reviews.</p>
        </div>
        <div>
          <h3>Outcomes</h3>
          <p>Stable handoffs across teams and smoother daily governance. SOP/KPI adoption and faster onboarding of floor teams.</p>
        </div>
        <div>
          <h3>Tools</h3>
          <p>WMS/TMS · SOP/KPI playbooks · Dashboards</p>
        </div>
      </section>
    </main>
  );
}
