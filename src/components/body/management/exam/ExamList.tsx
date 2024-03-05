import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, TableProps } from "antd";
import { useRef, useState } from "react";
import CourseForm from "../form/CourseForm";
import ExamForm from "../form/ExamForm";

const ADD_EXAM = 'ADD_EXAM';
const modal = new Map();
modal.set(ADD_EXAM, false);

const ExamList: React.FC = () => {
    const examFormRef = useRef(null);

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
    const [isModalOpen, setIsModalOpen] = useState(modal);

    const showModalAdd = (key: string) => {
        modal.set(key, true);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const handleOk = (key: string) => {
        modal.set(key, false);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const handleCancel = (key: string) => {
        modal.set(key, false);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };


    const onSubmitAddExam = (e: any) => {
        console.log('exam', e);
    }


    return <div className="course-list">
        <span className="title">All Examinations</span>
        <span className="add-course">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalAdd(ADD_EXAM)}>
                Add Examinations
            </Button></span>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Modal title="Add New Examination"
            open={isModalOpen.get(ADD_EXAM)} 
            onOk={() => {
                //@ts-ignore
                examFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(ADD_EXAM)} 
            okText='Submit'
            width={1200}>
            <ExamForm examFormRef={examFormRef} onSubmit={onSubmitAddExam}/>
        </Modal>
    </div>
}


export default ExamList;