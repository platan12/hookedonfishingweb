import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí podries afegir validacions abans de redirigir
    navigate('/DatabaseSpot'); // Navega a la pàgina "Dashboard"
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1 className="title">HOOKED ON FISHING</h1>
        <img src="/logo.png" alt="Logo" className="logo" />
      </header>
      <div className="login-form">
        <img src="/logo.png" alt="Logo" className="logo2" />
        <input type="text" placeholder="Usuari" />
        <input type="password" placeholder="Contrasenya" />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Login;