import { Avatar, Button, Modal, Table, Tabs, TabsProps, Tag } from "antd";
import CommonNav from "../courses/detail/CommonNav";
import './css/SummaryExam.scss';
import { ClockCircleOutlined, CommentOutlined, PartitionOutlined, TeamOutlined } from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";
import CommentCustom, { Editor } from "../comment/CommentCustom";
import { useState } from "react";
import { CommentDTO } from "../../../entity/props/Socket";
import { TableProps } from "antd/lib";
import { useNavigate, useParams } from "react-router-dom";

const types = ['TOEIC', 'Academy'];

const ExaminationInfomation: React.FC<{ summary: string, description: React.ReactNode }> = ({ summary, description }) => {
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
        <h3>{summary}</h3>
        {description}
        <span>
            <TeamOutlined />&nbsp;&nbsp;&nbsp; 100 attendences
        </span>
        <br />
        <span>
            <ClockCircleOutlined />&nbsp;&nbsp;&nbsp; 40 minutes
        </span>
        <br />
        <span>
            <PartitionOutlined />&nbsp;&nbsp;&nbsp; 4 parts
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
    const [info, setInfo] = useState();
    const [elements, setElements] = useState<CommentDTO[]>([]);
    const [contentCurrent, setContentCurrent] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: any) => {
    }

    const handleSubmit = () => {
    }

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

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Examination Information',
            children: <ExaminationInfomation summary="A practical programming course for office workers, academics, and administrators who want to improve their productivity."
                description={<>
                    <p>Bộ đề có cấu trúc sát nhất với bài thi TOEIC thực chiến. Luyện đề TOEIC Hacker 2 để nắm trọn mọi dạng bài. &nbsp;Luyện đề cùng đáp án và giải thích chi tiết.</p><p><strong>&gt;&gt;&gt; Hiện tại, phần giải thích đáp án đang được thầy cô Prep gấp rút hoàn thiện và cập nhật lên hệ thống trong thời gian tới. Prep sẽ tiếp tục cập nhật vào kho đề, các bạn hãy yên tâm chăm chỉ ôn luyện nhé !</strong></p>
                </>} />,
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
        console.log(key);
    };
    

    return <div className="summary-exam">
        <CommonNav title={"1232"} url_back="/exams" />
        <div className="main">
            <div className="info">
                {
                    types.map(t => {
                        return <span className="tag">#{t}</span>;
                    })
                }
                <h2>IELTS Simulation Listening test 1</h2>
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