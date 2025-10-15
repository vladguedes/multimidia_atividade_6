// app/components/AudioPlayer.tsx

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';


import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {

  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [volume, setVolume] = useState<number | null>(null);


  useEffect(() => {
    setIsPlaying(false); 
    setVolume(0.5);      
  }, []);


  const togglePlay = () => {

    setIsPlaying(prev => !prev);
  };
  

  if (isPlaying === null || volume === null) {
    return null; 
  }

  return (
    <div className="audioPlayer">
      <Image
        src="/album-art.jpg"
        alt="Capa do álbum"
        width={350}
        height={350}
        className="albumArt"
      />
      
      <div className="trackInfo">
        <h2>Here Comes The Sun</h2>
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
        {}
        <VolumeX size={22} />
        
        {}
        <div className="playBtn" onClick={togglePlay}>
          {isPlaying ? <Pause size={8} /> : <Play size={28} />}
        </div>

        {}
        <Volume2 size={22} />
      </div>

      {}
      <div className="volumeControl">
        <p>Volume: {Math.round(volume * 100)}%</p>
        <input 
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volumeSlider"
        />
      </div>
    </div>
  );
}
