import React from 'react';
import MusicPlayer from './MusicPlayer';

const AudioList = ({ audios, onToggleFavorite }) => {
  return (
    <div style={{paddingRight: 30}}>
      <h2>Áudios</h2>
      {audios.map(audio => (
        <div key={audio.id}>
          <MusicPlayer audio={audio} onClick={() => onToggleFavorite(audio)}/>
        </div>
      ))}
    </div>
  );
};

export default AudioList;
