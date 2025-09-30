import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaFacebook, FaTiktok } from 'react-icons/fa';

const Hero = () => {
  const fullText = "Welcome to my personal achievements and goals—get to know more about me";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="home" className="hero">
      <div className="grid-background"></div>
      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div variants={itemVariants} className="hero-greeting">
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="hero-title">
            {fullText}
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-description">
           I am dedicated to exploring diverse opportunities that enhance my skills and actively engage in experiences that help me become the person I aspire to be.
          </motion.p>
          
          <motion.div variants={itemVariants} className="social-links">
            <a href="https://github.com/chdgldcode" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.facebook.com/itsmerichard15/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.tiktok.com/@shaaaaaard?_t=ZS-906RbXY5HgA&_r=1" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image"
          variants={itemVariants}
        >
          <div className="profile-container">
            <div className="profile-card">
              <img 
                src="/images/nbg.png" 
                alt="Profile" 
                className="profile-img"
              />
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>Available for work</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;