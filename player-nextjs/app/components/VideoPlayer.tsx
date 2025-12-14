// app/components/VideoPlayer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, 
  SkipBack, SkipForward, Rewind, FastForward, 
  Maximize 
} from 'lucide-react';
import Image from 'next/image';

// 1. Definição do Tipo de Vídeo
type VideoItem = {
  title: string;
  description: string;
  src: string;
  thumbnail: string;
};

// 2. Lista de Vídeos (Mínimo de 3 conforme solicitado)
const videoList: VideoItem[] = [
  {
    title: "PRIMEIRO VIDEO DE GATO",
    description: "GATO MIANDO",
    src: "/videos/video1.mp4", // Certifique-se que o arquivo existe!
    thumbnail: "/thumb1.jpg"   // Pode usar qualquer imagem da pasta public
  },
  {
    title: "SEGUNDO VIDEO DE GATO",
    description: "DOIS GATOS",
    src: "/videos/video2.mp4",
    thumbnail: "/thumb2.jpg"
  },
  {
    title: "TERCEIRO VIDEO DE GATO",
    description: "GATO NO ESCURO",
    src: "/videos/video3.mp4",
    thumbnail: "/thumb3.jpg"
  }
];

export default function VideoPlayer() {
  // --- Estados ---
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Vídeo atual
  const currentVideo = videoList[currentVideoIndex];

  // --- Funções de Navegação e Controle ---

  // Tocar um vídeo específico da lista
  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true); // Requisito: Reproduzir ao clicar
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoList.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
  };

  // Requisito: Avançar/Retroceder 10 segundos
  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  // Controle do Slider de Tempo (Seek)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // --- Efeitos (UseEffects) ---

  // 1. Sincronizar Play/Pause e Troca de Vídeo
  useEffect(() => {
    if (videoRef.current) {
      // Carrega o novo vídeo quando o índice muda
      videoRef.current.load(); 
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log("Aguardando interação", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideoIndex]);

  // 2. Volume e Mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <div className="mainContainer">
      {/* --- ÁREA DO PLAYER (Esquerda ou Topo) --- */}
      <div className="playerSection">
        <div className="videoWrapper">
          <video
            ref={videoRef}
            className="videoScreen"
            // Importante: NÃO usar controls padrão. Usar eventos.
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            onEnded={handleNext} // Requisito: Autoplay próximo vídeo
            onClick={togglePlay}
          >
            <source src={currentVideo.src} type="video/mp4" />
          </video>
          
          {/* Overlay de Play (opcional) */}
          {!isPlaying && (
            <div className="playOverlay" onClick={togglePlay}>
              <Play size={60} fill="white" />
            </div>
          )}
        </div>

        {/* --- BARRA DE CONTROLES PERSONALIZADA --- */}
        <div className="controlsBar">
          {/* Barra de Progresso Superior */}
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleSeek}
            className="progressBar"
          />

          <div className="buttonsRow">
            <div className="leftControls">
              <button onClick={handlePrev} title="Anterior"><SkipBack size={20}/></button>
              <button onClick={() => skipTime(-10)} title="-10s"><Rewind size={20}/></button>
              
              <button onClick={togglePlay} className="playPauseBtn">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button onClick={() => skipTime(10)} title="+10s"><FastForward size={20}/></button>
              <button onClick={handleNext} title="Próximo"><SkipForward size={20}/></button>

              <div className="timeDisplay">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="rightControls">
              <button onClick={toggleMute}>
                {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
              </button>
              <input 
                type="range" min="0" max="1" step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="volumeSlider"
              />
            </div>
          </div>
        </div>

        <div className="videoInfo">
          <h2>{currentVideo.title}</h2>
          <p>{currentVideo.description}</p>
        </div>
      </div>

      {/* --- LISTA DE VÍDEOS (Playlist) --- */}
      <div className="playlistSection">
        <h3>Próximos Vídeos</h3>
        <div className="playlist">
          {videoList.map((video, index) => (
            <div 
              key={index} 
              className={`playlistItem ${index === currentVideoIndex ? 'active' : ''}`}
              onClick={() => handleVideoSelect(index)}
            >
              {/* Se não tiver imagem real, usa um div colorido */}
              <div className="thumbPlaceholder">
                 <Play size={15} />
              </div>
              <div className="itemInfo">
                <h4>{video.title}</h4>
                <span>{video.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}