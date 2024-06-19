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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if(musicName === '' || autor === '' || playlist === '') {
      setError('Todos os campos devem ser preenchidos!');
      return;
    }
    if (audios.length === 0) {
      setError('Selecione pelo menos um arquivo de áudio!');
      return;
    }

    setLoading(true);
    setError('');
    const uploadedAudios = [];

    try {
      for (const audio of audios) {
        const audioRef = ref(storage, `${dbName}/${musicName}`);
        await uploadBytes(audioRef, audio);
        const url = await getDownloadURL(audioRef);

        const dataAtual = new Date();

        const audioData = { 
          name: musicName, 
          url, 
          favorite: false,
          date: dataAtual,
          autor: autor,
          playlist: playlist
        };

        // Adiciona o documento na coleção do Firestore
        const docRef = await addDoc(collection(db, dbName), audioData);
        uploadedAudios.push({ ...audioData, id: docRef.id });
      }
      enviando(uploadedAudios);
      setMusicName('');
      setAutor('');
      setPlaylist('');
      setAudios([]);
    } catch (e) {
      setError('Ocorreu um erro ao fazer upload dos arquivos. Tente novamente.');
      console.error("Error uploading audio: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload>
      {error && <p style={{color: 'red'}}>{error}</p>}
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
      <button onClick={handleUpload} disabled={loading}>
        <GoUpload />
        {loading ? ' Enviando...' : ' Enviar'}
      </button>
    </Upload>
  );
};

export default UploadMusic;
