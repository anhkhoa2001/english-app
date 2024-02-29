import { Button, Collapse, CollapseProps, Form, Image, Modal, Rate, Space, Table, TableProps, Tag } from "antd";
import PreViewVideo from "./PreviewVideo";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import '../css/CourseManagement.scss'
import React, { useEffect, useRef, useState } from "react";
import SectionForm from "../form/SectionForm";
import LessonForm from "../form/LessonForm";
import MessageResponse from "../../../../entity/response/MessageResponse";
import CourseService, { CourseDTO } from "../../../../service/CourseService";
import { CourseItemDTO } from "../../../../entity/props/CourseItemDTO";
import { SectionItemDTO } from "../../../../entity/props/SectionDTO";

const SECTION: string = "section";
const LESSON: string = "lesson";

const modal = new Map();
modal.set(SECTION, false);
modal.set(LESSON, false);


const CourseManagement: React.FC<{code: string}> = ({code}) => {
    const formRef = useRef(null);
    const lessonFormRef = useRef(null);
    const [item, setItem] = useState<CourseItemDTO>();
    const [rate, setRate] = useState(0);
    const [lessonIndex, setLessonIndex] = useState(0);

    const loadCourse: (data: MessageResponse<CourseItemDTO> | null) => void = (data) => {
        try {
            setItem(data?.data);
            setSectionCurrent(data?.data.sections || []);
            console.log('data 1', data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        CourseService.getByCode("abc", code, loadCourse);
    }, []);


    const url_video = "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503074/f9f7gqaurfg9gac0nuap.mp4";
    const url_image = "https://admin-s3.s3-sgn09.fptcloud.com/employee/2024/1/24/_DSF0893.JPG";

    const sections = [
        // {
        //     title: "Kafka Introduction",
        //     lessons: [
        //         {
        //             code: 'E001',
        //             title: " Introduction | Apache Kafka Fundamentals",
        //             duration: 3,
        //             status: 0,
        //             url_video: "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503074/f9f7gqaurfg9gac0nuap.mp4",
        //             view: 100,
        //             url_image: "https://1.bp.blogspot.com/-yQtpzhkIyFM/XYs4gGdG8SI/AAAAAAAAAPU/Tg5XXCJyPgA8pJ4ErGCQzGhnPJauB2kagCEwYBhgL/s1600/KafkaIntroduction.png"
        //         },
        //         {
        //             code: 'E002',
        //             title: "Motivations and Customer Use Cases | Apache Kafka Fundamentals",
        //             duration: 3,
        //             status: 0,
        //             url_video: "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503066/nsfhiavjfreuyvwqwvdm.mp4",
        //             view: 100,
        //             url_image: "https://asia-1-fileserver-2.stringee.com/0/asia-1_1_LPVMRM464MX8YV0/1698745038-kafka_la_gi.png"
        //         }
        //     ],
        //     duration: 100,
        // },
        // {
        //     title: "Kafka Theory",
        //     lessons: [
        //         {
        //             code: 'E003',
        //             title: " Introduction | Apache Kafka Fundamentals",
        //             duration: 3,
        //             status: 0,
        //             url_video: "https://res.cloudinary.com/dwqrocbjv/video/upload/v1705503074/f9f7gqaurfg9gac0nuap.mp4",
        //             view: 100,
        //             url_image: "https://asia-1-fileserver-2.stringee.com/0/asia-1_1_LPVMRM464MX8YV0/1698745038-kafka_la_gi.png"
        //         }
        //     ],
        //     duration: 100,
        // }
    ];
    interface DataType {
        key: string;
        code: string;
        name: string;
        durations: string;
        tags: React.ReactNode;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <a href={url_video} target="_blank">{text}</a>,
        },
        {
            title: 'Section Name',
            dataIndex: 'name',
            key: '2',
        },
        {
            title: 'Durations',
            dataIndex: 'durations',
            key: 'durations',
        },
        {
            title: 'Preview',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button icon={<EditOutlined />} />
                    <Button icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const [sectionCurrent, setSectionCurrent] = useState<SectionItemDTO[]>([]);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const [isModalSectionOpen, setIsModalSectionOpen] = useState(modal);
    
    const showModalAdd = (key: string) => {
        isModalSectionOpen.set(key, true);
        const newMap = new Map(isModalSectionOpen);
        setIsModalSectionOpen(newMap);
    };

    const showModalAddLesson = (key: string, index: number) => {
        isModalSectionOpen.set(key, true);
        const newMap = new Map(isModalSectionOpen);
        setLessonIndex(index);
        setIsModalSectionOpen(newMap);
    };

    const submitFormAddSection = (e: any) => {
        
        e.courseCode = item?.code;
        console.log(e);

    };

    const closeModal = (key: string) => {
        isModalSectionOpen.set(key, false);
        const newMap = new Map(isModalSectionOpen);
        setIsModalSectionOpen(newMap);
    };

    const handleCancel = (key: string) => {
        isModalSectionOpen.set(key, false);
        const newMap = new Map(isModalSectionOpen);
        setIsModalSectionOpen(newMap);
    };

    const itemDashboards: CollapseProps['items'] = sectionCurrent.map((item, index) => {
        const dataFake: DataType[] = (item.lessons || []).map((l, i) => {
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
                <Form.Item label={`Section ${index + 1}: ${item.sectionName}`} name={'name' + index} >
                    <Button onClick={() => showModalAddLesson(LESSON, index)} className="item-section" name={'edit' + index}>Add Lesson</Button>
                    <Button className="item-section" name={'edit' + index}>Edit Section</Button>
                    <Button className="item-section" name={'delete' + index}>Delete Section</Button>
                </Form.Item>
            </div>,
            children: <Table columns={columns} dataSource={dataFake} pagination={false} />
        }
    });


    const onSubmitAddLesson = (e:any) => {
        console.log(e);
    }

    return <>
        {/* <PreViewVideo url_image={url_image} url_video={url_video} /> */}
        <div className="introduction">
            <h1>{item?.courseName}</h1>
            <h3>{item?.summary}</h3>
            <div>
                <div className="rating-star">
                    <Rate disabled allowHalf defaultValue={item?.rate} />
                    <p>{item?.totalSub} students</p>
                </div>
                <span className="author">Created by <a href="/">{item?.createBy}</a></span>
            </div>
        </div>
        <div className="add-section">
            <span className="header">Content Course</span>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalAdd(SECTION)}>
                Add New Section
            </Button>
        </div>
        <Collapse items={itemDashboards} expandIcon={({ isActive }) => <></>} defaultActiveKey={['1']} onChange={onChange} />
        <Modal title="Add New Section"
            open={isModalSectionOpen.get(SECTION)}
            onOk={() => {
                //@ts-ignore
                formRef.current?.submit();
                closeModal(SECTION)
            }}
            onCancel={() => handleCancel(SECTION)}
            okText='Submit'
            width={800}>
            <SectionForm onSubmit={submitFormAddSection} formRef={formRef} />
        </Modal>

        <Modal title="Add New Lesson"
            open={isModalSectionOpen.get(LESSON)}
            onOk={() => {
                //@ts-ignore
                lessonFormRef.current?.submit();
                closeModal(LESSON)
            }}
            onCancel={() => handleCancel(LESSON)}
            okText='Submit'
            width={900}>
            <LessonForm 
                section_name={sectionCurrent[lessonIndex]?.sectionName || ""} 
                section_id={sectionCurrent[lessonIndex]?.section_id || 0}
                lessonFormRef={lessonFormRef}
                onSubmit={onSubmitAddLesson}
            />
        </Modal>
    </>
}


export default CourseManagement;