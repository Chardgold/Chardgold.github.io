import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('/home/richard');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const fileSystem = {
    '/': {
      type: 'directory',
      contents: {
        'home': {
          type: 'directory',
          contents: {
            'richard': {
              type: 'directory',
              contents: {
                'about.js': {
                  type: 'file',
                  content: `const aboutMe = {
  name: 'Richard Kalim Jr.',
  location: 'General Santos City',
  school: 'Mindanao State University - General Santos',
  goal: 'To become Network Engineer',
  interests: ['Learning new technologies', 'Networking Tech'],
  quote: 'The world is full of good people. If you cannot find one be one'
};`
                },
                'projects': {
                  type: 'directory',
                  contents: {
                    'portfolio.md': {
                      type: 'file',
                      content: '# My Portfolio\nCollection of my work and projects...'
                    }
                  }
                },
                'educational-attainment.txt': {
                  type: 'file',
                  content: `Elementary School:
School: Baluan Elementary School
Location: Baluan General Santos City
Graduated: 2016

High School:
School: Baluan National High School
Location: Baluan General Santos City
Graduated: 2020

Senior High - Accountancy and Business Management (ABM):
School: Baluan National High School
Location: Baluan General Santos City
Graduated: 2020`
                }
              }
            }
          }
        },
        'usr': {
          type: 'directory',
          contents: {}
        },
        'var': {
          type: 'directory',
          contents: {}
        }
      }
    }
  };

  const commands = {
    help: () => ({
      output: [
        'Available commands:',
        '  help     - Show this help message',
        '  ls       - List directory contents',
        '  cd       - Change directory',
        '  pwd      - Print working directory',
        '  whoami   - Display current user',
        '  cat      - Display file contents',
        '  clear    - Clear terminal',
        '',
        'Navigation tips:',
        '  cd ..    - Go to parent directory',
        '  cd ~     - Go to home directory',
        '  ls -la   - List with details'
      ]
    }),

    pwd: () => ({
      output: [currentDirectory]
    }),

    whoami: () => ({
      output: ['richard']
    }),

    clear: () => {
      setTerminalHistory([]);
      return { output: [] };
    },

    ls: (args = []) => {
      const currentPath = getCurrentPath();
      if (!currentPath || currentPath.type !== 'directory') {
        return { output: ['ls: cannot access directory'] };
      }

      const contents = Object.keys(currentPath.contents);
      if (contents.length === 0) {
        return { output: [] };
      }

      if (args.includes('-la') || args.includes('-l')) {
        const detailed = contents.map(name => {
          const item = currentPath.contents[name];
          const type = item.type === 'directory' ? 'd' : '-';
          const permissions = item.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--';
          const size = item.type === 'directory' ? '4096' : (item.content?.length || '0');
          return `${type}${permissions} 1 richard richard ${size.padStart(8)} Dec 30 12:00 ${name}`;
        });
        return { output: detailed };
      } else {
        return { output: [contents.join('  ')] };
      }
    },

    cd: (args = []) => {
      if (args.length === 0 || args[0] === '~') {
        setCurrentDirectory('/home/richard');
        return { output: [] };
      }

      const target = args[0];
      let newPath;

      if (target === '..') {
        const pathParts = currentDirectory.split('/').filter(p => p);
        if (pathParts.length > 0) {
          pathParts.pop();
          newPath = '/' + pathParts.join('/');
          if (newPath === '/') newPath = '/';
        } else {
          newPath = '/';
        }
      } else if (target.startsWith('/')) {
        newPath = target;
      } else {
        newPath = currentDirectory === '/' ? `/${target}` : `${currentDirectory}/${target}`;
      }

      const targetPath = getPathContents(newPath);
      if (targetPath && targetPath.type === 'directory') {
        setCurrentDirectory(newPath);
        return { output: [] };
      } else {
        return { output: [`cd: ${target}: No such file or directory`] };
      }
    },

    cat: (args = []) => {
      if (args.length === 0) {
        return { output: ['cat: missing file operand'] };
      }

      const filename = args[0];
      const currentPath = getCurrentPath();
      
      if (currentPath && currentPath.contents && currentPath.contents[filename]) {
        const file = currentPath.contents[filename];
        if (file.type === 'file') {
          return { output: file.content.split('\n') };
        } else {
          return { output: [`cat: ${filename}: Is a directory`] };
        }
      } else {
        return { output: [`cat: ${filename}: No such file or directory`] };
      }
    }
  };

  const getCurrentPath = () => {
    return getPathContents(currentDirectory);
  };

  const getPathContents = (path) => {
    const parts = path.split('/').filter(p => p);
    let current = fileSystem['/'];

    for (const part of parts) {
      if (current && current.contents && current.contents[part]) {
        current = current.contents[part];
      } else {
        return null;
      }
    }

    return current;
  };

  const executeCommand = async (input) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const [command, ...args] = trimmedInput.split(' ');
    
    // Add command to history
    setTerminalHistory(prev => [
      ...prev,
      { type: 'input', content: `richard@portfolio:${currentDirectory}$ ${trimmedInput}` }
    ]);

    // Execute command
    if (commands[command]) {
      const result = commands[command](args);
      if (result && result.output && result.output.length > 0) {
        setTerminalHistory(prev => [
          ...prev,
          { type: 'output', content: result.output }
        ]);
      }
    } else {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'output', content: [`${command}: command not found`] }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleTerminalClick = () => {
    // Show welcome message on first click
    if (!showWelcome) {
      setShowWelcome(true);
      setTerminalHistory([
        { type: 'output', content: ['Welcome to Richard\'s Portfolio Terminal!'] },
        { type: 'output', content: ['Type "help" to see available commands.'] },
        { type: 'output', content: ['Try "cat about.js" to learn more about me!'] },
        { type: 'output', content: [''] }
      ]);
    }
    
    // Focus input immediately
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Initialize terminal when component comes into view
  useEffect(() => {
    if (isInView && !isInitialized) {
      setIsInitialized(true);
    }
  }, [isInView, isInitialized]);

  return (
    <section id="about" className="about">
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
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="about-text">
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control red"></span>
                <span className="control yellow"></span>
                <span className="control green"></span>
              </div>
              <span className="terminal-title">richard@portfolio:~</span>
            </div>
            
            <div 
              className="terminal-content"
              ref={terminalRef}
              onClick={handleTerminalClick}
            >
              {!showWelcome ? (
                <div className="terminal-placeholder">
                  <div className="output-line">Click to start terminal...</div>
                </div>
              ) : (
                <>
                  {/* Terminal History */}
                  {terminalHistory.map((entry, index) => (
                    <div key={index} className="terminal-line">
                      {entry.type === 'input' ? (
                        <div className="input-line">{entry.content}</div>
                      ) : (
                        entry.content.map((line, lineIndex) => (
                          <div key={lineIndex} className="output-line">
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                  
                  {/* Current Input Line */}
                  <div className="current-input-line">
                    <span className="prompt">
                      richard@portfolio:{currentDirectory}$ 
                    </span>
                    <span className="input-display">{currentInput}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="terminal-input"
                    />
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ 
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="cursor"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Hacker Image */}
          <div className="hacker-image">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src="/images/images-removebg-preview.png"
                alt="Hacker"
                className="hacker-img"
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