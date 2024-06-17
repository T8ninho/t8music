import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebase/firebase';
import { GoUpload } from "react-icons/go";
import { Upload } from './style/StyledComponts';

const UploadMusic = ({ enviando, dbName }) => {
  const [audios, setAudios] = useState([]);
  const [musicName, setMusicName] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [autor, setAutor] = useState('');

  const handleUpload = async () => {
    const uploadedAudios = [];
    if(musicName === '' || autor === '' || playlist === '') {
      return
    }
    for (const audio of audios) {
      const audioRef = ref(storage, `${dbName}/${musicName}`);
      await uploadBytes(audioRef, audio);
      const url = await getDownloadURL(audioRef);

      const dataAtual = new Date(); // Pega a data e hora atual

      const audioData = { 
        name: musicName, 
        url, 
        favorite: false,
        date: dataAtual,
        autor: autor,
        playlist: playlist
      };

      const docRef = await addDoc(collection(db, dbName), audioData);
      uploadedAudios.push({ ...audioData, id: docRef.id });
    }
    enviando(uploadedAudios);
    setMusicName('')
    setAutor('')
    setPlaylist('')
  };

  return (
    <Upload>
      <input 
        type="file" 
        accept="audio/*" 
        multiple 
        onChange={(e) => setAudios([...e.target.files])} 
        required
      />
      <input 
        type="text" 
        placeholder="Nome da musica" 
        value={musicName} 
        onChange={(e) => setMusicName(e.target.value)}
        required
      />
      <input 
        type="text" 
        placeholder="Nome do autor" 
        value={autor} 
        onChange={(e) => setAutor(e.target.value)} 
        required
      />
      <input 
        type="text" 
        placeholder="Playlist" 
        value={playlist} 
        onChange={(e) => setPlaylist(e.target.value)} 
        required
      />
      <button onClick={handleUpload}>
        <GoUpload />
      </button>
    </Upload>
  );
};

export default UploadMusic;
