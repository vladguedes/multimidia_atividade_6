'use client'; 


import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);     
  const [isMuted, setIsMuted] = useState(false);    


  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]); 


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; 
    }
  }, [volume]); 


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted; 
    }
  }, [isMuted]); 


  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="audioPlayer">
      
      {}
      <audio 
        ref={audioRef} 
        src="/audio/minha-musica.mp3" 
        preload="auto"
      />

      <Image
        src="/album-art.jpg"
        alt="Capa do álbum"
        width={350}
        height={350}
        className="albumArt"
      />
      
      <div className="trackInfo">
        <h2>Here Come The Sun</h2>
        <p>Beatles</p>
      </div>

      <div className="progressContainer">
        <div className="progressBar"></div>
        <div className="timestamps">
          <span>0:00</span>
          <span>4:55</span>
        </div>
      </div>
      
      {}
      <div className="controls">
        <div className="playBtn" onClick={togglePlay}>
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </div>
      </div>

      {}
      <div className="volumeControl">
        
        {}
        <button onClick={toggleMute} className="iconBtn">
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>

        {}
        <input 
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volumeSlider"
        />
        <p>Volume: {Math.round(volume * 100)}%</p>
      </div>
    </div>
  );
}