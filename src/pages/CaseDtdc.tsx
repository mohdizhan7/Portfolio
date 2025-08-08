import { Link } from 'react-router-dom';
const BASE = import.meta.env.BASE_URL || '/';
const img = (p:string)=> `${BASE}${p}`;
const logo = (p:string)=> `${BASE}logos/${p}`;

export default function CaseDtdc(){
  return (
    <main className="case">
      <header className="case__head">
        <p className="crumb"><Link to="/">← Back to work</Link></p>
        <h1>COVID Backlog Clearance</h1>
        <div className="meta">
          <img className="logo-badge" src={logo('images.png')} alt="DTDC" />
          <span>DTDC · 🇮🇳 · 2020</span>
        </div>
      </header>

      <figure className="case__cover">
        <img src={img('logos/creativegaga-2023-03-4dbc16a4-2bb0-4ab0-9ddc-bc08d7918953-DTDC_New_Logo_1.jpeg.avif')} alt="" />
      </figure>

      <section className="case__grid">
        <div>
          <h3>Context</h3>
          <p>Large pandemic backlog with service-level risk.</p>
        </div>
        <div>
          <h3>Role</h3>
          <p>Branch/Ops Manager orchestrating partner network and shifts.</p>
        </div>
        <div>
          <h3>Actions</h3>
          <p>Partner routing, shift orchestration, dashboards and RCA-driven training.</p>
        </div>
        <div>
          <h3>Outcomes</h3>
          <p>Backlog cleared in ~one week and service levels stabilised.</p>
        </div>
        <div>
          <h3>Tools</h3>
          <p>Routing · Dashboards · RCA</p>
        </div>
      </section>
    </main>
  );
}
