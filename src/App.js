import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import DatabaseSpot from './DatabaseSpot';
import DatabaseUser from './DatabaseUser'; // La nova pàgina on vols navegar
import AddSpot from "./AddSpot";
import UserSpots from "./UserSpots";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DatabaseSpot" element={<DatabaseSpot />} />
        <Route path="/DatabaseUser" element={<DatabaseUser />} />
        <Route path="/AddSpot" element={<AddSpot />} />
        <Route path="/user-spots/:email" element={<UserSpots />} />
      </Routes>
    </Router>
  );
};

export default App;