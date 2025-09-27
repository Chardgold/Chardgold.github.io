import React from 'react';
import { motion } from 'framer-motion';

const Certificates = () => {
  const certificates = [
    { 
      name: 'Cyber Threat Management', 
      image: '/images/Screenshot_2025-09-27_210003-removebg-preview.png', 
      color: '#e34c26',
      link: 'https://www.credly.com/badges/c4161644-832a-419d-ab4a-8bf6cf20ee2d/public_url'
    },
    { 
      name: 'Introduction to IoT', 
      image: '/images/Intro2IoT-removebg-preview.png', 
      color: '#1572b6',
      link: 'https://www.credly.com/badges/4471c03b-90a4-42c4-a163-d3ff62b40c7f/public_url'
    },
    { 
      name: 'LFC108: Cybersecurity Essentials', 
      image: '/images/blob-removebg-preview.png', 
      color: '#f7df1e',
      link: 'https://www.credly.com/badges/9668159d-c559-43b0-bf51-69f3d5239c5b/public_url' 
    },
  ];

  const handleCertificateClick = (link) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="certificates" className="certificates">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-number">03.</span> Certificates
        </motion.h2>
        
        <motion.div 
          className="certificates-grid"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {certificates.map((certificate, index) => (
            <motion.div 
              key={index}
              className="certificate-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ '--certificate-color': certificate.color }}
              onClick={() => handleCertificateClick(certificate.link)}
            >
              <div className="certificate-icon">
                <img 
                  src={certificate.image} 
                  alt={`${certificate.name} Certificate`}
                  className="certificate-image"
                />
              </div>
              <h3 className="certificate-name">{certificate.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;