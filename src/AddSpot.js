import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import "./AddSpot.css";

const AddSpot = () => {
  const [formData, setFormData] = useState({
    author: "",
    description: "",
    fishingStyle: "",
    images: [],
    locationlng: "",
    locationlat: "",
    name: "",
    region: "",
    species: "Test",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Manejar canvis al formulari
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar la selecció d'imatges
  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  // Manejar l'enviament del formulari
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pujar imatges al Firebase Storage
      const uploadedImages = [];
      for (const file of imageFiles) {
        const imageRef = ref(storage, `spots/${file.name}`);
        await uploadBytes(imageRef, file);
        uploadedImages.push(`spots/${file.name}`);
      }

      // Afegir les dades al Firestore
      await addDoc(collection(db, "items"), {
        ...formData,
        images: uploadedImages,
        creationDate: serverTimestamp(), // Marca de temps del servidor
        location: {
          lat: formData.locationlat,
          lng: formData.locationlng,
        },
      });

      // Redirigeix enrere a DatabaseSpot
      navigate('/DatabaseSpot');
    } catch (err) {
      setError("Error afegint l'entrada. Si us plau, torna-ho a intentar.");
      console.error(err);
    }
  };

  return (
    <div className="add-spot-container">
      <h1>Afegir una nova entrada</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-spot-form">
        <label>
          Author:
          <input type="text" name="author" value={formData.author} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Fishing Style:
          <input type="text" name="fishingStyle" value={formData.fishingStyle} onChange={handleChange} required />
        </label>
        <label>
          Images:
          <input type="file" multiple onChange={handleImageChange} />
        </label>
        <label>
          Location (Latitude):
          <input type="text" name="locationlat" value={formData.locationlat} onChange={handleChange} required />
        </label>
        <label>
          Location (Longitude):
          <input type="text" name="locationlng" value={formData.locationlng} onChange={handleChange} required />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Region:
          <input type="text" name="region" value={formData.region} onChange={handleChange} required />
        </label>
        <button type="submit">Afegir Entrada</button>
      </form>
      <button onClick={() => navigate("/DatabaseSpot")} className="back-button">
          Tornar a Spots DB
        </button>
    </div>
    
  );
};

export default AddSpot;
