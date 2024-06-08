import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #282828;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  color: white;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    color: #1db954;
  }
`;

const ProgressBar = styled.input`
  margin: 10px 0;
`;

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MusicPlayer = ({ audio, onClick }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeekChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    playerRef.current.seekTo(newProgress / 100);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <PlayerWrapper>
      <Controls>
        <ControlButton onClick={togglePlayPause}>
          {playing ? <FaPause /> : <FaPlay />}
        </ControlButton>
        <ProgressBar
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeekChange}
        />
      </Controls>
      <Time>
        <span>{formatTime(progress * duration / 100)}</span>
        <span>{formatTime(duration - (progress * duration / 100))}</span>
      </Time>
	  <button onClick={onClick} className='liked'>
		{audio.favorite ? <FaHeart /> : <FaRegHeart />}
	  </button>
      <ReactPlayer
        ref={playerRef}
        url={audio.url}
        playing={playing}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="0"
        height="0"
      />
    </PlayerWrapper>
  );
};

export default MusicPlayer;
