import React, { useState } from 'react';
import { storage, db } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const UploadAudio = ({ onUpload }) => {
  const [audios, setAudios] = useState([]);

  const handleUpload = async () => {
    const uploadedAudios = [];
    for (const audio of audios) {
      const audioRef = ref(storage, `audios/${audio.name}`);
      await uploadBytes(audioRef, audio);
      const url = await getDownloadURL(audioRef);
      const audioData = { name: audio.name, url, favorite: false };
      const docRef = await addDoc(collection(db, 'audios'), audioData);
      uploadedAudios.push({ ...audioData, id: docRef.id });
    }
    onUpload(uploadedAudios);
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
