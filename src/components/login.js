import React from 'react';
import './login.css'; // Fitxer CSS per estilitzar la pàgina

const Login = () => {
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
        <button>Log In</button>
      </div>
    </div>
  );
};

export default Login;