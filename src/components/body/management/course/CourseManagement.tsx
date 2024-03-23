import { Button, Collapse, CollapseProps, Form, Image, Modal, Rate, Space, Table, TableProps, Tag } from "antd";
import PreViewVideo from "./PreviewVideo";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import '../css/CourseManagement.scss'
import React, { useEffect, useRef, useState } from "react";
import SectionForm from "../form/SectionForm";
import LessonForm from "../form/LessonForm";
import CourseService, { CourseDTO } from "../../../../service/CourseService";
import { CourseItemDTO } from "../../../../entity/props/CourseItemDTO";
import { SectionDTO, SectionItemDTO } from "../../../../entity/props/SectionDTO";
import { LessonDTO } from "../../../../entity/props/LessonDTO";
import { ModalCustom } from "../../../exception/SuccessModal";
import moment from "moment";
import { MessageResponse } from "../../../../entity/response/MessageResponse";

const SECTION: string = "section";
const EDIT_SECTION: string = "edit_section";
const DELETE_SECTION: string = "delete_section";
const LESSON: string = "lesson";
const EDIT_LESSON: string = "edit_lesson";
const DELETE_LESSON: string = "delete_lesson";

const modal = new Map();
modal.set(SECTION, false);
modal.set(EDIT_SECTION, false);
modal.set(DELETE_SECTION, false);
modal.set(LESSON, false);
modal.set(EDIT_LESSON, false);


let indexSection:number = 0;


const CourseManagement: React.FC<{code: string}> = ({code}) => {
    const formRef = useRef(null);
    const lessonFormRef = useRef(null);
    const editLessonFormRef = useRef(null);
    const [item, setItem] = useState<CourseItemDTO>();
    const [lessonIndex, setLessonIndex] = useState(0);
    const [lessonItemEffect, setLessonItemEffect] = useState<LessonDTO>();

    const loadCourse: (data: MessageResponse<CourseItemDTO> | null) => void = (data) => {
        try {
            setItem(data?.data);
            setSectionCurrent(data?.data.sections || []);
            console.log('course detail', data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        CourseService.getByCode(code, loadCourse);
    }, [code]);


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
        url_video: string;
        tags: React.ReactNode;
        item: LessonDTO,
        createBy: string,
        createAt: string,
        index: number
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (text, i) => <a onClick={() => {
                console.log(i.url_video);
            }} href={i.url_video} target="_blank">{text}</a>,
        },
        {
            title: 'Section Name',
            dataIndex: 'name',
            key: '2',
        },
        {
            title: 'Preview',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: 'Create By',
            key: 'createBy',
            dataIndex: 'createBy'
        },
        {
            title: 'Create At',
            key: 'createAt',
            dataIndex: 'code',
            render: (text, i) => <p>{moment(i.createAt).format('DD-MM-YYYY HH:mm:ss') + ''}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, i) => (
                <Space size="small">
                    <Button onClick={() => {
                        setLessonItemEffect(i.item);
                        showModalAdd(EDIT_LESSON);
                    }} icon={<EditOutlined />} />
                    <Button onClick={() => {
                        setLessonItemEffect(i.item);
                        showModalAdd(DELETE_LESSON);
                    }} icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const [sectionCurrent, setSectionCurrent] = useState<SectionItemDTO[]>([]);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const [isModalSectionOpen, setIsModalSectionOpen] = useState(modal);
    
    const showModalAdd = (key: string, index?: number) => {
        indexSection = index || 0;
        isModalSectionOpen.set(key, true);
        const newMap = new Map(isModalSectionOpen);
        index && setLessonIndex(index);
        setIsModalSectionOpen(newMap);
    };

    const showModalAddLesson = (key: string, index: number) => {
        console.log('lessin index', sectionCurrent[index]);
        isModalSectionOpen.set(key, true);
        const newMap = new Map(isModalSectionOpen);
        setLessonIndex(index);
        setIsModalSectionOpen(newMap);
    };

    const submitFormAddSection = (e: any) => {
        e.courseCode = item?.code;
        console.log(e);

        
        if (e.sectionName !== null) {
            const createSection: (data: MessageResponse<SectionDTO> | null) => void = (data) => {
                try {
                    ModalCustom.onDisplaySuccess('Success', 'Success');
                    CourseService.getByCode( code, loadCourse);
                } catch (error) {
                    console.log('error', error);
                }
            }

            CourseService.createSection(e, createSection);
        }

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
        //@ts-ignore
        const dataFake: DataType[] = (item.lessons || []).map((l, i) => {
            return {
                key: i + '',
                code: l.lesson_id,
                name: l.lessionName + '' + i,
                durations: `${5} min`,
                url_video: l.url_video,
                tags: <PreViewVideo url_image={l.thumbnail} url_video={l.url_video} />,
                item: l,
                createAt: l.create_at,
                createBy: l.create_by || 'admin',
                index: index
            }
        });
        return {
            key: index + '',
            label: <div className="header-course">
                <Form.Item label={`Section ${index + 1}: ${item.sectionName}`} name={'name' + index} >
                    <Button onClick={() => showModalAddLesson(LESSON, index)} className="item-section" name={'edit' + index}>Add Lesson</Button>
                    <Button onClick={() => showModalAdd(DELETE_SECTION, item.section_id)} className="item-section" name={'delete' + index}>Delete Section</Button>
                </Form.Item>
            </div>,
            children: <Table columns={columns} dataSource={dataFake} pagination={false} />
        }
    });


    const onSubmitAddLesson = (e:any) => {
        console.log(e);
        if (e.lessonName !== null) {

            const createLesson: (data: MessageResponse<LessonDTO> | null) => void = (data) => {
                try {
                    ModalCustom.onDisplaySuccess('Success', 'Success');
                    CourseService.getByCode(code, loadCourse);
                } catch (error) {
                    console.log('error', error);
                }
            }

            CourseService.createLesson(e, createLesson);
        }
    }

    const onSubmitEditLesson = (e:any) => {
        console.log(e);
        const updateLesson: (data: MessageResponse<LessonDTO> | null) => void = (data) => {
            try {
                ModalCustom.onDisplaySuccess('Success', 'Success');
                CourseService.getByCode(code, loadCourse);
            } catch (error) {
                console.log('error', error);
            }
        }

        CourseService.updateLesson(e, updateLesson);
    }


    const deleteSection = () => {
        console.log('sectionId', indexSection);

        const deleteSection: (data: MessageResponse<SectionDTO> | null) => void = (data) => {
            try {
                ModalCustom.onDisplaySuccess('Success', 'Success');
                CourseService.getByCode(code, loadCourse);
            } catch (error) {
                console.log('error', error);
            }
        }

        CourseService.deleteSection(indexSection, deleteSection);

    }


    const deleteLesson = () => {
        console.log('lesson_id', lessonItemEffect);
        const deleteLesson: (data: MessageResponse<LessonDTO> | null) => void = (data) => {
            try {
                ModalCustom.onDisplaySuccess('Success', 'Success');
                CourseService.getByCode(code, loadCourse);
            } catch (error) {
                console.log('error', error);
            }
        }

        CourseService.deleteLesson(lessonItemEffect?.lesson_id || 0, deleteLesson);
    }

    const ReactComponent = (element: string) => {
        return React.createElement('div', { dangerouslySetInnerHTML: { __html: element } });
      };

    return <>
        {/* <PreViewVideo url_image={url_image} url_video={url_video} /> */}
        <div className="introduction">
            <h1>{item?.courseName}</h1>
            <h3>{item?.summary}</h3>
            <div >
                {ReactComponent(item?.description || "")}
            </div>
            <div className="rate-auth">
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
            <SectionForm onSubmit={submitFormAddSection} formRef={formRef} courseCode={item?.code || ""} />
        </Modal>

        <Modal title="Are you sure to delete this?"
            open={isModalSectionOpen.get(DELETE_SECTION)}
            onOk={() => {
                //@ts-ignore
                deleteSection();
                closeModal(DELETE_SECTION);
            }}
            onCancel={() => handleCancel(DELETE_SECTION)}
            okText='Submit'
            width={800}>
            <p>Hmmmmmm........</p>
        </Modal>


        <Modal title="Are you sure to delete this?"
            open={isModalSectionOpen.get(DELETE_LESSON)}
            onOk={() => {
                //@ts-ignore
                deleteLesson();
                closeModal(DELETE_LESSON);
            }}
            onCancel={() => handleCancel(DELETE_LESSON)}
            okText='Submit'
            width={800}>
            <p>Hmmmmmm........</p>
        </Modal>

        <Modal title="Edit Lesson"
            open={isModalSectionOpen.get(EDIT_LESSON)}
            onOk={() => {
                //@ts-ignore
                editLessonFormRef.current?.submit();
                closeModal(EDIT_LESSON)
            }}
            onCancel={() => handleCancel(EDIT_LESSON)}
            okText='Submit'
            width={900}>
            <LessonForm 
                section_name={sectionCurrent[lessonIndex]?.sectionName || ""} 
                sectionId={lessonItemEffect?.section_id || -1}
                item={lessonItemEffect}
                lessonFormRef={editLessonFormRef}
                onSubmit={onSubmitEditLesson}
            />
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
                sectionId={sectionCurrent[lessonIndex]?.section_id || 0}
                lessonFormRef={lessonFormRef}
                onSubmit={onSubmitAddLesson}
            />
        </Modal>
    </>
}


export default CourseManagement;