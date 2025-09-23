import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create the email content in the exact format you want to receive
    const emailContent = `Hi ${formData.name},
📧Message Details:
---------------------------
From: ${formData.name}
Email: ${formData.email}
Sent: ${new Date().toLocaleString()}

Message:
"${formData.message}"
---------------------------

`;

    const emailData = {
      name: formData.name,
      email: formData.email,
      message: emailContent
    };

    console.log('📧 Sending contact form email to Richard with format:', emailContent);

    try {
      const result = await emailjs.send(
        'service_6xu14rt',            
        'template_ytn0o8v',           
        emailData,
        'YbScpICP-eWcjbtRv'          
      );

      console.log('✅ Email sent successfully to richard.kalim@msugensan.edu.ph');
      console.log('📋 Contact details captured:', {
        sender_name: formData.name,
        sender_email: formData.email,
        message_preview: formData.message.substring(0, 50) + '...',
        sent_at: new Date().toLocaleString()
      });
      
      alert(`✅ Message sent successfully!

Thank you ${formData.name} for reaching out! 

📧 I'll reply to: ${formData.email}
📝 Your message: "${formData.message}"
⏰ Sent: ${new Date().toLocaleString()}`);
      
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      
      alert(`❌ Failed to send message.

📤 FROM: ${formData.name} (${formData.email})
📝 MESSAGE: "${formData.message}"
❗ ERROR: ${error.message || 'Unknown error'}

Please contact me directly at: richard.kalim@msugensan.edu.ph`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-number">04.</span> Contact
        </motion.h2>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Get in touch</h3>
            <p>I'm interested in freelance opportunities. However, if you have other request or question, don't hesitate to contact me.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope />
                <div>
                  <span>Email</span>
                  <p>richard.kalim@msugensan.edu.ph</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone />
                <div>
                  <span>Phone</span>
                  <p>+63 123 456 7890</p>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <div>
                  <span>Location</span>
                  <p>Philippines</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;