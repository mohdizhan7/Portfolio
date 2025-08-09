import { Link } from 'react-router-dom';
import { logos, covers } from '../logos';

export default function CaseDtdc(){
  return (
    <main className="case">
      <header className="case__head">
        <p className="crumb"><Link to="/">← Back to work</Link></p>
        <h1>COVID Backlog Clearance</h1>
        <div className="meta">
          <img className="logo-badge" src={logos.dtdc} alt="DTDC" />
          <span>DTDC · 🇮🇳 · 2020</span>
        </div>
      </header>

      <figure className="case__cover">
        <img src={covers.dtdc} alt="Worker sorting parcels on a line" />
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
