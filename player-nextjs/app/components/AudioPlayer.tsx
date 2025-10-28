'use client'; 


import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Rewind, FastForward } from 'lucide-react';


type Track = {
  title: string;
  artist: string;
  src: string;
  cover: string; 
};

const tracklist: Track[] = [
  {
    title: "Here Comes The Sun",
    artist: "The Beatles",
    src: "/audio/minha-musica.mp3",
    cover: "/album-art.jpg" 
  },
  {
    title: "Human",
    artist: "Rag'n'Bone Man",
    src: "/audio/human.mp3",
    cover: "/human.jpg" 
  },
  {
    title: "Apesar de Você",
    artist: "Chico Buarque",
    src: "/audio/apesarDeVoce.mp3",
    cover: "/apesar.jpg"
  }
];

export default function AudioPlayer() {

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); 
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0);      

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracklist[currentTrackIndex];

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextTrack = () => {

    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracklist.length);
  };

  const handlePrevTrack = () => {

    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracklist.length) % tracklist.length);
  };
  
  const handleTrackClick = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true); 
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const togglePlay = () => setIsPlaying(prev => !prev);
  const toggleMute = () => setIsMuted(prev => !prev);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => setVolume(parseFloat(e.target.value));

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Erro ao dar play:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]); 

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);


  return (
    <div className="playerContainer"> {}
      
      {}
      <div className="audioPlayer">
        
        {}
        <audio 
          ref={audioRef} 
          src={currentTrack.src} 
          preload="auto"
          
          
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          
          
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          
          
          onEnded={handleNextTrack} 
        />

        <Image
          src={currentTrack.cover} 
          alt={currentTrack.title}
          width={350}
          height={350}
          className="albumArt"
        />
        
        <div className="trackInfo">
          <h2>{currentTrack.title}</h2>
          <p>{currentTrack.artist}</p>
        </div>

        {}
        <div className="progressContainer">
          <input 
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="seekSlider" 
          />
          <div className="timestamps">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {}
        <div className="controls skipControls">
            <button onClick={() => handleSkip(-10)} className="iconBtn"><Rewind size={22} /></button>
            <button onClick={handlePrevTrack} className="iconBtn"><SkipBack size={28} /></button>
            
            <div className="playBtn" onClick={togglePlay}>
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </div>
            
            <button onClick={handleNextTrack} className="iconBtn"><SkipForward size={28} /></button>
            <button onClick={() => handleSkip(10)} className="iconBtn"><FastForward size={22} /></button>
        </div>


        {}
        <div className="volumeControl">
          <button onClick={toggleMute} className="iconBtn">
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volumeSlider"
          />
          <p>Volume: {Math.round(isMuted ? 0 : volume * 100)}%</p>
        </div>
      </div>

      {}
      <div className="tracklist">
        <h3>Próximas Músicas</h3>
        <ul>
          {tracklist.map((track, index) => (
            <li 
              key={track.src} 
              onClick={() => handleTrackClick(index)}

              className={index === currentTrackIndex ? 'active' : ''}
            >
              <span className="trackTitle">{track.title}</span>
              <span className="trackArtist">{track.artist}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}