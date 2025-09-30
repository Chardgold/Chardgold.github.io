import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('/home/richard');
  const [isTyping, setIsTyping] = useState(false);
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
                  content: `Elementary
School: Baluan Elementary School
Location: Baluan General Santos City
Graduated: 2016

Highschool
School: Baluan National High School
Location: Baluan General Santos City
Graduated: 2020

Senior High - Accountancy and Business Management (ABM)
School: Baluan National High School
Location: Baluan General Santos City
Graduated: 2020

College
School: Mindanao State University - General Santos
Location: General Santos City
Course: Network Engineering
Status: Currently Studying`
                },
                'skills.txt': {
                  type: 'file',
                  content: 'JavaScript, React, Node.js, Networking, Linux, Network Security, Cisco Technologies'
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
        'Try these files:',
        '  cat about.js',
        '  cat educational-attainment.txt',
        '  cat skills.txt'
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (isInView) {
      // Initial welcome message
      setTerminalHistory([
        { type: 'output', content: ['Welcome to Richard\'s Portfolio Terminal!'] },
        { type: 'output', content: ['Type "help" to see available commands.'] },
        { type: 'output', content: ['Try "cat about.js" to learn more about me!'] },
        { type: 'output', content: ['Or check "cat educational-attainment.txt" for my education background.'] },
        { type: 'output', content: [''] }
      ]);
    }
  }, [isInView]);

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
              <span className="terminal-title">richard@portfolio:~</span>
            </div>
            
            <div 
              className="terminal-content"
              ref={terminalRef}
              onClick={handleTerminalClick}
              style={{
                height: '400px',
                overflowY: 'auto',
                padding: '15px',
                backgroundColor: '#000',
                color: '#00ff00',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.4',
                cursor: 'text'
              }}
            >
              {/* Terminal History */}
              {terminalHistory.map((entry, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  {entry.type === 'input' ? (
                    <div style={{ color: '#ffffff' }}>{entry.content}</div>
                  ) : (
                    entry.content.map((line, lineIndex) => (
                      <div key={lineIndex} style={{ color: '#00ff00' }}>
                        {line}
                      </div>
                    ))
                  )}
                </div>
              ))}
              
              {/* Current Input Line */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#ffffff' }}>
                  richard@portfolio:{currentDirectory}$ 
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#00ff00',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    marginLeft: '5px',
                    flex: 1
                  }}
                  autoFocus={isInView}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "16px",
                    backgroundColor: "#00ff00",
                    marginLeft: "2px"
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Hacker Image */}
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

      <style jsx>{`
        .terminal-header {
          background: #2d2d2d;
          padding: 10px 15px;
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .terminal-controls {
          display: flex;
          gap: 8px;
        }

        .control {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control.red {
          background-color: #ff5f57;
        }

        .control.yellow {
          background-color: #ffbd2e;
        }

        .control.green {
          background-color: #28ca42;
        }

        .terminal-title {
          color: #ffffff;
          font-family: Monaco, Consolas, "Courier New", monospace;
          font-size: 14px;
        }

        .terminal-content {
          border: 1px solid #333;
          border-radius: 0 0 8px 8px;
          border-top: none;
        }

        .terminal-content::-webkit-scrollbar {
          width: 8px;
        }

        .terminal-content::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        .terminal-content::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
        }

        .terminal-content::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      `}</style>
    </section>
  );
};

export default About;