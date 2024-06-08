import React, { useEffect, useState } from 'react';
import UploadAudio from './UploadAudio';
import AudioList from './AudioList';
import FavoriteList from './FavoriteList';
import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './App.css';

const App = () => {
  const [audios, setAudios] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      const querySnapshot = await getDocs(collection(db, 'audios'));
      const audioList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAudios(audioList);
      setFavorites(audioList.filter(audio => audio.favorite));
    };

    fetchAudios();
  }, []);

  const handleUpload = (uploadedAudios) => {
    setAudios(prevAudios => [...prevAudios, ...uploadedAudios]);
  };

  const toggleFavorite = async (audio) => {
    const audioRef = doc(db, 'audios', audio.id);
    const newFavoriteStatus = !audio.favorite;
    await updateDoc(audioRef, { favorite: newFavoriteStatus });
    const updatedAudio = { ...audio, favorite: newFavoriteStatus };

    setAudios(prevAudios =>
      prevAudios.map(a => a.id === audio.id ? updatedAudio : a)
    );

    if (newFavoriteStatus) {
      setFavorites(prevFavorites => [...prevFavorites, updatedAudio]);
    } else {
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== audio.id));
    }
  };

  return (
    <div>
      <h1>Audios Mamãe</h1>
      <UploadAudio onUpload={handleUpload} />
      <div className='AudioListContainer'>
        <AudioList audios={audios.filter(audio => !audio.favorite)} onToggleFavorite={toggleFavorite} />
        <FavoriteList favorites={favorites} onToggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

export default App;
