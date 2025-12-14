import VideoPlayer from './components/VideoPlayer';
import './VideoPlayer.css'; // Importe o CSS se não estiver usando modules

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
      
      {/* Chama o componente de Vídeo */}
      <VideoPlayer />

    </main>
  );
}