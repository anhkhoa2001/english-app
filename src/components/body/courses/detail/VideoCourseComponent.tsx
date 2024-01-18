import { useParams } from "react-router-dom";
import LessonList from "./LessonList";
import VideoNav from "./VideoNav";
import './css/VideoCourseComponent.scss'
import { ignore } from "antd/es/theme/useToken";


const VideoCourseComponent: React.FC = () => {
    const {code, name} = useParams();

    console.log(code);

    return <div className="video-course">
        <VideoNav title={name || ""}/>
        <div className="content">
            <LessonList />
        </div>
    </div>
}


export default VideoCourseComponent;