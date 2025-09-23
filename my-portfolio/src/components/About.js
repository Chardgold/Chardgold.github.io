import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [displayedText, setDisplayedText] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const codeLines = [
    "const aboutMe = {",
    "  name: 'chdgldcode',",
    "  title: 'Frontend Developer',", 
    "  location: 'Philippines',",
    "  passion: 'Creating amazing web experiences'",
    "}"
  ];

  useEffect(() => {
    if (!isInView) {
      // Reset when out of view
      setDisplayedText([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      return;
    }

    if (currentLineIndex < codeLines.length) {
      const currentLine = codeLines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => {
            const newText = [...prev];
            if (!newText[currentLineIndex]) {
              newText[currentLineIndex] = '';
            }
            newText[currentLineIndex] += currentLine[currentCharIndex];
            return newText;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, Math.random() * 30 + 15); // Faster typing: 15-45ms (was 30-80ms)
        
        return () => clearTimeout(timer);
      } else {
        // Move to next line after a shorter pause
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 150); // Shorter pause: 150ms (was 300ms)
        
        return () => clearTimeout(timer);
      }
    }
  }, [currentCharIndex, currentLineIndex, isInView]);

  const formatLine = (text, lineNum) => {
    if (!text) return null;

    // Simple syntax highlighting
    const parts = [];
    let remaining = text;
    
    // Keywords
    remaining = remaining.replace(/(const|let|var)/g, '<span class="keyword">$1</span>');
    // Strings
    remaining = remaining.replace(/('[^']*')/g, '<span class="string">$1</span>');
    // Properties
    remaining = remaining.replace(/(\w+):/g, '<span class="property">$1</span>:');
    // Brackets
    remaining = remaining.replace(/([{}])/g, '<span class="bracket">$1</span>');
    
    return (
      <div className="code-line" key={lineNum}>
        <span className="line-number">{String(lineNum + 1).padStart(2, '0')}</span>
        <span 
          className="code"
          dangerouslySetInnerHTML={{ __html: remaining }}
        />
      </div>
    );
  };

  return (
    <section id="about" className="about" style={{ padding: '80px 20px' }}>
      <div className="container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.6,
              onComplete: () => setIsInView(true)
            }
          }}
          onViewportLeave={() => setIsInView(false)}
          viewport={{ once: false }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '60px',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <div className="about-text" style={{ flex: 1 }}>
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control red"></span>
                <span className="control yellow"></span>
                <span className="control green"></span>
              </div>
              <span className="terminal-title">about-me.js</span>
            </div>
            
            <div className="terminal-content">
              {displayedText.map((line, index) => formatLine(line, index))}
              
              {/* Blinking cursor */}
              {isInView && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "20px",
                    backgroundColor: "#00ff00",
                    marginLeft: "2px"
                  }}
                />
              )}
            </div>
          </div>
          
          {/* Hacker Image - Clean without background effects */}
          <div 
            className="hacker-image"
            style={{ 
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src="/images/images-removebg-preview.png"
                alt="Hacker"
                style={{
                  width: '250px',
                  height: '250px',
                  objectFit: 'contain'
                }}
              />
            </motion.div>
          </div>
          
          <div className="about-avatar">
            <div className="avatar-container">
              <img />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;