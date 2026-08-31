import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wind, BarChart2, Calculator, Map, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Calculator', path: '/calculator', icon: <Calculator className="h-5 w-5" /> },
    { name: 'Emission Map', path: '/map', icon: <Map className="h-5 w-5" /> },
    { name: 'Advisor', path: '/advisor', icon: <Lightbulb className="h-5 w-5" /> },
    { name: 'Satellite Info', path: '/satellite-info', icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4-1a4 4 0 11-8 0 4 4 0 018 0zm6.39 4.56l-2.83-2.83a2 2 0 00-2.83 0l-1.42 1.42a2 2 0 000 2.83l2.83 2.83a2 2 0 002.83 0l1.42-1.42a2 2 0 000-2.83z" /></svg> },
  ];

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Wind className="h-8 w-8 text-primary-600" />
            </motion.div>
            <span className="text-2xl font-bold text-primary-600">AetherLedger</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-1 px-2 py-1 font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-primary-600'
                        : 'text-dark-600 hover:text-primary-600'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="rounded-md p-2 text-dark-600 hover:bg-dark-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-white md:hidden"
      >
        {isOpen && (
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 rounded-md px-3 py-2 transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-dark-600 hover:bg-dark-50 hover:text-primary-600'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </motion.div>
    </header>
  );
};