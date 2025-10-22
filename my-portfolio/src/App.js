import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DataTables from './pages/Datatables';
import './styles/App.css';

// Layout with header and footer for the main site
function LayoutWithHeaderFooter() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main site layout with header and footer */}
        <Route path="/" element={<LayoutWithHeaderFooter />} />

        {/* Datatables page (no header/footer) */}
        <Route path="/datatables" element={<DataTables />} />
      </Routes>
    </Router>
  );
}

export default App;
