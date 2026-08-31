import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Wind className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold text-white">AetherLedger</span>
            </Link>
            <p className="text-dark-300">
              Track your emissions. Predict their path. Protect your people.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-300 hover:text-primary-400" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-400" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-400" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-400" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-dark-300 hover:text-primary-400">Dashboard</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-dark-300 hover:text-primary-400">Carbon Calculator</Link>
              </li>
              <li>
                <Link to="/map" className="text-dark-300 hover:text-primary-400">Emission Map</Link>
              </li>
              <li>
                <Link to="/advisor" className="text-dark-300 hover:text-primary-400">Filter Advisor</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">API</a>
              </li>
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">Blog</a>
              </li>
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">Case Studies</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">About Us</a>
              </li>
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">Careers</a>
              </li>
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">Contact</a>
              </li>
              <li>
                <a href="#" className="text-dark-300 hover:text-primary-400">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-dark-700 pt-8 text-center text-dark-400">
          <p>&copy; {new Date().getFullYear()} AetherLedger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};