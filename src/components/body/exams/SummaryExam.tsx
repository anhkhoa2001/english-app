import { Avatar, Button, Modal, Table, Tabs, TabsProps, Tag } from "antd";
import CommonNav from "../courses/detail/CommonNav";
import './css/SummaryExam.scss';
import { ClockCircleOutlined, CommentOutlined, PartitionOutlined, TeamOutlined } from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";
import CommentCustom, { Editor } from "../comment/CommentCustom";
import React, { useEffect, useState } from "react";
import { CommentDTO } from "../../../entity/props/Socket";
import { TableProps } from "antd/lib";
import { useNavigate, useParams } from "react-router-dom";
import { ExamDTO } from "../../../entity/props/ExamDTO";
import { MessageResponse } from "../../../entity/response/MessageResponse";
import { ExamService } from "../../../service/ExamService";

const types = ['TOEIC', 'Academy'];

const ExaminationInfomation: React.FC<{ item?: ExamDTO, description: React.ReactNode }> = ({ item, description }) => {
    const [ready, setReady] = useState<boolean>(false);
    const navigate = useNavigate();
    const {code} = useParams();

    const closeModal = () => {
        setReady(false);
        navigate(`/learning/exam/${code}`)
    }

    const handleCancel = () => {
        setReady(false);
    }
    
    const testing = () => {
        setReady(true);
    }
    return <>
        <Modal title="Are you ready?" 
            open={ready}
            onOk={closeModal}
            onCancel={handleCancel}>
            <p>Hmmmmm.....................................</p>
        </Modal>
        <h3>{item?.summary}</h3>
        {description}
        <span>
            <TeamOutlined />&nbsp;&nbsp;&nbsp; {item?.attendences} attendences
        </span>
        <br />
        <span>
            <ClockCircleOutlined />&nbsp;&nbsp;&nbsp; {item?.countdown} minutes
        </span>
        <br />
        <span>
            <PartitionOutlined />&nbsp;&nbsp;&nbsp; {item?.parts.length} parts
        </span>
        <br />
        <span>
            <CommentOutlined />&nbsp;&nbsp;&nbsp; 500 comments
        </span>
        <br />
        <Button type="text" size="large" className="practice" onClick={testing}>PRACTICE</Button>
    </>
}

interface DataTypeTable {
    key: string;
    point: number;
    result: string;
    createTime: Date;
    duration: number;
    tag: string;
    link: string;
}

const SummaryExam: React.FC = () => {
    const {code} = useParams();
    const [info, setInfo] = useState();
    const [elements, setElements] = useState<CommentDTO[]>([]);
    const [contentCurrent, setContentCurrent] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [item, setItem] = useState<ExamDTO>();

    const handleChange = (e: any) => {
    }

    const handleSubmit = () => {
    }

    const loadAllExam: (data: MessageResponse<ExamDTO> | null) => void = (data) => {
        try {
            setItem(data?.data);

            console.log('data sumary', data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        ExamService.getExamByCode(code || '', loadAllExam);
    }, []);

    const columns: TableProps<DataTypeTable>['columns'] = [
        {
            title: 'ORD',
            dataIndex: 'key',
            key: 'key',
        },
        {
          title: 'Point',
          dataIndex: 'point',
          key: 'point',
          render: (text) => <p style={{fontWeight: "800"}}>{text}</p>,
        },
        {
          title: 'Result',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: 'Execution Time',
          dataIndex: 'duration',
          key: 'duration',
        },
        {
            title: 'Create Time',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
          title: 'Tag',
          key: 'tag',
          dataIndex: 'tag',
          render: (tag) => (
              <Tag color={'blue'}>
                {tag.toUpperCase()}
              </Tag>
          ),
        },
        {
          title: 'Link',
          dataIndex: 'link',
          key: 'link',
          render: (text) => <a>{text}</a>,
        }
      ];

    const data: DataTypeTable[] = [
        {
            key: '1',
            point: 100,
            result: '40/40',
            createTime: new Date(),
            duration: 3600,
            tag: 'nice',
            link: '/google'
        },
        {
            key: '2',
            point: 100,
            result: '40/40',
            createTime: new Date(),
            duration: 3600,
            tag: 'nice',
            link: '/google'
        }
      ];

    const ReactComponent = (element: string) => {
        return React.createElement('div', { dangerouslySetInnerHTML: { __html: element } });
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Examination Information',
            children: <ExaminationInfomation item={item}
                description={ReactComponent(item?.description || "")} />,
        },
        {
            key: '2',
            label: 'Answer',
            children: <div style={{margin: "0 auto"}}>
                <Button type="text" size="large" className="practice">VIEW ANSWER</Button>
            </div>,
        },
        {
            key: '3',
            label: 'History',
            children: <Table columns={columns} dataSource={data} />,
        }
    ];

    const onChange = (key: string) => {
        if(key == '3') {
            
        }
    };
    

    return <div className="summary-exam">
        <CommonNav title={"1232"} url_back="/exams" />
        <div className="main">
            <div className="info">
                <span className="tag">#{item?.skill}</span>
                <span className="tag">#{item?.type}</span>
                <h2>{item?.examName}</h2>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
            <div className="comment">
                <CommentCustom content={'comment chua fetch'} name={'Dam Tam Khoa'} avatar={''}
                    socket={undefined} comment_id={1} handle={() => { }} >
                    <CommentCustom content={'comment chua fetch'} name={'Dam Tam Khoa'} avatar={''}
                        socket={undefined} comment_id={1} handle={() => { }} >
                    </CommentCustom>
                </CommentCustom>
                <Comment
                //@ts-ignore
                    author={<a>{info?.fullname || ""}</a>}
                    avatar={
                        <Avatar
                        //@ts-ignore
                            src={info?.avatar || ""}
                            //@ts-ignore
                            alt={info?.fullname || ""}
                        />
                    }
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={contentCurrent}
                        />
                    }
                />
            </div>
        </div>
    </div>
}


export default SummaryExam;