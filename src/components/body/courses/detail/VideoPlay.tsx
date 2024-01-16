import './css/VideoPlay.scss'
import { Player } from 'video-react';

const VideoPlay: React.FC = () => {
    return <div className="video-play">
        <Player
            playsInline
            poster="https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
            src="https://www.youtube.com/watch?v=_Xs1ZCMfa2Y"
            />

    </div>
}


export default VideoPlay;