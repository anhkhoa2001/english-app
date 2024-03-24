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
import { ExamHistoryDTO } from "../../../entity/props/ExamItemDTO";
import moment from "moment";

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
    const [examHistories, setExamHistories] = useState<ExamHistoryDTO[]>([]);

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


    const loadAllExamHistory: (data: MessageResponse<ExamHistoryDTO[]> | null) => void = (data) => {
        try {
            setExamHistories(data?.data || []);
            console.log('data exam history', data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        ExamService.getExamByCode(code || '', loadAllExam);
    }, []);

    function secondsToTime(seconds: number) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var remainingSeconds = seconds % 60;
        
        var timeString = '';
        
        if (hours > 0) {
            timeString += hours + " hour ";
        }
        
        if (minutes > 0) {
            timeString += minutes + " minute ";
        }
        
        if (remainingSeconds > 0 || timeString === '') {
            timeString += remainingSeconds + " second";
        }
        
        return timeString;
    }

    function getTagByResult(result: string) {
        console.log('get tag', result);
        const total = Number(result.split('/')[1]);
        const doit = Number(result.split('/')[0]);
        var tag;
        if(doit / total == 1) {
            tag = <Tag color={'green'}>
                    {'master'.toUpperCase()}
                </Tag>;
        } else if(doit / total == 0) {
            tag = <Tag color={'red'}>
                {'bad'.toUpperCase()}
            </Tag>;
        } else if(doit / total < 0.5) {
            tag = <Tag color={'orange'}>
                {'stable'.toUpperCase()}
            </Tag>;
        } else {
            tag = <Tag color={'yellow'}>
                {'good'.toUpperCase()}
            </Tag>;
        }

        return tag;
    }

    const columns: TableProps<ExamHistoryDTO>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'historyId',
            key: 'historyId',
        },
        {
          title: 'Result',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: 'Execution Time',
          dataIndex: 'executeTime',
          key: 'executeTime',
          render: (time) => <p>{secondsToTime(time)}</p>
        },
        {
            title: 'Create Time',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (time) => <p>{moment(time, 'x').format('DD-MM-YYYY HH:mm:ss')}</p>
        },
        {
          title: 'Tag',
          key: 'result',
          dataIndex: 'result',
          render: (tag) => <>{getTagByResult(tag)}</>,
        },
        {
          title: 'Link',
          dataIndex: 'historyId',
          key: 'historyId',
          render: (text) => <a target="_blank" href={`/review/exam/${text}?type=view-result&examCode=${code}`}>{'View'}</a>,
        }
      ];

    const ReactComponent = (element: string) => {
        return React.createElement('div', { dangerouslySetInnerHTML: { __html: element } });
    };

    const openViewAnswer = () => {
        window.open(`/review/exam/${code}?type=view-answer&examCode=${code}`, '_blank');
    }

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
                <Button type="text" size="large" className="practice" onClick={openViewAnswer}>VIEW ANSWER</Button>
            </div>,
        },
        {
            key: '3',
            label: 'History',
            children: <Table columns={columns} dataSource={examHistories} />,
        }
    ];

    const onChange = (key: string) => {
        if(key == '3') {
            ExamService.getExamHistoryByExamCode({
                examCode: code
            }, loadAllExamHistory);
        }
    };
    

    return <div className="summary-exam">
        <CommonNav title={item?.examName || ""} url_back="/exams" />
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