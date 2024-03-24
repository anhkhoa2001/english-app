import { useParams } from "react-router-dom";
import { ExamHistoryDTO } from "../../../entity/props/ExamItemDTO";
import { MessageResponse } from "../../../entity/response/MessageResponse";
import { useEffect, useRef, useState } from "react";
import { ExamDTO } from "../../../entity/props/ExamDTO";
import { ExamService } from "../../../service/ExamService";
import CommonNav from "../courses/detail/CommonNav";
import './css/DetailExamComponent.scss';
import { TypeExam } from "../../../entity/Contants";
import ToeicComponent, { TypeQuestionItem } from "./types/TOEICComponent";
import THPTComponent from "./types/THPTComponent";

const viewTypes = ['view-result', 'view-answer']

const DeReviewExam: React.FC = () => {
    const {code} = useParams();
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const examCode = params.get('examCode');
    const [item, setItem] = useState<ExamDTO>(new ExamDTO([]));
    const totalQuestion = useRef<number>(0);


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

    const loadExamHistory: (data: MessageResponse<ExamHistoryDTO> | null) => void = (data) => {
        try {
            const json:string = data?.data.json || "";
            const itemHis:ExamDTO = JSON.parse(json);
            console.log('history data', itemHis);
            totalQuestion.current = itemHis.totalQuestion;
            setItem(itemHis);
        } catch (error) {
            console.log('error', error);
        }
    }

    const loadExam: (data: MessageResponse<ExamDTO> | null) => void = (data) => {
        try {
            setItem(data?.data || new ExamDTO([]));
            totalQuestion.current = data?.data.totalQuestion || 0;
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        if(type == viewTypes[0]) {
            ExamService.getExamHistoryById({
                historyId: Number(code)
            }, loadExamHistory);
        } else {
            ExamService.getExamByCode(code || '', loadExam);
        }
    }, [type, code]);


    return <div className="detail-exam">
        <CommonNav title={item?.examName || ""} url_back={`/exam/${examCode}`} />
        <div className="content-exam">
            <div className="questions">
                {
                    item?.type == TypeExam.TOEIC ? 
                    <ToeicComponent parts={item?.parts || []} indexTab={indexTab} type={type || ""}/> 
                    : 
                    <THPTComponent parts={item?.parts || []} /> 
                }
            </div>
            <div className="overview">
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

export default DeReviewExam;
