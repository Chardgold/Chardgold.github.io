import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm a web designer and front-end developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

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
            {displayText}
            <span className="cursor">|</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-description">
            I'm someone who has always been invested in programming and creating visually appealing, 
            functional interfaces for the web. I love working with modern technologies and creating 
            seamless user experiences.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-buttons">
            <button className="btn btn-primary">
              About me →
            </button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="social-links">
            <a href="https://github.com/chdgldcode" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/chdgldcode" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/chdgldcode" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
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