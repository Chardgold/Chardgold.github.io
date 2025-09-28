import React from 'react';
import { FaGithub, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>@chdgldcode</h3>
          </div>
          
          <div className="footer-center">
            <p>&copy; 2025 chdgldcode. All rights reserved.</p>
          </div>
          
          <div className="footer-right">
            <div className="footer-social">
              <a href="https://github.com/chdgldcode" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.facebook.com/itsmerichard15/" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.tiktok.com/@shaaaaaard?_t=ZS-906RbXY5HgA&_r=1" target="_blank" rel="noopener noreferrer">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;