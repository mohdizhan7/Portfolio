import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CaseItc from './pages/CaseItc';
import CasePg from './pages/CasePg';
import CaseDtdc from './pages/CaseDtdc';

function Nav() {
  const loc = useLocation();
  const onHome = loc.pathname === '/' || loc.pathname === '';
  return (
    <div className="nav" role="navigation" aria-label="Primary">
      <div className="nav-inner">
        <strong>Mohd Izhan Shaikh</strong>
        <nav style={{display:'flex',gap:16,alignItems:'center'}}>
          <NavLink to="/" className={({isActive})=>isActive?'active':''}>About</NavLink>
          {onHome ? <a href="#work">Work</a> : <Link to="/">Work</Link>}
          {onHome ? <a href="#experience">Experience</a> : <Link to="/#experience">Experience</Link>}
          {onHome ? <a href="#education">Education</a> : <Link to="/#education">Education</Link>}
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </div>
  );
}

export default function App(){
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/work/itc-ramp" element={<CaseItc/>} />
        <Route path="/work/pg-rendering" element={<CasePg/>} />
        <Route path="/work/dtdc-backlog" element={<CaseDtdc/>} />
      </Routes>
    </>
  );
}
