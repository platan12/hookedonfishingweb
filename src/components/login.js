import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      // Si l'usuari i contrasenya són correctes, redirigeix
      navigate('/DatabaseSpot');
    } else {
      // Si són incorrectes, mostra un missatge d'error
      setErrorMessage('Usuari o contrasenya incorrectes');
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1 className="title">HOOKED ON FISHING</h1>
        <img src="/logo.png" alt="Logo" className="logo" />
      </header>
      <div className="login-form">
        <img src="/logo.png" alt="Logo" className="logo2" />
        <input
          type="text"
          placeholder="Usuari"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Actualitza el valor de l'usuari
        />
        <input
          type="password"
          placeholder="Contrasenya"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualitza el valor de la contrasenya
        />
        <button onClick={handleLogin}>Log In</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostra el missatge d'error */}
      </div>
    </div>
  );
};

export default Login;