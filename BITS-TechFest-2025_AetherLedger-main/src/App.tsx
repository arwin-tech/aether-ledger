import React from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { MapPage } from './pages/MapPage';
import { SatelliteInfoPage } from './pages/SatelliteInfoPage';
import { AdvisorPage } from './pages/AdvisorPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/satellite-info" element={<SatelliteInfoPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;