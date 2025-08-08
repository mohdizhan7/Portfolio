import React from "react";
import { motion } from "framer-motion";
import "./styles.css";
import profilePic from "../public/izhan.jpg";

function App() {
  return (
    <div className="app-container">
      {/* HERO SECTION */}
      <section className="hero">
        <motion.img
          src={profilePic}
          alt="Mohd Izhan Shaikh"
          className="profile-img"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Mohd Izhan Shaikh
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Supply Chain & Project Management Specialist
        </motion.h2>

        <div className="cta">
          <a href="#work" className="btn btn--primary">View Work</a>
          <a href="#contact" className="btn btn--ghost">Contact</a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I am a results-driven professional with expertise in supply chain operations,
          vendor management, WMS/TMS solutions, and cross-functional project delivery.
        </motion.p>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="section dark">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Work
        </motion.h2>
        <div className="work-grid">
          <motion.div
            className="work-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>ITC Dairy – WMS & TMS Implementation</h3>
            <p>Designed & deployed end-to-end warehouse & transport solutions.</p>
          </motion.div>
          <motion.div
            className="work-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>P&G Philippines – Rendering Optimization</h3>
            <p>Streamlined operations and improved process efficiency.</p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Get in Touch
        </motion.h2>
        <p>Email: <a href="mailto:izhan@example.com">izhan@example.com</a></p>
      </section>
    </div>
  );
}

export default App;
