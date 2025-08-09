import { Link } from 'react-router-dom';
import { logos, covers } from '../logos';

export default function CasePg(){
  return (
    <main className="case">
      <header className="case__head">
        <p className="crumb"><Link to="/">← Back to work</Link></p>
        <h1>Rendering Optimisation (Philippines)</h1>
        <div className="meta">
          <img className="logo-badge" src={logos.pg} alt="P&G" />
          <span>P&amp;G · 🇵🇭 · 2023–24</span>
        </div>
      </header>

      <figure className="case__cover">
        <img src={covers.pg} alt="" />
      </figure>

      <section className="case__grid">
        <div>
          <h3>Context</h3>
          <p>High exception rates and uneven rendering flow across sites.</p>
        </div>
        <div>
          <h3>Role</h3>
          <p>Project/Account lead responsible for analysis, rules tuning and enablement.</p>
        </div>
        <div>
          <h3>Actions</h3>
          <p>Mapped AS-IS → TO-BE, tuned rules/exceptions and built dashboards. Ran training and coaching for floor teams.</p>
        </div>
        <div>
          <h3>Outcomes</h3>
          <p>Exception rate cut to low double-digits; sustained throughput after roll-out.</p>
        </div>
        <div>
          <h3>Tools</h3>
          <p>Rendering engine · Dashboards · SOPs</p>
        </div>
      </section>
    </main>
  );
}
