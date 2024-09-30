import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import Navigation from './components/navigation';
import NearMissPage from './pages/NearMissPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

function App() {
  return (

    <Router>
          <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/near-miss" element={<NearMissPage />} />
        <Route path="/gallery-page" element={<GalleryPage />} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;