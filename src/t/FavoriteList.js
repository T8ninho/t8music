import React from 'react';
import MusicPlayer from './MusicPlayer';

const FavoriteList = ({ favorites, onToggleFavorite }) => {
  return (
    <div>
      <h2>Favoritos</h2>
      {favorites.map(audio => (
        <div key={audio.id}>
          <MusicPlayer audio={audio} onClick={() => onToggleFavorite(audio)}/>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
