import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./UserSpots.css"; // Per estilitzar la taula

const UserSpots = () => {
  const { email } = useParams(); // Obté el correu de l'usuari de la ruta
  const [spots, setSpots] = useState([]); // Estat per guardar els spots
  const [error, setError] = useState(null); // Estat per capturar errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSpots = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const userSpots = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              author: data.author,
              creationDate: data.creationDate?.toDate().toLocaleDateString(),
              region: data.region,
              images: data.images || [],
            };
          })
          .filter((spot) => spot.author === email); // Filtra els spots per autor
        setSpots(userSpots);
      } catch (err) {
        setError("Error carregant els spots de l'usuari.");
      }
    };

    fetchUserSpots();
  }, [email]);

  return (
    <div className="user-spots-container">
      <header className="header">
        <h1 className="header-title">Spots de l'usuari: {email}</h1>
        <button onClick={() => navigate("/DatabaseUser")} className="back-button">
          Tornar a Users DB
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}
      <table className="spots-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {spots.map((spot) => (
            <tr key={spot.id}>
              <td>{spot.name}</td>
              <td>{spot.creationDate}</td>
              <td>{spot.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSpots;
