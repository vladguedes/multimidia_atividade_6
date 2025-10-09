import Image from 'next/image';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faBackwardStep, faForwardStep, faPlay, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

 export default function AudioPlayer() {
   return (
     <div className="audioPlayer">
       <Image
         src="/album-art.jpg"
         alt=""
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
           <span>0:00</span>
         </div>
       </div>
       
       <div className="controls">
         <FontAwesomeIcon icon={faBackwardStep} />
         <div className="playBtn">
           <FontAwesomeIcon icon={faPlay} />
         </div>
         <FontAwesomeIcon icon={faForwardStep} />
         <FontAwesomeIcon icon={faVolumeHigh} />
       </div>
     </div>
   );
 }