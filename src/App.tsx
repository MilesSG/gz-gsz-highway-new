import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import TrafficFlow from './pages/TrafficFlow';
import SpeedAnalysis from './pages/SpeedAnalysis';
import CongestionMap from './pages/CongestionMap';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/traffic-flow" element={<TrafficFlow />} />
          <Route path="/speed-analysis" element={<SpeedAnalysis />} />
          <Route path="/congestion-map" element={<CongestionMap />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App; 