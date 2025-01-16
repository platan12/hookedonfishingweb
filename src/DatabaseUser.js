import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Importa la configuració Firebase
import "./DatabaseUser.css"; // Per estilitzar la taula

const DatabaseUser = () => {
  const [items, setItems] = useState([]); // Estat per guardar els elements
  const [error, setError] = useState(null); // Estat per capturar errors
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/DatabaseSpot');
  };

  useEffect(() => {
    // Funció per recuperar dades de Firestore
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const itemsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // ID del document
            userName: data.userName,
            email: data.email,
            
          };
        });
        setItems(itemsList);
      } catch (err) {
        setError("Error carregant els elements de la base de dades.");
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="database-container">
      <header className="header">
        <img src="/logo.png" alt="Logo" className="header-logo" /> {/* Imatge a l'esquerra */}
        <h1 className="header-title">Hola, Admin</h1> {/* Títol */}
        <div className="header-buttons">
          <button onClick={handleNav} className="Spot-button">Spot DB</button>
          <button className="User-button">User DB</button>
        </div>
        <button className="header-button header-right-button">Log Out</button> {/* Botó a la dreta */}
      </header>

      {error && <p className="error-message">{error}</p>} {/* Mostra errors si n'hi ha */}
      <table className="items-table">
        <thead>
          <tr>
            <th>Name User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.userName}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseUser;