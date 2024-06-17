import { collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from './firebase/firebase';
import MusicItem from "./Components/MusicItem";
import UploadMusic from "./Components/UploadMusic";
import { deleteObject, ref } from "firebase/storage";
import PlayerMusic from "./Components/PlayerMusic";

export default function App() {
  const [carregado, setCarregado] = useState(false);
  const [audios, setAudios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [play, setPlay] = useState([]);

  const dbName = 'audios';

  useEffect(() => {
    const ReceberAudios = async () => {
      const Resultado = await getDocs(collection(db, dbName));
      const AudioList = Resultado.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAudios(AudioList.filter(audio => !audio.favorite));
      setFavoritos(AudioList.filter(audio => audio.favorite));
    };
    ReceberAudios();
    setCarregado(true)
  }, [carregado]);

  const EnviarAudio = (NovoItem) => {
    setAudios(Item => [...Item, ...NovoItem]);
  };

  const Favoritar = async (id, isFavorite) => {
    // Atualiza o estado de favorite no Firestore
    const audioDoc = doc(db, dbName, id);
    await updateDoc(audioDoc, {
      favorite: !isFavorite
    });

    // Atualiza os estados locais dos áudios
    if (isFavorite) {
      // Se o áudio era favorito e agora não é mais
      setFavoritos(favoritos => favoritos.filter(audio => audio.id !== id));
      const audio = favoritos.find(audio => audio.id === id);
      setAudios(audios => [...audios, { ...audio, favorite: !isFavorite }]);
    } else {
      // Se o áudio não era favorito e agora é
      setAudios(audios => audios.filter(audio => audio.id !== id));
      const audio = audios.find(audio => audio.id === id);
      setFavoritos(favoritos => [...favoritos, { ...audio, favorite: !isFavorite }]);
    }
  };

  const ExcluirAudio = async (id, fileName) => {
    // Exclui o documento do Firestore
    await deleteDoc(doc(db, dbName, id));

    // Exclui o arquivo do Storage
    const audioRef = ref(storage, `${dbName}/${fileName}`);
    await deleteObject(audioRef);

    // Atualiza os estados dos áudios
    setAudios(audios => audios.filter(audio => audio.id !== id));
    setFavoritos(favoritos => favoritos.filter(audio => audio.id !== id));
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
          onFavorite={id => Favoritar(id, false)} // Passa false porque são os não favoritos
        />
      </div>
      <div>
        <h1>Favoritos:</h1>
        <MusicItem 
          audio={favoritos} 
          onPlay={item => setPlay(item)} 
          onDelete={ExcluirAudio}  
          onFavorite={id => Favoritar(id, true)} // Passa true porque são os favoritos
        />
      </div>
      <PlayerMusic musica={play} />
      {/* {play && <audio controls src={play.url} autoPlay />} */}
    </div>
  );
}
