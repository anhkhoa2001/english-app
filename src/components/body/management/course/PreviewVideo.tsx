import { Image } from "antd";
import { useRef } from "react";

const PreViewVideo: React.FC<{url_video: string, url_image: string}> = ({url_video, url_image}) => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    return <>
        <Image
            width={200}
            preview={{
                imageRender: () => (
                    <video
                        width="80%"
                        controls
                        src={url_video}
                        autoPlay={true}
                        ref={videoRef}
                    />
                ),
                toolbarRender: () => null,
            }}
            src={url_image}
            onPreviewClose={(element) => {
                const videoElement = videoRef.current;
                console.log(videoElement);
                if (videoElement) {
                    if(!element) {
                        console.log('Pausing and resetting video');
                        videoElement.pause();
                        videoElement.currentTime = 0;
                    } else {
                        videoElement.play();
                    }
                    
                } else {
                    console.log('Video element not found');
                }
            }}
        />

    </>
}


export default PreViewVideo;