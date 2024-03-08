import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Space, Switch, Table, TableProps } from "antd";
import { useEffect, useRef, useState } from "react";
import ExamForm from "../form/ExamForm";
import MessageResponse from "../../../../entity/response/MessageResponse";
import { ExamDTO, ExamService } from "../../../../service/ExamService";
import { ModalCustom } from "../../../exception/SuccessModal";
import moment from "moment";

const ADD_EXAM = 'ADD_EXAM';
const DELETE_EXAM = 'DELETE_EXAM';
const EDIT_EXAM = 'EDIT_EXAM';

const modal = new Map();
modal.set(ADD_EXAM, false);
modal.set(DELETE_EXAM, false);
modal.set(EDIT_EXAM, false);

let examCode:string = "";

const ExamList: React.FC = () => {
    const examFormRef = useRef(null);
    const [exams, setExams] = useState<ExamDTO[]>([]);
    const [examItem, setExamItem] = useState<ExamDTO>();

    const loadExam: (data: MessageResponse<ExamDTO[]> | null) => void = (data) => {
        setExams(data?.data || []);
    }

    useEffect(() => {
        ExamService.getAllExam('abc', loadExam);
    }, [])

    const columns: TableProps<ExamDTO>['columns'] = [
        {
            title: 'Code',
            dataIndex: 'examCode',
            key: 'examCode',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'examName',
            key: 'examName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (pub) => <Switch checked={pub} disabled />
        },
        {
            title: 'Summary',
            dataIndex: 'summary',
            key: 'summary',
        },
        {
            title: 'Skill',
            dataIndex: 'skill',
            key: 'skill',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => <Image
                width={120}
                src={text}
            />
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
            render: (_, item) => (
                <Space size="middle">
                    <Button icon={<EditOutlined onClick={() => {
                        setExamItem(item);
                        showModalAdd(EDIT_EXAM);
                    }}/>} />
                    {
                        item.status ? <Button icon={<DeleteOutlined onClick={() => showModalAdd(DELETE_EXAM, item.examCode)}/>} /> : <></>
                    }
                </Space>
            ),
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(modal);

    const showModalAdd = (key: string, code?: string) => {
        examCode = code || "";
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


    const deleteExam = () => {
        console.log('delete code', examCode);

        if (examCode !== null || examCode != "") {
            const deleteExam: (data: MessageResponse<string> | null) => void = (data) => {
                try {
                    handleOk(DELETE_EXAM);
                    ModalCustom.onDisplaySuccess('Success', 'Success');
                    ExamService.getAllExam('abc', loadExam);
                } catch (error) {
                    console.log('error', error);
                }
            }

            ExamService.deleteExam("", examCode, deleteExam);
        }
    }


    const onSubmitAddExam = (e: any) => {
        console.log('exam', e);

        if (e.examCode !== null && e.examName !== null) {

            const create: (data: MessageResponse<ExamDTO> | null) => void = (data) => {
                try {
                    handleOk(ADD_EXAM);
                    ModalCustom.onDisplaySuccess('Success', 'Success');
                    ExamService.getAllExam('abc', loadExam);
                } catch (error) {
                    console.log('error', error);
                }
            }

            ExamService.createExam("", e, create);
        }
    }


    const onSubmitEditExam = (e: any) => {
        console.log('exam edit', e);

        if (e.examName !== null) {
            const edit: (data: MessageResponse<ExamDTO> | null) => void = (data) => {
                try {
                    handleOk(EDIT_EXAM );
                    ModalCustom.onDisplaySuccess('Success', 'Success');
                    ExamService.getAllExam('abc', loadExam);
                } catch (error) {
                    console.log('error', error);
                }
            }

            ExamService.editExam("", e, edit);
        }
    }


    return <div className="course-list">
        <span className="title">All Examinations</span>
        <span className="add-course">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalAdd(ADD_EXAM)}>
                Add Examinations
            </Button></span>
        <Table columns={columns} dataSource={exams} pagination={false} />
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

        <Modal title={`Edit Examination ${examCode}`}
            open={isModalOpen.get(EDIT_EXAM)} 
            onOk={() => {
                //@ts-ignore
                examFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(EDIT_EXAM)} 
            okText='Submit'
            width={1200}>
            <ExamForm examFormRef={examFormRef} onSubmit={onSubmitEditExam} item={examItem}/>
        </Modal>

        <Modal title="Are you sure to delete this?"
            open={isModalOpen.get(DELETE_EXAM)}
            onOk={() => {
                //@ts-ignore
                deleteExam();
            }}
            onCancel={() => handleCancel(DELETE_EXAM)}
            okText='Submit'
            width={800}>
            <p>Hmmmmmm........</p>
        </Modal>
    </div>
}


export default ExamList;