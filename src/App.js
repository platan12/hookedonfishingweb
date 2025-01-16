import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import DatabaseSpot from './DatabaseSpot';
import DatabaseUser from './DatabaseUser'; // La nova pàgina on vols navegar

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DatabaseSpot" element={<DatabaseSpot />} />
        <Route path="/DatabaseUser" element={<DatabaseUser />} />
      </Routes>
    </Router>
  );
};

export default App;