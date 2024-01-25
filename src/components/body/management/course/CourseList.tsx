import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, TableProps, Tag } from "antd";
import '../css/CourseList.scss';
import { useState } from "react";
import CourseForm from "../form/CourseForm";

const CourseList: React.FC = () => {

    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
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


    return <div className="course-list">
        <span className="title">All Courses</span>
        <span className="add-course">
            <Button type="primary" icon={<PlusOutlined />} onClick={showModalAdd}>
                Add Course
            </Button></span>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Modal title="Add New Course"
            open={isModalOpen} onOk={handleOk}
            onCancel={handleCancel} okText='Submit'
            width={1200}>
            <CourseForm />
        </Modal>
    </div>
}


export default CourseList;