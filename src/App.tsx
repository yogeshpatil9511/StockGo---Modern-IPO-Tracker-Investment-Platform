import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import IPODetails from './components/IPODetails';
import LiveIPOs from './components/LiveIPOs';
import UpcomingIPOs from './components/UpcomingIPOs';
import PastIPOs from './components/PastIPOs';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animated-background"></div>
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ipo/:id" element={<IPODetails />} />
            <Route path="/live" element={<LiveIPOs />} />
            <Route path="/upcoming" element={<UpcomingIPOs />} />
            <Route path="/past" element={<PastIPOs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;