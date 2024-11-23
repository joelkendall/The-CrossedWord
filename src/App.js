import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './main/js/pages/Home';
import Details from './main/js/pages/Details';
import Display from './main/js/pages/Display'; // Ensure Display component is imported

function App() {
  return (
    <Router>
      <div className="App">
        {/* ROUTES */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/display" element={<Display />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;