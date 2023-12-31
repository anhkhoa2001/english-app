import { LuDot } from "react-icons/lu";
import { CourseItemDTO } from "../../../dto/props/CourseItemDTO";
import './CourseItemComponent.scss'


const CourseItemComponent: React.FC<{data: CourseItemDTO}> = ({data}) => {

    return <div className="course-item">
        <img src={data.image} className="thumnail"/> 
        <div className="detail">
            <h2 className="title">
                {data.title}
            </h2>
            <p className="summary">{data.summary}</p>
            <span className="instructor">{data.instructor}</span>
            <div className="rating-star">
                <i data-star={data.rating} />
            </div>
            <div className="additional">
                <p>{data.total_hours} total hours</p>
                <LuDot />
                <p>{data.lectures} lectures</p>
                <LuDot />
                <p>{data.level}</p>
            </div>
        </div>
    </div>
}


export default CourseItemComponent;