import { CourseItemDTO } from '../../../entity/props/CourseItemDTO';
import './detail/css/CourseComponent.scss';
import CourseItemComponent from './CourseItemComponent';
import { Checkbox, Collapse, Modal, Pagination, Radio, Space } from 'antd';
import { Link } from 'react-router-dom';
import type { CheckboxProps, CollapseProps } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import TitleComponent from '../TitleComponent';
import CourseService, { CourseListResponse } from '../../../service/CourseService';
import MessageResponse from '../../../entity/response/MessageResponse';



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

    const [courses, setCourses] = useState<CourseListResponse>();
    const [join, setJoin] = useState<boolean>(false);
    const courseCode = useRef<string>("");

    const pagination = useRef({
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

    const onChangeLevel: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };


    // const video_durations = [
    //     <>
    //         <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>0 - 1 Hours</Checkbox>
    //         <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>2 - 4 Hours</Checkbox>
    //         <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>5 - 8 Hours</Checkbox>
    //     </>
    // ];

    const levels = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>All Level</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>Beginner</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>Intermediate</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>Expert</Checkbox>
        </>
    ];

    const [value, setValue] = useState(5);

    const onChangeRate = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    const rating = [
        <>
            <Radio.Group onChange={onChangeRate} value={value}>
                <Space direction="vertical">
                    <Radio value={5}>
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                    </Radio>
                    <Radio value={4}>
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                    </Radio>
                    <Radio value={3}>
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'white' }} />
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
            children: levels,
        },
        {
            key: '3',
            label: 'Rating',
            children: rating,
        }
    ];

    const openNoti = (code?: string) => {
        courseCode.current = code || "";
        setJoin(true);
    }

    const closeModal = () => {
        const joinCourse: (data: MessageResponse<string> | null) => void = (data) => {
            try {
                console.log('data', data);
                window.location.href = `/learning/course/${courseCode.current}?title=${courseCode.current}`;
                setJoin(false);
            } catch (error) {
                console.log('error', error);
            }
        }

        CourseService.joinToCourse(courseCode.current, joinCourse);
    }

    const handleCancel = () => {
        setJoin(false);
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
            open={join}
            onOk={() => closeModal()}
            onCancel={() => handleCancel()}>
            <p>Hmmmmm.....................................</p>
        </Modal>
    </div>
}


export default CourseComponent;