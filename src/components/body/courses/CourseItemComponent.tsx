import { LuDot } from "react-icons/lu";
import './detail/css/CourseItemComponent.scss'
import { CourseDTO } from "../../../service/CourseService";


const CourseItemComponent: React.FC<{data?: CourseDTO}> = ({data}) => {
    console.log('data item', data);
    return <div className="course-item" >
        <img src={data?.thumbnail} className="thumnail"/> 
        <div className="detail">
            <h2 className="title">
                {data?.courseName}
            </h2>
            <p className="summary">{data?.summary}</p>
            <span className="instructor">{data?.createBy}</span>
            <div className="rating-star">
                <i data-star={Number(data?.rate) || 1} />
            </div>
            <div className="additional">
                <p>{data?.totalStudent} students</p>
                <LuDot />
                <p>{data?.lectures} lectures</p>
                <LuDot />
                <p>{data?.level}</p>
            </div>
        </div>
    </div>
}


export default CourseItemComponent;