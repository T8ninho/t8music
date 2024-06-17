import { useState, useRef, useEffect } from "react";
import './style/Player.css';

import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { IoPlaySkipBackSharp, IoPlaySkipForward, IoShuffle, IoReloadOutline } from "react-icons/io5";

export default function PlayerMusic({musica}) {
	const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio(musica.url));

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [isPlaying, musica]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="container-player">
    	<div className="subContainer-player">
			<div className="tocando-agora playercb">
				<p>{musica.name}</p>
			</div>
			<div className="player playercb">
				<div className="controles-musica">
					<button className="desativado">
						<IoShuffle />
					</button>
					<button className="desativado">
						<IoPlaySkipBackSharp />
					</button>
					<button className="controle-play" onClick={togglePlayPause}>
					{isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
					</button>
					<button className="desativado">
						<IoPlaySkipForward />
					</button>
					<button className="desativado">
						<IoReloadOutline />
					</button>
				</div>
				<div className="progress-bar">
					<span>{formatTime(currentTime)}</span>
					<input
					type="range"
					min="0"
					max={duration}
					value={currentTime}
					onChange={(e) => handleProgressChange(Number(e.target.value))}
					/>
					<span>{formatTime(duration)}</span>
				</div>
			</div>
			<div className="playercb">
				
			</div>
			<audio ref={audioRef} src={musica.url} />
		</div>
    </div>
  );
};