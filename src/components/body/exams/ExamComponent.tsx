import { Avatar, Checkbox, CheckboxProps, Collapse, Modal, Pagination } from 'antd';
import TitleComponent from '../TitleComponent';
import './css/ExamComponent.scss'
import { CollapseProps } from 'antd/lib';
import { Comment } from '@ant-design/compatible';
import { ExamItemDTO } from '../../../entity/props/ExamItemDTO';
import { Link, useNavigate } from 'react-router-dom';
import { TypeExam } from '../../../entity/Contants';
import { useEffect, useRef, useState } from 'react';
import { ExamDTO } from '../../../entity/props/ExamDTO';
import { ModalCustom } from '../../exception/SuccessModal';
import { ExamService } from '../../../service/ExamService';
import { DataResponse, MessageResponse } from '../../../entity/response/MessageResponse';
import { typeExams } from '../management/form/ExamForm';
import { useToken } from '../../../context/TokenProvider';

class ExamRequest {
    page: number;
    pageSize: number;
    skills: string[];
    types: string[];

    constructor() {
        this.page = 1;
        this.pageSize = 10;
    }
}


const CHECK_LOGIN = "CHECK_LOGIN";
const JOIN_EXAM = "JOIN_EXAM";
const map = new Map();
map.set(CHECK_LOGIN, false);
map.set(JOIN_EXAM, false);

