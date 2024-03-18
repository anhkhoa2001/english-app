import './css/Lessonlist.scss';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ImDisplay } from "react-icons/im";
import { useEffect, useState } from 'react';
import VideoPlay from './VideoPlay';
import { CourseItemDTO } from '../../../../entity/props/CourseItemDTO';
import { ClockCircleOutlined, FileTextOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { ExamPartDTO, QuestionDTO } from '../../../../entity/props/ExamDTO';
import THPTComponent from '../../exams/types/THPTComponent';

const LessonList: React.FC<{course: CourseItemDTO}> = ({course}) => {
    console.log('course', course);
    const sections = [
        {
            title: "Kafka Introduction",
            lessons: [
                {
                    title: " Introduction | Apache Kafka Fundamentals",
                    duration: 3,
                    status: 0,
                    url_video: "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503074/f9f7gqaurfg9gac0nuap.mp4",
                    view: 100,
                    url_image: "https://1.bp.blogspot.com/-yQtpzhkIyFM/XYs4gGdG8SI/AAAAAAAAAPU/Tg5XXCJyPgA8pJ4ErGCQzGhnPJauB2kagCEwYBhgL/s1600/KafkaIntroduction.png"
                },
                {
                    title: "Motivations and Customer Use Cases | Apache Kafka Fundamentals",
                    duration: 3,
                    status: 0,
                    url_video: "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503066/nsfhiavjfreuyvwqwvdm.mp4",
                    view: 100,
                    url_image: "https://asia-1-fileserver-2.stringee.com/0/asia-1_1_LPVMRM464MX8YV0/1698745038-kafka_la_gi.png"
                }
            ],
            duration: 100,
        },
        {
            title: "Kafka Theory",
            lessons: [
                {
                    title: " Introduction | Apache Kafka Fundamentals",
                    duration: 3,
                    status: 0,
                    url_video: "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503074/f9f7gqaurfg9gac0nuap.mp4",
                    view: 100,
                    url_image: "https://asia-1-fileserver-2.stringee.com/0/asia-1_1_LPVMRM464MX8YV0/1698745038-kafka_la_gi.png"
                }
            ],
            duration: 100,
        }
    ];

    

    //set drop tab lessons
    var initLessonDrop = (size: number) => {
        var result = [];
        for (var i = 0; i < size; i++) {
            result[i] = false;
        }
        return result;
    };

    const [appearLesson, setAppearLesson] = useState(initLessonDrop(course.sections.length));
    const [isLesson, setIsLesson] = useState<boolean>(true);
    const [minitest, setMinitest] = useState<ExamPartDTO[]>([]);

    function drop(index: number) {
        var mock = [...appearLesson];
        mock[index] = !mock[index];
        setAppearLesson(mock);
    }


    //set url video and image
    const [url, setUrl] = useState({
        url_video: '',
        url_image: ''
    });
    
    useEffect(() => {
        try {
            setUrl({
                url_video: course.sections[0].lessons[0].url_video,
                url_image: course.sections[0].lessons[0].thumbnail
            });
        } catch(err) {
                
        }
    }, [course])

    function changeVideo(i: number, j: number, type: string) {
        if(type === 'lesson') {
            setIsLesson(true);
            setUrl({
                url_video: course.sections[i].lessons[j].url_video,
                url_image: course.sections[i].lessons[j].thumbnail
            });
        } else {
            setIsLesson(false);
            const parts = course.sections[i].lessons[j].examModel;
            setMinitest([parts]);
        }
    }

    return <>
        {
            isLesson ?  
            <VideoPlay url_video={url.url_video} url_image={url.url_image} summary={course.description} /> 
            : 
            <div className="minitest">
                <THPTComponent parts={minitest}/> 
            </div>
        }
        <div className="section-list">
            <div className='header-section'>
                Course Content
            </div>
            <hr></hr>
            <div className='content-section'>
                {
                    Array.from({ length: course.sections.length }, (_, i) => (
                        <section className='item-section' key={i}>
                            <div className='header-item-section' onClick={() => drop(i)}>
                                <h3>Section {i + 1}: {course.sections[i].sectionName}</h3>
                                <span className='icon' key={i}>{appearLesson[i] ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                {/* <p>4/4 | {course.sections[i].duration}min</p> */}
                            </div>
                            <div className={appearLesson[i] ? "lessons active" : "lessons"} >
                                {Array.from({ length: course.sections[i].lessons.length }, (_, j) => (
                                    <div className='item-lesson' key={j} onClick={() => changeVideo(i, j, course.sections[i].lessons[j].type)}>
                                        {/* <input type="checkbox" key={j} /> */}
                                        <div className='icon'>
                                            {
                                                course.sections[i].lessons[j].type == 'lesson' ? <ImDisplay /> : <FolderOpenOutlined />
                                            }
                                        </div>
                                    
                                        <div className='right'>
                                            <p>{j + 1}. {course.sections[i].lessons[j].lessionName}</p>
                                            {
                                                course.sections[i].lessons[j].type == 'minitest' ? 
                                                <>
                                                    <FileTextOutlined /> <span className='lesson-duration'>{course.sections[i].lessons[j].examModel.questions.length} questions</span>
                                                </>
                                                :
                                                <>
                                                    <ClockCircleOutlined /> <span className='lesson-duration'>{10}min</span>
                                                </>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                }
            </div>
        </div>
    </>
}


export default LessonList;