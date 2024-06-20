import { collection, deleteDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from '../../firebase/firebase';
import MusicItem from "../../Components/MusicItem";
import UploadMusic from "../../Components/UploadMusic";
import { deleteObject, ref } from "firebase/storage";
import PlayerMusic from "../../Components/PlayerMusic";

export default function Inicio() {
  const [carregado, setCarregado] = useState(false);
  const [audios, setAudios] = useState([]);
  const [play, setPlay] = useState([]);

  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleSelectAuthor = (author) => {
    setSelectedAuthor(author);
  };

  const dbName = 'audios';

  useEffect(() => {
    const ReceberAudios = async () => {
      const Resultado = await getDocs(collection(db, dbName));
      const AudioList = Resultado.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAudios(AudioList);
    };
    ReceberAudios();
    setCarregado(true)
  }, [carregado]);

  const EnviarAudio = (NovoItem) => {
    setAudios(Item => [...Item, ...NovoItem]);
    setCarregado(false) 
  };

  const Favoritar = async (item) => {
    const audioDocRef = doc(db, dbName, item);
    const { favorite } = (await getDoc(audioDocRef)).data();
    await updateDoc(audioDocRef, { favorite: !favorite });
    setCarregado(false); 
  };

  const ExcluirAudio = async (id, fileName) => {
    // Exclui o documento do Firestore
    await deleteDoc(doc(db, dbName, id));

    // Exclui o arquivo do Storage
    const audioRef = ref(storage, `${dbName}/${fileName}`);
    await deleteObject(audioRef);
    setCarregado(false)

    // Atualiza os estados dos áudios
    setAudios(audios => audios.filter(audio => audio.id !== id));
    if (play && play.id === id) {
      setPlay([]);
    }
  };

  return (
    <div className="App">
      <UploadMusic enviando={EnviarAudio} dbName={dbName}/>
      <div>
        <h1>Lista de audios:</h1>
        <MusicItem 
          audio={audios} 
          onPlay={item => setPlay(item)} 
          onDelete={ExcluirAudio} 
          onFavorite={item => Favoritar(item)}
        />
      </div>
      <PlayerMusic musica={play} />
    </div>
  );
}
