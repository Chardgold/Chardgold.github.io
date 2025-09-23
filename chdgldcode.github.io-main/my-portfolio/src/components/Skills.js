import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: '🌐', color: '#e34c26' },
    { name: 'CSS3', icon: '🎨', color: '#1572b6' },
    { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'Node.js', icon: '🟢', color: '#68a063' },
    { name: 'PHP', icon: '🐘', color: '#777bb4' },
    { name: 'Git', icon: '📦', color: '#f05032' },
    { name: 'Figma', icon: '🎯', color: '#f24e1e' }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-number">03.</span> Skills
        </motion.h2>
        
        <motion.div 
          className="skills-grid"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="skill-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ '--skill-color': skill.color }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;