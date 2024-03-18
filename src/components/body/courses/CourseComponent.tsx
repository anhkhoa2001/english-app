import { CourseItemDTO } from '../../../entity/props/CourseItemDTO';
import './detail/css/CourseComponent.scss';
import CourseItemComponent from './CourseItemComponent';
import { Checkbox, Collapse, Modal, Pagination, Radio, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { CheckboxProps, CollapseProps } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import TitleComponent from '../TitleComponent';
import CourseService, { CourseListResponse } from '../../../service/CourseService';
import { useToken } from '../../../context/TokenProvider';
import { MessageResponse } from '../../../entity/response/MessageResponse';

const JOIN_COURSE = "JOIN_COURSE";
const CHECK_LOGIN = "CHECK_LOGIN";

const modal = new Map();
modal.set(JOIN_COURSE, false);
modal.set(CHECK_LOGIN, false);

const CourseComponent: React.FC = () => {

    // let data: CourseItemDTO[] = [
    //     {
    //         title: "Introduction to Programming",
    //         rating: 4.5,
    //         summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
    //         code: "CS101",
    //         instructor: "John Doe",
    //         total_hours: 20,
    //         lectures: 10,
    //         level: "Beginner",
    //         image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
    //     },
    //     {
    //         title: "Introduction to Programming",
    //         rating: 4.5,
    //         summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
    //         code: "CS102",
    //         instructor: "John Doe",
    //         total_hours: 20,
    //         lectures: 10,
    //         level: "Beginner",
    //         image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
    //     },
    //     {
    //         title: "Introduction to Programming",
    //         rating: 4.5,
    //         summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
    //         code: "CS103",
    //         instructor: "John Doe",
    //         total_hours: 20,
    //         lectures: 10,
    //         level: "Beginner",
    //         image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
    //     },
    //     {
    //         title: "Introduction to Programming",
    //         rating: 4.5,
    //         summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
    //         code: "CS104",
    //         instructor: "John Doe",
    //         total_hours: 20,
    //         lectures: 10,
    //         level: "Beginner",
    //         image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
    //     },
    //     {
    //         title: "Introduction to Programming",
    //         rating: 4.5,
    //         summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
    //         code: "CS105",
    //         instructor: "John Doe",
    //         total_hours: 20,
    //         lectures: 10,
    //         level: "Beginner",
    //         image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
    //     }
    // ];
    const obj = useToken();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<CourseListResponse>();
    const [onModal, setOnModal] = useState(modal);
    const courseCode = useRef<string>("");
    const [levels, setLevels] = useState<string[]>([]);
    const [rate, setRate] = useState<number>(5);

    const pagination = useRef<{
        page: number,
        pageSize: number,
        isPublic: boolean,
        levels?: string[],
        rate?: number
    }>({
        page: 1,
        pageSize: 10,
        isPublic: true
    });

    const loadCourse: (data: MessageResponse<CourseListResponse> | null) => void = (data) => {
        try {
            setCourses(data?.data);
            console.log('data', courses);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        CourseService.getAllCoursePublic(pagination.current, loadCourse);
    }, []);

    const onChangeVideo: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeLevel = (e: any, key:string) => {
        console.log(`checked = ${e.target.checked} === ${key}`);
        var levelsCpy = levels;

        if(e.target.checked) {
            levelsCpy = [...levels, key];
        } else {
            var index = levelsCpy.indexOf(key);
            if (index !== -1) {
                levelsCpy.splice(index, 1);
            }
        }
        setLevels(levelsCpy);

        console.log('levels', levelsCpy);
        pagination.current.levels = levelsCpy;
        CourseService.getAllCoursePublic(pagination.current, loadCourse);
    };


    // const video_durations = [
    //     <>
    //         <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>0 - 1 Hours</Checkbox>
    //         <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>2 - 4 Hours</Checkbox>
    //         <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>5 - 8 Hours</Checkbox>
    //     </>
    // ];

    const levelElements = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeLevel(e, 'Beginner')}>Beginner</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeLevel(e, 'Intermediate')}>Intermediate</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeLevel(e, 'Expert')}>Expert</Checkbox>
        </>
    ];

    const onChangeRate = (e: any) => {
        // setValue(e.target.value);
        setRate(e.target.value);
        pagination.current.rate = e.target.value;
        CourseService.getAllCoursePublic(pagination.current, loadCourse);
    };

    const rating = [
        <>
            {/* <>
                <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeRate(e, 5)}>
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                </Checkbox>
                <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeRate(e, 4)}>
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                </Checkbox>
                <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeRate(e, 3)}>
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                </Checkbox>
            </> */}
            <Radio.Group onChange={onChangeRate} value={rate}>
                <Space direction="vertical">
                    <Radio value={5}>
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                    </Radio>
                    <Radio value={4}>
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                    </Radio>
                    <Radio value={3}>
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: '#d1d10a' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                    </Radio>
                </Space>
            </Radio.Group>
        </>
    ];

    const items: CollapseProps['items'] = [
        // {
        //     key: '1',
        //     label: 'Video Durations',
        //     children: video_durations,
        // },
        {
            key: '2',
            label: 'Level',
            children: levelElements,
        },
        {
            key: '3',
            label: 'Rating',
            children: rating,
        }
    ];

    const openNoti = (code?: string) => {
        courseCode.current = code || "";
        if(!obj?.isLogined) {
            onModal.set(CHECK_LOGIN, true);
            const newMap = new Map(onModal);
            setOnModal(newMap);
        } else {
            onModal.set(JOIN_COURSE, true);
            const newMap = new Map(onModal);
            setOnModal(newMap);
        }
    }

    const closeModal = (key: string) => {
        if(key === JOIN_COURSE) {
            const joinCourse: (data: MessageResponse<string> | null) => void = (data) => {
                try {
                    console.log('data', data);
                    //window.location.href = `/learning/course/${courseCode.current}?title=${courseCode.current}`;
                    navigate(`/learning/course/${courseCode.current}?title=${courseCode.current}`);
                } catch (error) {
                    console.log('error', error);
                }
            }
    
            CourseService.joinToCourse(courseCode.current, joinCourse);
        } else if(key === CHECK_LOGIN) {
            navigate(`/login`);
        }
        onModal.set(key, false);
        const newMap = new Map(onModal);
        setOnModal(newMap);
    }

    const handleCancel = (key: string) => {
        onModal.set(key, false);
        const newMap = new Map(onModal);
        setOnModal(newMap);
    }

    return <div className="udemy ">
        <TitleComponent type="All Courses" count_results={courses?.totalRecord || 0} display={true} />
        <div className="course">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']} />
            </div>
            <div className="right">
                {Array.from({ length: courses?.data.length || 0}, (_, i) =>
                (
                    // <Link to={`/learning/course/${courses?.data[i].code}?title=${courses?.data[i].code}`} key={i} >
                    //     <CourseItemComponent data={courses?.data[i]}/>
                    // </Link>
                    <div onClick={() => openNoti(courses?.data[i].code)}>
                        <CourseItemComponent data={courses?.data[i]}/>
                    </div>
                ))}
                <div className='paging'>
                    <Pagination
                        onChange={() => { console.log('123') }}
                        total={courses?.totalRecord}
                        pageSize={pagination.current.pageSize}
                    />
                </div>
            </div>
        </div>
        <Modal title="Do you want to join this course?" 
            open={onModal.get(JOIN_COURSE)}
            onOk={() => closeModal(JOIN_COURSE)}
            onCancel={() => handleCancel(JOIN_COURSE)}>
            <p>Hmmmmm.....................................</p>
        </Modal>
        <Modal title="Please log in to join the course?" 
            open={onModal.get(CHECK_LOGIN)}
            onOk={() => closeModal(CHECK_LOGIN)}
            onCancel={() => handleCancel(CHECK_LOGIN)}>
            <p>Hmmmmm.....................................</p>
        </Modal>
    </div>
}


export default CourseComponent;