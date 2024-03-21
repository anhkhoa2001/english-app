import { useParams, useSearchParams } from "react-router-dom";
import LessonList from "./LessonList";
import './css/VideoCourseComponent.scss'
import CommonNav from "./CommonNav";
import { CourseItemDTO } from "../../../../entity/props/CourseItemDTO";
import { useEffect, useState } from "react";
import CourseService from "../../../../service/CourseService";
import { MessageResponse } from "../../../../entity/response/MessageResponse";

const VideoCourseComponent: React.FC = () => {
    const {code} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [item, setItem] = useState<CourseItemDTO>(new CourseItemDTO());

    console.log(code);
    const loadCourse: (data: MessageResponse<CourseItemDTO> | null) => void = (data) => {
        try {
            setItem(data?.data || new CourseItemDTO());
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        CourseService.getByCode(code || "", loadCourse);
    }, [code]);


    return <div className="video-course">
        <CommonNav title={item?.courseName || ''} url_back="/courses"/>
        <div className="content">
            <LessonList course={item}/>
        </div>
    </div>
}


export default VideoCourseComponent;