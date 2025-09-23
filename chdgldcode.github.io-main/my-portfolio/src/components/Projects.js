import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="section-number">02.</span> Projects
          </h2>
        </motion.div>
        
        <motion.div 
          className="empty-projects"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="empty-state">
            <div className="empty-icon">🚀</div>
            <h3>Projects Coming Soon</h3>
            <p>I'm currently working on some exciting projects. Check back soon!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;