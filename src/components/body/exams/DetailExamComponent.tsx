import { useParams, useSearchParams } from "react-router-dom";
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

    // const deadline = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 30;

    const onFinish: CountdownProps['onFinish'] = () => {
        setIsModalOpen(true);


    };


      const questions:{
        type: number,
        data: MultiChoiceProp[]
    }[] = [{
        type: 1,
        data : [
            {
                type: 1,
                index: 1,
                content: <img src="https://study4.com/media/ets2023/img/1/image15.png" alt="" />,
                questionChilds: [
                    {
                        type: 0,
                        index: 1,
                        content: "",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    },
                    {
                        type: 0,
                        index: 2,
                        content: "",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    },
                    {
                        type: 0,
                        index: 3,
                        content: "",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    }
                ],
                answers: [],
                hint: ""
            },
            {
                type: 1,
                index: 5,
                content: <>
                    <p>Travelling around Thailand in the 1990s, William Janssen was impressed with the basic rooftop solar heating systems that were on many homes, where energy from the sun was absorbed by a plate and then used to heat water for the home. Two decades later Janssen developed that basic idea he saw in south-east Asia into a portable device that uses the power from the sun to purify water.</p>
                    <p>The Desolenator operates as a mobile desalination unit that can take water from different places, such as the sea, rivers, boreholes, and rain, and purify <strong><u>it</u></strong> for human consumption. It is particularly valuable in regions where natural groundwater reserves have been polluted, or where seawater is the only water source available. Janssen saw that there was a need for a sustainable way to clean water for both the developing and the developed countries when he moved to the United Arab Emirates and saw large-scale water processing.</p>
                    <p>The Desolenator can produce 15 liters of drinking water per day, enough to sustain a family for cooking and drinking. Its main <strong><u>selling point</u></strong> is that unlike standard desalination techniques, it doesn't require a generated power supply; just sunlight. It measures 120 cm by 90 cm, and it's easy to transport, thanks to its two wheels. Water enters through a pipe and flows as a thin film between a sheet of double glazing and the surface of a solar panel, where it is heated by the sun. The warm water flows into a small boiler (heated by a solar-powered battery) where it is converted to steam. When the steam cools, it becomes <strong><u>distilled</u></strong> water. The device has a very simple filter to trap particles, and this can easily be shaken to remove them. A recent analysis found that at least two- thirds of the world's population lives with severe water scarcity for at least a month every year. Janssen says that by 2030 half of the world's population will be living with water stress - where the demand exceeds the supply over a certain period of time. It is really important that a sustainable solution is brought to the market that is able to help these people,' he says. 'Many countries don't have the money for desalination plants, which are very expensive to build. They don't have the money to operate them, they are very maintenance intensive, and they don't have the money to buy the diesel to run the desalination plants, so it is a really bad situation."</p>
                    <p>(Adapted from Cambridge English IELTS Academic 15 by Cambridge University Press)​</p>
                </>,
                questionChilds: [
                    {
                        type: 0,
                        index: 4,
                        content: "According to paragraph 1, what did Janssen do after his trip to Thailand?",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    },
                    {
                        type: 0,
                        index: 5,
                        content: "The word \"it\" in paragraph 2 refers to_________.",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    },
                    {
                        type: 0,
                        index: 6,
                        content: "Which best serves as the title for the passage?",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    }
                ],
                answers: [],
                hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
            }
        ]
    },
    {
        type: 1,
        data : [
            {
                type: 1,
                index: 5,
                content: <>
                    <p>Travelling around Thailand in the 1990s, William Janssen was impressed with the basic rooftop solar heating systems that were on many homes, where energy from the sun was absorbed by a plate and then used to heat water for the home. Two decades later Janssen developed that basic idea he saw in south-east Asia into a portable device that uses the power from the sun to purify water.</p>
                    <p>The Desolenator operates as a mobile desalination unit that can take water from different places, such as the sea, rivers, boreholes, and rain, and purify <strong><u>it</u></strong> for human consumption. It is particularly valuable in regions where natural groundwater reserves have been polluted, or where seawater is the only water source available. Janssen saw that there was a need for a sustainable way to clean water for both the developing and the developed countries when he moved to the United Arab Emirates and saw large-scale water processing.</p>
                    <p>The Desolenator can produce 15 liters of drinking water per day, enough to sustain a family for cooking and drinking. Its main <strong><u>selling point</u></strong> is that unlike standard desalination techniques, it doesn't require a generated power supply; just sunlight. It measures 120 cm by 90 cm, and it's easy to transport, thanks to its two wheels. Water enters through a pipe and flows as a thin film between a sheet of double glazing and the surface of a solar panel, where it is heated by the sun. The warm water flows into a small boiler (heated by a solar-powered battery) where it is converted to steam. When the steam cools, it becomes <strong><u>distilled</u></strong> water. The device has a very simple filter to trap particles, and this can easily be shaken to remove them. A recent analysis found that at least two- thirds of the world's population lives with severe water scarcity for at least a month every year. Janssen says that by 2030 half of the world's population will be living with water stress - where the demand exceeds the supply over a certain period of time. It is really important that a sustainable solution is brought to the market that is able to help these people,' he says. 'Many countries don't have the money for desalination plants, which are very expensive to build. They don't have the money to operate them, they are very maintenance intensive, and they don't have the money to buy the diesel to run the desalination plants, so it is a really bad situation."</p>
                    <p>(Adapted from Cambridge English IELTS Academic 15 by Cambridge University Press)​</p>
                </>,
                questionChilds: [
                    {
                        type: 0,
                        index: 7,
                        content: "According to paragraph 1, what did Janssen do after his trip to Thailand?",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    },
                    {
                        type: 0,
                        index: 8,
                        content: "The word \"it\" in paragraph 2 refers to_________.",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    },
                    {
                        type: 0,
                        index: 9,
                        content: "Which best serves as the title for the passage?",
                        answers: [
                            {
                                key: "A",
                                value: "locate"
                            },
                            {
                                key: "B",
                                value: "located"
                            },
                            {
                                key: "C",
                                value: "locating"
                            }
                        ],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                    }
                ],
                answers: [],
                hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
            },
            {
                type: 0,
                index: 5,
                content: <>
                    <p>Travelling around Thailand in the 1990s, William Janssen was impressed with the basic rooftop solar heating systems that were on many homes, where energy from the sun was absorbed by a plate and then used to heat water for the home. Two decades later Janssen developed that basic idea he saw in south-east Asia into a portable device that uses the power from the sun to purify water.</p>
                    <p>The Desolenator operates as a mobile desalination unit that can take water from different places, such as the sea, rivers, boreholes, and rain, and purify <strong><u>it</u></strong> for human consumption. It is particularly valuable in regions where natural groundwater reserves have been polluted, or where seawater is the only water source available. Janssen saw that there was a need for a sustainable way to clean water for both the developing and the developed countries when he moved to the United Arab Emirates and saw large-scale water processing.</p>
                    <p>The Desolenator can produce 15 liters of drinking water per day, enough to sustain a family for cooking and drinking. Its main <strong><u>selling point</u></strong> is that unlike standard desalination techniques, it doesn't require a generated power supply; just sunlight. It measures 120 cm by 90 cm, and it's easy to transport, thanks to its two wheels. Water enters through a pipe and flows as a thin film between a sheet of double glazing and the surface of a solar panel, where it is heated by the sun. The warm water flows into a small boiler (heated by a solar-powered battery) where it is converted to steam. When the steam cools, it becomes <strong><u>distilled</u></strong> water. The device has a very simple filter to trap particles, and this can easily be shaken to remove them. A recent analysis found that at least two- thirds of the world's population lives with severe water scarcity for at least a month every year. Janssen says that by 2030 half of the world's population will be living with water stress - where the demand exceeds the supply over a certain period of time. It is really important that a sustainable solution is brought to the market that is able to help these people,' he says. 'Many countries don't have the money for desalination plants, which are very expensive to build. They don't have the money to operate them, they are very maintenance intensive, and they don't have the money to buy the diesel to run the desalination plants, so it is a really bad situation."</p>
                    <p>(Adapted from Cambridge English IELTS Academic 15 by Cambridge University Press)​</p>
                </>,
                answers: [
                    {
                        key: "A",
                        value: "locate"
                    },
                    {
                        key: "B",
                        value: "located"
                    },
                    {
                        key: "C",
                        value: "locating"
                    }
                ],
                hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
            }
        ]
    }
];


    const getCountdown = (c:number) => {
        return Date.now() + 1000 * 60 * c;
    }

    const loadAllExam: (data: MessageResponse<ExamDTO> | null) => void = (data) => {
        try {
            setItem(data?.data);
            setCountdown(getCountdown(1));
            totalQuestion.current = data?.data.totalQuestion || 0;
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        ExamService.getExamByCode(code || '', loadAllExam);
    }, []);

    // const structuralQuestion = questions.map((item, index) => {
    //     var total = 0;
    //     var listIndexQuestion:Array<Number | undefined> = [] ;
    //     item.data.forEach(i => {
    //         if(i.type == 0) {
    //             total++;
    //             listIndexQuestion.push(i.index);
    //         } else {
    //             total += i.questionChilds?.length || 0;
    //             var tmp:Array<Number | undefined>  = i.questionChilds?.map(e => {return Number(e.index)}) || [];
    //             listIndexQuestion = [...listIndexQuestion , ...tmp]
    //         }
            
    //     }); 
    //     totalQuestion += total;
    //     return {
    //         part: index + 1,
    //         total: total,
    //         listIndexQuestion: listIndexQuestion
    //     };
    // });
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
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
                <Countdown title="Time remaining: " value={countdown} onFinish={onFinish} />
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