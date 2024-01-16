import LessonList from "./LessonList";
import VideoNav from "./VideoNav";
import VideoPlay from "./VideoPlay";
import './css/VideoCourseComponent.scss'


const VideoCourseComponent: React.FC = () => {
    const queryParameters = new URLSearchParams(window.location.search);

    const name = queryParameters.get('name') || "";

    return <div className="video-course">
        <VideoNav title={name}/>
        <div className="content">
            <VideoPlay />
            <LessonList />
        </div>

    </div>
}


export default VideoCourseComponent;