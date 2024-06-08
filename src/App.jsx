import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import {db} from './firebase/firebase';
import AudioComp from "./Components/AudioComp";

function App() {
  const [audios, setAudios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [play, setPlay] = useState(null);

  useEffect(() => {
    const ReceberAudios = async () => {
      const Resultado = await getDocs(collection(db, 'audios'));
      const AudioList = Resultado.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setAudios(AudioList);
      setFavoritos(AudioList.filter(audio => audio.favorite))
    };
    ReceberAudios();
  },[])

  return (
    <div className="App">
      <div>
        <h1>Lista de audios:</h1>
        <AudioComp audio={audios} onClick={item => setPlay(item)} />
      </div>
      <div>
        <h1>Favoritos:</h1>
        <AudioComp audio={favoritos} onClick={item => setPlay(item)} />
      </div>
      {play && <audio controls src={play.url} autoPlay />}
    </div>
  )
}

export default App