const ExamComponent: React.FC = () => {

    const request = useRef<ExamRequest>(new ExamRequest());
    const [exams, setExams] = useState<DataResponse<ExamDTO[]>>();
    const examCode = useRef<string>("");
    const obj = useToken();
    const [onModel, setOnModel] = useState(map);
    const navigate = useNavigate();

    const onChangeSkill= (e: any, value: string) => {
        var skills:string[] = request.current.skills || [];
        if(e.target.checked) {
            request.current.skills = [...skills, value];
        } else {
            var index = skills.indexOf(value);
            if (index !== -1) {
                skills.splice(index, 1);
                request.current.skills = skills;
            }
        }

        ExamService.getAllExamByCondition(request.current, loadAllExam);
    };

    const onChangeType = (e: any, value: string) => {
        var types:string[] = request.current.types || [];
        if(e.target.checked) {
            request.current.types = [...types, value];
        } else {
            var index = types.indexOf(value);
            if (index !== -1) {
                types.splice(index, 1);
                request.current.types = types;
            }
        }

        ExamService.getAllExamByCondition(request.current, loadAllExam);
    };


    const loadAllExam: (data: MessageResponse<DataResponse<ExamDTO[]>> | null) => void = (data) => {
        try {
            setExams(data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        ExamService.getAllExamByCondition(request.current, loadAllExam);
    }, []);


    const skills = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeSkill(e, 'Listening')}>Listening</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeSkill(e, 'Writing')}>Writing</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeSkill(e, 'Reading')}>Reading</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeSkill(e, 'Speaking')}>Speaking</Checkbox>
        </>
    ];

    const types = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeType(e, typeExams[0])}>Exam TOEIC</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeType(e, typeExams[1])}>Exam Ielts</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={(e) => onChangeType(e, typeExams[2])}>Exam THPTQG</Checkbox>
        </>
    ];

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Skill',
            children: skills,
        },
        {
            key: '2',
            label: 'Exam Type',
            children: types,
        }
    ];


    // const exams: ExamItemDTO[] = [
    //     {
    //         title: "TOEIC New Economy",
    //         author: {
    //             fullname: "Dam Tam Khoa",
    //             role: "STUDENT",
    //             avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    //         },
    //         summary: "The latest TOEIC format standard test set comes with full answers and explanations. Practice TOEIC New Economy in detail step by step, handling all types of problems and important tips every student should memorize before taking the test",
    //         code: "TOEIC001",
    //         type: TypeExam.TOEIC,
    //         image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
    //     },
    //     {
    //         title: "[2022-2023] Cụm trường phía Nam Hưng Yên - Đề thi thử tốt nghiệp THPT môn Tiếng Anh năm 2022-2023",
    //         author: {
    //             fullname: "Dam Tam Khoa",
    //             role: "STUDENT",
    //             avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    //         },
    //         summary: "",
    //         code: "THPT002",
    //         type: 1,
    //         image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
    //     },
    //     {
    //         title: "TOEIC New Economy",
    //         author: {
    //             fullname: "Dam Tam Khoa",
    //             role: "STUDENT",
    //             avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    //         },
    //         summary: "The latest TOEIC format standard test set comes with full answers and explanations. Practice TOEIC New Economy in detail step by step, handling all types of problems and important tips every student should memorize before taking the test",
    //         code: "TOEIC004",
    //         type: 0,
    //         image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
    //     },
    //     {
    //         title: "TOEIC New Economy",
    //         author: {
    //             fullname: "Dam Tam Khoa",
    //             role: "STUDENT",
    //             avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    //         },
    //         summary: "The latest TOEIC format standard test set comes with full answers and explanations. Practice TOEIC New Economy in detail step by step, handling all types of problems and important tips every student should memorize before taking the test",
    //         code: "TOEIC005",
    //         type: 0,
    //         image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
    //     }
    // ];


    const openNoti = (code: string) => {
        examCode.current = code;
        if(!obj?.isLogined) {
            map.set(CHECK_LOGIN, true);
            const newMap = new Map(map);
            setOnModel(newMap);
        } else {
            map.set(JOIN_EXAM, true);
            const newMap = new Map(map);
            setOnModel(newMap);
        }
    }

    const closeModal = (key: string) => {
        if(key === JOIN_EXAM) {
            navigate(`/exam/${examCode.current}`);
        } else if(key === CHECK_LOGIN) {
            navigate(`/login`);
        }
        map.set(key, false);
        const newMap = new Map(map);
        setOnModel(newMap);
    }

    const handleCancel = (key: string) => {
        map.set(key, false);
        const newMap = new Map(map);
        setOnModel(newMap);
    }
    

    return <>
        <TitleComponent type="All Examinations" count_results={exams?.totalRecord || 0} display={true} />
        <div className="exam">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']} />
            </div>
            <div className="right">
                {Array.from({ length: exams?.data.length || 0 }, (_, i) =>
                    <div className="exam-item" onClick={() => openNoti(exams?.data[i].examCode || "")}>
                        <img className="item-image" src={exams?.data[i].thumbnail} alt="" />
                        <div className='item-detail'>
                            <h2>{exams?.data[i].examName}</h2>
                            <p>{exams?.data[i].summary}</p>
                        </div>
                        <Comment
                            author={exams?.data[i].author.fullname}
                            avatar={
                                <Avatar
                                    src={exams?.data[i].author.avatar}
                                    alt={exams?.data[i].author.fullname}
                                />
                            }
                            content={''}
                        />
                    </div>
                    // <Link to={`/learning/exam/${exams?.data[i].examCode}?type=${exams?.data[i].type}`} key={i}>
                    //     <div className="exam-item">
                    //         <img className="item-image" src={exams?.data[i].thumbnail} alt="" />
                    //         <div className='item-detail'>
                    //             <h2>{exams?.data[i].examName}</h2>
                    //             <p>{exams?.data[i].summary}</p>
                    //         </div>
                    //         <Comment
                    //             author={exams?.data[i].author.fullname}
                    //             avatar={
                    //                 <Avatar
                    //                     src={exams?.data[i].author.avatar}
                    //                     alt={exams?.data[i].author.fullname}
                    //                 />
                    //             }
                    //             content={''}
                    //         />
                    //     </div>
                    // </Link>
                )}
                <Modal title="Do you want to join this examination?" 
                    open={map.get(JOIN_EXAM)}
                    onOk={() => closeModal(JOIN_EXAM)}
                    onCancel={() => handleCancel(JOIN_EXAM)}>
                    <p>Hmmmmm.....................................</p>
                </Modal>
                <Modal title="Please log in to join the examination?" 
                    open={map.get(CHECK_LOGIN)}
                    onOk={() => closeModal(CHECK_LOGIN)}
                    onCancel={() => handleCancel(CHECK_LOGIN)}>
                    <p>Hmmmmm.....................................</p>
                </Modal>
                <div className='paging'>
                    <Pagination
                        onChange={() => { console.log('123') }}
                        total={exams?.totalRecord}
                        pageSize={2}
                    />
                </div>
            </div>
        </div>
    </>

}


export default ExamComponent;