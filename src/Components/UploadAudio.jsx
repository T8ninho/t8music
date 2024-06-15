import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebase/firebase';

const UploadAudio = ({ enviando, dbName }) => {
  const [audios, setAudios] = useState([]);

  const handleUpload = async () => {
    const uploadedAudios = [];
    for (const audio of audios) {
      const audioRef = ref(storage, `${dbName}/${audio.name}`);
      await uploadBytes(audioRef, audio);
      const url = await getDownloadURL(audioRef);

      const dataAtual = new Date(); // Pega  a data e hora atual

      const audioData = { 
        name: audio.name, 
        url, 
        favorite: false,
        date: dataAtual
      };

      const docRef = await addDoc(collection(db, dbName), audioData);
      uploadedAudios.push({ ...audioData, id: docRef.id });
    }
    enviando(uploadedAudios);
  };

  return (
    <div>
      <input 
        type="file" 
        accept="audio/*" 
        multiple 
        onChange={(e) => setAudios([...e.target.files])} 
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadAudio;
