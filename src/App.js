import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import DatabaseSpot from './DatabaseSpot'; // La nova pàgina on vols navegar

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DatabaseSpot" element={<DatabaseSpot />} />
      </Routes>
    </Router>
  );
};

export default App;