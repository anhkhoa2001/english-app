import './css/Lessonlist.scss';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ImDisplay } from "react-icons/im";
import { useState } from 'react';

const LessonList: React.FC = () => {
    const sections = [
        {
            title: "Kafka Introduction",
            lessons: [
                {
                    title: " Introduction | Apache Kafka Fundamentals",
                    duration: 3,
                    status: 0,
                    url_video: "https://www.youtube.com/watch?v=-DyWhcX3Dpc&list=PLa7VYi0yPIH2PelhRHoFR5iQgflg-y6JA",
                    view: 100
                },
                {
                    title: "Motivations and Customer Use Cases | Apache Kafka Fundamentals",
                    duration: 3,
                    status: 0,
                    url_video: "https://www.youtube.com/watch?v=BsojaA1XnpM&list=PLa7VYi0yPIH2PelhRHoFR5iQgflg-y6JA&index=2",
                    view: 100
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
                    url_video: "https://www.youtube.com/watch?v=-DyWhcX3Dpc&list=PLa7VYi0yPIH2PelhRHoFR5iQgflg-y6JA",
                    view: 100
                }
            ],
            duration: 100,
        }
    ];

    const [appearLesson, setAppearLesson] = useState(false);

    const clickDrop = (event) => {
        console.log(event);
    }

    return <div className="section-list">
        <div className='header-section'>
            Course Content
        </div>
        <hr></hr>
        <div className='content-section'>
            {
                Array.from({ length: sections.length }, (_, i) => (
                    <section className='item-section'>
                        <div className='header-item-section' onClick={() => setAppearLesson(!appearLesson)} key={i}>
                            <h3>Section {i + 1}: {sections[i].title}</h3>
                            <span className='icon' key={i}>{appearLesson ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                            <p>4/4 | {sections[i].duration}min</p>
                        </div>
                        <div className={"lesson " + appearLesson ? 'active' : ''} key={`lesson${i + 111}`}>
                            {Array.from({ length: sections[i].lessons.length }, (_, j) => (
                                <div className='item-lesson'>
                                    <input type="checkbox" key={j} />
                                <div className='right'>
                                    <p>{j + 1}. {sections[i].lessons[j].title}</p>
                                    <ImDisplay /> <span className='lesson-duration'>{sections[i].lessons[j].duration}min</span>
                                </div>
                            </div>
                            ))}
                        </div>
                    </section>
                ))
            }

            {/* <section className='item-section'>
                <div className='header-item-section'>
                    <h3>Section {1}: Kafka Introduction</h3>
                    <span className='icon'><IoIosArrowDown /></span>
                    <p>4/4 | 15min</p>
                </div>
                <div className='lessons'>
                    <div className='item-lesson'>
                        <input type="checkbox" key={1}/>
                        <div className='right'>
                            <p>{1}. Introduction | Apache Kafka Fundamentals 1</p>
                            <ImDisplay/> <span className='lesson-duration'>{4}min</span>
                        </div>
                    </div>
                    <div className='item-lesson'>
                        <input type="checkbox" key={1}/>
                        <div className='right'>
                            <p>{1}. Introduction | Apache Kafka Fundamentals 23123312</p>
                            <ImDisplay/> <span className='lesson-duration'>{4}min</span>
                        </div>
                    </div>
                    <div className='item-lesson'>
                        <input type="checkbox" key={1}/>
                        <div className='right'>
                            <p>{1}. Introduction | Apache Kafka Fundamentals 3</p>
                            <ImDisplay/> <span className='lesson-duration'>{4}min</span>
                        </div>
                    </div>
                    <div className='item-lesson'>
                        <input type="checkbox" key={1}/>
                        <div className='right'>
                            <p>{1}. Introduction | Apache Kafka Fundamentals 4</p>
                            <ImDisplay/> <span className='lesson-duration'>{4}min</span>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    </div>
}


export default LessonList;