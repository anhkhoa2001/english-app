import { Button, CollapseProps, Rate } from "antd";
import '../css/ExamManagement.scss';
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const PART = 'PART';
const modal = new Map();

const ExamManagement: React.FC = () => {
    const [isModalSectionOpen, setIsModalSectionOpen] = useState(modal);

    const showModalAdd = (key: string) => {
        isModalSectionOpen.set(key, true);
        const newMap = new Map(isModalSectionOpen);
        setIsModalSectionOpen(newMap);
    };

    const sections = [
        {
            title: "Kafka Introduction",
            lessons: [
                {
                    code: 'E001',
                    title: " Introduction | Apache Kafka Fundamentals",
                    duration: 3,
                    status: 0,
                    url_video: "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503074/f9f7gqaurfg9gac0nuap.mp4",
                    view: 100,
                    url_image: "https://1.bp.blogspot.com/-yQtpzhkIyFM/XYs4gGdG8SI/AAAAAAAAAPU/Tg5XXCJyPgA8pJ4ErGCQzGhnPJauB2kagCEwYBhgL/s1600/KafkaIntroduction.png"
                },
                {
                    code: 'E002',
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
                    code: 'E003',
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
    interface DataType {
        key: string;
        code: string;
        name: string;
        durations: string;
        tags: React.ReactNode;
    }


    const [sectionCurrent, setSectionCurrent] = useState(sections);

    const itemDashboards: CollapseProps['items'] = sectionCurrent.map((item, index) => {
        const dataFake: DataType[] = item.lessons.map((l, i) => {
            return {
                key: i + '',
                code: l.code,
                name: l.title,
                durations: `${l.duration} min`,
                tags: <PreViewVideo url_image={l.url_image} url_video={l.url_video} />,
            }
        });
        return {
            key: index + '',
            label: <div className="header-course">
                <Form.Item label={`Section ${index + 1}: ${item.title}`} name={'name' + index} >
                    <Button onClick={() => showModalAdd(LESSON)} className="item-section" name={'edit' + index}>Add Lesson</Button>
                    <Button className="item-section" name={'edit' + index}>Edit Section</Button>
                    <Button className="item-section" name={'delete' + index}>Delete Section</Button>
                </Form.Item>
            </div>,
            children: <Table columns={columns} dataSource={dataFake} pagination={false} />
        }
    });

    return <div className="exam-manage" >
        <div className="introduction">
            <h1>The English Master Course: English Grammar, English Speaking</h1>
            <h3>A Complete English Language Course: English Grammar, Speaking, Pronunciation, and Writing. British and American English.</h3>
            <p className="summary">Bộ đề có cấu trúc sát nhất với bài thi TOEIC thực chiến. Luyện đề TOEIC Hacker 2 để nắm trọn mọi dạng bài. &nbsp;Luyện đề cùng đáp án và giải thích chi tiết.</p><p><strong>&gt;&gt;&gt; Hiện tại, phần giải thích đáp án đang được thầy cô Prep gấp rút hoàn thiện và cập nhật lên hệ thống trong thời gian tới. Prep sẽ tiếp tục cập nhật vào kho đề, các bạn hãy yên tâm chăm chỉ ôn luyện nhé !</strong></p>
            <div className="info">
                <div className="rating-star">
                    <p>{1000} attendences</p>
                </div>
                <span className="author">Created by <a href="/">Khoa dam tam</a></span>
            </div>
        </div>
        <div className="add-section">
            <span className="header">Content Course</span>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalAdd(PART)}>
                Add New Part
            </Button>
        </div>
        <Collapse items={itemDashboards} expandIcon={({ isActive }) => <></>} defaultActiveKey={['1']} onChange={onChange} />
    </div>
}


export default ExamManagement;