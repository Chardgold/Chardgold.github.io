import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>✦ chdgldcode</h3>
            <p>Building digital experiences</p>
          </div>
          
          <div className="footer-center">
            <p>&copy; 2024 chdgldcode. All rights reserved.</p>
          </div>
          
          <div className="footer-right">
            <div className="footer-social">
              <a href="https://github.com/chdgldcode" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/chdgldcode" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/chdgldcode" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;