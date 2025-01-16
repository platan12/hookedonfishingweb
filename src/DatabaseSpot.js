import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "./firebaseConfig"; // Importa la configuració Firebase
import "./DatabaseSpot.css"; // Per estilitzar la taula

const DatabaseSpot = () => {
  const [items, setItems] = useState([]); // Estat per guardar els elements
  const [error, setError] = useState(null); // Estat per capturar errors
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/DatabaseUser');
  };

  useEffect(() => {
    // Funció per recuperar dades de Firestore
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // ID del document
            name: data.name,
            author: data.author,
            creationDate: data.creationDate?.toDate().toLocaleDateString(), // Converteix el Timestamp a una data llegible
            region: data.region,
            images: data.images || [],
          };
        });
        setItems(itemsList);
      } catch (err) {
        setError("Error carregant els elements de la base de dades.");
      }
    };

    fetchItems();
  }, []);

  // Funció per eliminar imatges del Storage
  const deleteImages = async (images) => {
    const deletePromises = images.map(async (imagePath) => {
      try {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef); // Elimina la imatge del Storage
      } catch (err) {
        console.error(`Error eliminant la imatge: ${imagePath}`, err);
      }
    });
    await Promise.all(deletePromises); // Espera que totes les imatges s'eliminin
  };

  // Funció per eliminar un element de Firestore i les seves imatges associades
  const handleDelete = async (id, images) => {
    const confirmDelete = window.confirm("Estàs segur que vols eliminar aquest element?");
    if (confirmDelete) {
      try {
        // Elimina les imatges del Storage
        await deleteImages(images);

        // Elimina el document de Firestore
        await deleteDoc(doc(db, "items", id));

        // Actualitza l'estat local
        setItems(items.filter((item) => item.id !== id));
      } catch (err) {
        setError("Error eliminant l'element i/o les seves imatges de la base de dades.");
        console.error(err);
      }
    }
  };


  return (
    <div className="database-container">
      <header className="header">
        <img src="/logo.png" alt="Logo" className="header-logo" /> {/* Imatge a l'esquerra */}
        <h1 className="header-title">Hola, Admin</h1> {/* Títol */}
        <div className="header-buttons">
          <button className="Spot-button">Spot DB</button>
          <button onClick={handleNav} className="User-button">User DB</button>
        </div>
        <button className="header-button header-right-button">Log Out</button> {/* Botó a la dreta */}
      </header>

      {error && <p className="error-message">{error}</p>} {/* Mostra errors si n'hi ha */}
      <table className="items-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Creation Date</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>{item.creationDate}</td>
              <td>{item.region}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id, item.images)} // Botó d'eliminació
                  className="delete-button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseSpot;