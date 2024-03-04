import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Pagination, Space, Switch, Table, TableProps, Tag } from "antd";
import '../css/CourseList.scss';
import { useEffect, useRef, useState } from "react";
import CourseForm from "../form/CourseForm";
import CourseService, { CourseDTO } from "../../../../service/CourseService";
import MessageResponse from "../../../../entity/response/MessageResponse";
import moment from "moment";
import { ModalCustom } from "../../../exception/SuccessModal";


const default_page = 1;
const default_pageSize = 2;

const ADD_COURSE = 'ADD_COURSE';
const EDIT_COURSE = 'EDIT_COURSE';
const modal = new Map();
modal.set(ADD_COURSE, false);
modal.set(EDIT_COURSE, false);

const CourseList: React.FC = () => {
    const courseFormRef = useRef(null);

    const editCourse = (item: CourseDTO) => {
        showModalAdd(EDIT_COURSE);
        console.log(item);
    }

    const columns: TableProps<CourseDTO>['columns'] = [
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                render: (text) => <a>{text}</a>,
            },
            {
                title: 'Name',
                dataIndex: 'courseName',
                key: 'courseName',
            },
            {
                title: 'Summary',
                dataIndex: 'summary',
                key: 'summary',
            },
            {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
            },
            {
                title: 'Thumbnail',
                dataIndex: 'thumbnail',
                key: 'thumbnail',
                render: (url) => <Image
                    width={120}
                    src={url}
                />
            },
            {
                title: 'Public',
                dataIndex: 'public',
                key: 'public',
                render: (pub) => <Switch checked={pub} disabled />
            },
            {
                title: 'Create At',
                dataIndex: 'createAt',
                key: 'createAt',
                render: (value: Date) => `${moment(value).format('DD-MM-YYYY HH:mm:ss')}`,
            },
            {
                title: 'Create By',
                dataIndex: 'createBy',
                key: 'createBy',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, e) => (
                    <Space size="middle">
                        <Button onClick={() => editCourse(e)} icon={<EditOutlined />} />
                        <Button icon={<DeleteOutlined />} />
                    </Space>
                ),
            },
        ];

    const [courses, setCourses] = useState<CourseDTO[]>([]);

    const loadCourse: (data: MessageResponse<CourseDTO[]> | null) => void = (data) => {
        try {
            setCourses(data?.data || []);

            console.log('data', courses);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        CourseService.getAllCourse("abc", 1, default_pageSize, loadCourse);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalAdd = (key: string) => {
        modal.set(key, true);
        setIsModalOpen(modal.get(key));
    };

    const handleOk = (key: string) => {
        modal.set(key, false);
        setIsModalOpen(modal.get(key));
    };

    const handleCancel = (key: string) => {
        modal.set(key, false);
        setIsModalOpen(modal.get(key));
    };


    const submitFormAddCourse = (e: any) => {
        console.log(e);
        if (e.courseCode !== null && e.courseName !== null) {

            const create: (data: MessageResponse<CourseDTO> | null) => void = (data) => {
                try {
                    console.log('data', courses);
                    handleOk(ADD_COURSE);
                    ModalCustom.onDisplaySuccess('Success', 'Success');
                    CourseService.getAllCourse("abc", default_page, default_pageSize, loadCourse);
                } catch (error) {
                    console.log('error', error);
                }
            }

            CourseService.create("", e, create);
        }
    }

    const [currentPage, setCurrentPage] = useState(default_page);

    const change:TableProps['onChange'] = (pagination) => {
        console.log(pagination);
        setCurrentPage(pagination.current || default_page);
        CourseService.getAllCourse("abc", pagination.current || default_page, 
                            pagination.pageSize || default_pageSize, loadCourse);
    }

    return <div className="course-list">
        <span className="title">All Courses</span>
        <span className="add-course">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalAdd(ADD_COURSE)}>
                Add Course
            </Button></span>
        <Table columns={columns} dataSource={courses} style={{ width: 1300 }} pagination={{
            current: currentPage,
            pageSize: default_pageSize,
            total: courses.length
        }}
        onChange={change}/>
        <Modal title="Add New Course"
            open={isModalOpen}
            onOk={() => {
                //@ts-ignore
                courseFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(ADD_COURSE)} 
            okText='Submit'
            width={1200}>
            <CourseForm onSubmit={submitFormAddCourse} courseFormRef={courseFormRef} />
        </Modal>

        <Modal title="Edit Course"
            open={isModalOpen}
            onOk={() => {
                //@ts-ignore
                courseFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(EDIT_COURSE)}  
            okText='Submit'
            width={1200}>
            <CourseForm onSubmit={submitFormAddCourse} courseFormRef={courseFormRef} />
        </Modal>
    </div>
}


export default CourseList;