import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Space, Switch, Table, TableProps, Tag } from "antd";
import '../css/CourseList.scss';
import { useEffect, useRef, useState } from "react";
import CourseForm from "../form/CourseForm";
import CourseService, { CourseDTO } from "../../../../service/CourseService";
import MessageResponse from "../../../../entity/response/MessageResponse";
import moment from "moment";

const CourseList: React.FC = () => {
    const courseFormRef = useRef(null);
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: TableProps<{
        code: string,
        courseName: string,
        description: string,
        level: string,
        status: true,
        summary: string,
        thumbnail: string,
        createBy: string,
        createAt: Date,
        public: true
    }>['columns'] = [
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
                render: (pub) => <Switch checked={pub} disabled/>
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
                render: (_, code) => (
                    <Space size="middle">
                        <Button icon={<EyeOutlined />}></Button>
                        <Button icon={<EditOutlined />} />
                        <Button icon={<DeleteOutlined />} />
                    </Space>
                ),
            },
        ];

    const [courses, setCourses] = useState<CourseDTO | null>(null);

    useEffect(() => {
        const check: (data: MessageResponse<CourseDTO> | null) => void = (data) => {
            try {

                setCourses(data?.data == undefined ? null : data.data);

                console.log('data', courses?.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        CourseService.getAllCourse("abc", 1, 10, check);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalAdd = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const submitFormAddCourse = (e: any) => {
        console.log(e);
    }


    return <div className="course-list">
        <span className="title">All Courses</span>
        <span className="add-course">
            <Button type="primary" icon={<PlusOutlined />} onClick={showModalAdd}>
                Add Course
            </Button></span>
        <Table columns={columns} dataSource={courses?.data} pagination={false} />
        <Modal title="Add New Course"
            open={isModalOpen}
            onOk={() => {
                courseFormRef.current?.submit();
                handleOk();
            }}
            onCancel={handleCancel} okText='Submit'
            width={1200}>
            <CourseForm onSubmit={submitFormAddCourse} courseFormRef={courseFormRef} />
        </Modal>
    </div>
}


export default CourseList;