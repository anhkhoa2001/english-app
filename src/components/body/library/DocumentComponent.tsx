import { Avatar, Checkbox, CheckboxProps, Collapse, CollapseProps, Image, Pagination } from "antd";
import TitleComponent from "../TitleComponent";
import './css/LibraryComponent.scss';
import { Comment } from "@ant-design/compatible";
import { useEffect, useRef, useState } from "react";
import { DocumentDTO } from "../../../entity/props/DocumentDTO";
import { DataResponse, MessageResponse } from "../../../entity/response/MessageResponse";
import DocumentService from "../../../service/DocumentService";
import moment from "moment";
import DetailDocComponent from "./DetailDocComponent";


interface Request {
    page: number;
    pageSize: number;
    skill?: string[];
    topic?: string[];
}

const skillsTemplate = ['Listening', 'Writing', 'Speaking', 'Reading'];
const topicsTemplate = ['TOEIC', 'IELTS', 'THPT', 'VSTEP', 'APTIS'];

const DocumentComponent: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentDTO[]>([]);
    const totalRecord = useRef<number>(0);
    const pagination = useRef<Request>({
        page: 1,
        pageSize: 10
    });
    const [skillRequest, setSkillRequest] = useState<string[]>([]);
    const [topicRequest, setTopicRequest] = useState<string[]>([]);
    const [onDisplay, setOnDisplay] = useState<boolean>(false);
    const docRef = useRef<DocumentDTO>();

    const getAll: (data: MessageResponse<DataResponse<DocumentDTO[]>> | null) => void = (data) => {
        try {
            setDocuments(data?.data.data || []);
            totalRecord.current = data?.data.totalRecord || 0;
            setOnDisplay(false);
            console.log('data document', data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        DocumentService.getAllPublicDocument(pagination.current, getAll);
    }, []);



    const onChangeTopic = (e: any, key: string) => {
        key = key.toLocaleLowerCase();
        var cpy = topicRequest;
        if (e.target.checked) {
            cpy.push(key);
        } else {
            cpy = cpy.filter(item => item !== key);
        }
        console.log('cpy', cpy);
        setTopicRequest(cpy);
        pagination.current.topic = cpy;
        DocumentService.getAllPublicDocument(pagination.current, getAll);
    };

    const onChangeSkill = (e: any, key: string) => {
        key = key.toLocaleLowerCase();
        var cpy = skillRequest;
        if (e.target.checked) {
            cpy.push(key);
        } else {
            cpy = cpy.filter(item => item !== key);
        }
        console.log('cpy', cpy);
        setSkillRequest(cpy);
        pagination.current.skill = cpy;
        DocumentService.getAllPublicDocument(pagination.current, getAll);
    };

    const onChangeCollapse = (key: string | string[]) => {
        console.log(key);
    };

    const topics = topicsTemplate.map(t => {
        return <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeTopic(e, t)}>{t}</Checkbox>
    });

    const skills = skillsTemplate.map(t => {
        return <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeSkill(e, t)}>{t}</Checkbox>
    });

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Topic',
            children: topics,
        },
        {
            key: '2',
            label: "Skills",
            children: skills,
        }
    ];

    const onChangeContentDoc = (index: number, url: string) => {
        docRef.current = documents[index];
        setOnDisplay(true);
        window.open(url, '_blank');
    }

    return <div className="udemy ">
        <TitleComponent type="Documents" count_results={totalRecord.current} display={true} />
        <div className="library">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']}
                    onChange={onChangeCollapse} />
            </div>
            <div className="right">
                {
                    onDisplay ?
                        <DetailDocComponent item={docRef.current}/>
                        :
                        <>
                            {Array.from({ length: documents.length }, (_, i) =>
                                <div className="library-item" key={i}>
                                    <div style={{ textAlign: "center" }}>
                                        <Image className="item-image"
                                            width={200}
                                            height={200}
                                            src={documents[i].thumbnail}
                                        />
                                    </div>
                                    <div className='item-detail' >
                                        <h2 onClick={() => onChangeContentDoc(i, documents[i].link)}>{documents[i].documentName}</h2>
                                        <p>{documents[i].summary}</p>
                                    </div>
                                    <Comment
                                        author={<a>{documents[i].author.fullname}</a>}
                                        avatar={
                                            <Avatar
                                                src={documents[i].author.avatar}
                                                alt={documents[i].author.fullname}
                                            />
                                        }
                                        content={moment(documents[i].createAt).format('DD-MM-YYYY')}
                                    />
                                </div>
                            )}

                            <div className='paging'>
                                <Pagination
                                    onChange={() => { console.log('123') }}
                                    total={documents.length / 3}
                                    pageSize={3}
                                />
                            </div>
                        </>
                }
            </div>
        </div>
    </div>
}


export default DocumentComponent;