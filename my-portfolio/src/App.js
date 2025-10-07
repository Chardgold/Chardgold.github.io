import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DataTables from './pages/Datatables';
import './styles/App.css';

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

        {/* Datatables route — no header/footer */}
        <Route path="/datatables" element={<DataTables />} />
      </Routes>
    </Router>
  );
}

export default App;
