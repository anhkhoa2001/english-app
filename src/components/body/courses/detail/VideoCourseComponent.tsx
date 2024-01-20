import { useParams, useSearchParams } from "react-router-dom";
import LessonList from "./LessonList";
import './css/VideoCourseComponent.scss'
import CommonNav from "./CommonNav";


const VideoCourseComponent: React.FC = () => {
    const {code} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(code);

    return <div className="video-course">
        <CommonNav title={searchParams.get('title') || ''} url_back="/courses"/>
        <div className="content">
            <LessonList />
        </div>
    </div>
}


export default VideoCourseComponent;