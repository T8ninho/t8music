import { collection, deleteDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from './firebase/firebase';
import MusicItem from "./Components/MusicItem";
import UploadMusic from "./Components/UploadMusic";
import { deleteObject, ref } from "firebase/storage";
import PlayerMusic from "./Components/PlayerMusic";
import Inicio from "./pages/Inicio";

export default function App() {

  return (
    <div className="App">
      <Inicio />
    </div>
  );
}
