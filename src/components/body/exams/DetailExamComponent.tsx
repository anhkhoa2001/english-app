import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import CommonNav from "../courses/detail/CommonNav";
import './css/DetailExamComponent.scss'
import { TypeExam, TypeQuestion } from "../../../entity/Contants";
import ToeicComponent, { TypeQuestionItem } from "./types/TOEICComponent";
import { Button, CountdownProps, Modal, Statistic } from "antd";
import { MultiChoiceProp } from "../../../entity/props/MultiChoiceProp";
import THPTComponent from "./types/THPTComponent";
import { useEffect, useRef, useState } from "react";
import { ExamDTO } from "../../../entity/props/ExamDTO";
import { MessageResponse } from "../../../entity/response/MessageResponse";
import { ExamService } from "../../../service/ExamService";

const { Countdown } = Statistic;

const DetailExamComponent: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {code} = useParams();
    const [item, setItem] = useState<ExamDTO>();
    const [countdown, setCountdown] = useState(1);
    const type: number = Number(searchParams.get('type'));
    const totalQuestion = useRef<number>(0);
    const [pause, setPause] = useState<boolean>(true);
    const navigate = useNavigate();

    // const deadline = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 30;

    const getCountdown = (c:number) => {
        return Date.now() + 1000 * 60 * c;
    }

    const loadAllExam: (data: MessageResponse<ExamDTO> | null) => void = (data) => {
        try {
            setItem(data?.data);
            setCountdown(getCountdown(data?.data.countdown || 0));
            totalQuestion.current = data?.data.totalQuestion || 0;
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        ExamService.getExamByCode(code || '', loadAllExam);
    }, []);

    const [indexTab, setIndexTab] = useState('1');

    const onChangeQuestion = (index: number) => {
        console.log('change question', index);
        const parts = item?.parts || [];
        var total = 0;

        for(var i=0; i<parts.length; i++) {

            for(const q of parts[i].questions) {
                if(q.type == TypeQuestionItem.SINGLE) {
                    total += 1;
                } else {
                    total += q.questionChilds.length;
                }
                console.log('index total', index , total, i) ;
                if(index <= total) {
                    setIndexTab((i + 1) + '');
                    return;
                }
            }
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toExamine: (data: MessageResponse<string> | null) => void = (data) => {
        try {
            navigate("/exams");
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleOk = () => {
        const request = {
            exam: item,
            executeTime: getExecuteTime(),
            examCode: code
        }

        ExamService.toExamine(request, toExamine);
    };

    const handleCancel = () => {
    };


    const getExecuteTime = () => {
        const totalTime = getCountdown(item?.countdown || 0);
        const remainTime = totalTime - countdown;

        return Math.round(remainTime/1000);
    }

    const onFinish: CountdownProps['onFinish'] = () => {
        setIsModalOpen(true);
        setPause(false);
    };

    return <div className="detail-exam">
        <CommonNav title={item?.examName || ""} url_back="/exams" />
        <Modal title="COMPLETE THE EXAM" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        cancelButtonProps={{ style: {display: 'none'} }}>
            <p>You have completed the exam!! Please return to the home page to see the results.</p>
        </Modal>
        <div className="content-exam">
            <div className="questions">
                {
                    item?.type == TypeExam.TOEIC ? 
                    <ToeicComponent parts={item?.parts || []} indexTab={indexTab}/> 
                    : 
                    <>
                    </>
                }
            </div>
            <div className="overview">
                {
                    pause && <Countdown title="Time remaining: " value={countdown} onFinish={onFinish}/>
                }
                <Button className="submit" size="middle" onClick={onFinish}>Submit Form</Button>
                <p>
                    <i>
                        <b>Note: you can click on the question number in the article to mark the review</b>
                    </i>
                </p>
                <h1>Question List</h1>
                <div className="question-list">
                    {Array.from({ length: totalQuestion.current }, (_, i) => (
                        <a href={`#question-${i + 1}`} onClick={() => onChangeQuestion(i + 1)} key={i}>
                            <span className="item" key={i}>{i + 1}</span>
                        </a>
                    ))}
                </div>
           </div>
        </div>
    </div>
}


export default DetailExamComponent;