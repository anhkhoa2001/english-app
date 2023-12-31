import { CourseItemDTO } from '../../../dto/props/CourseItemDTO';
import ToggleSearch from '../../event/drop/ToggleSearch';
import './CourseComponent.scss';
import { IoIosStar } from "react-icons/io";
import CourseItemComponent from './CourseItemComponent';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

const CourseComponent: React.FC = () => {

    let data: CourseItemDTO[] = [
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS101",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS102",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS103",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS104",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS105",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        }
    ];

    return <div className="course">
        <div className="left">
            <ToggleSearch
                type_select='checkbox'
                title_header='Video Durations'
                select_contents={['0 - 1 Hours', '2 - 4 Hours', '5 - 8 Hours']}
                include_icon={false}
                count_icon={[]}
                type_icon={<IoIosStar />}
            />

            <ToggleSearch
                type_select='radio'
                title_header='Ratings'
                select_contents={['5.0', '4.0', '3.0']}
                include_icon={true}
                count_icon={[5, 4, 3]}
                type_icon={<IoIosStar />}
            />

            <ToggleSearch
                type_select='checkbox'
                title_header='Level'
                select_contents={['All Level', 'Beginner', 'Intermediate', 'Expert']}
                include_icon={false}
                count_icon={[]}
                type_icon={<IoIosStar />}
            />
        </div>
        <div className="right">
            {Array.from({ length: data.length }, (_, i) => 
            (<Link to={`course/lesson/${data[i].code}`}>
                <CourseItemComponent data={data[i]} key={data[i].code}/>
            </Link>))}


            <div className='paging'>
                <Pagination 
                    onChange={() => {console.log('123')}} 
                    total={data.length} 
                    pageSize={2}
                />
                </div>
        </div>
    </div>
}


export default CourseComponent;