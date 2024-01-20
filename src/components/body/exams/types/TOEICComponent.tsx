import { Tabs, TabsProps } from "antd";
import React from "react";
import ReactAudioPlayer from "react-audio-player";
import '../css/ToeicComponent.scss'
import MultiChoice from "../questions/MultiChoice";
import MultiChoiceGroup from "../questions/MultiChoiceGroup";
import { MultiChoiceProp } from "../../../../entity/props/MultiChoiceProp";

const TypeQuestion = {
    SINGLE: 0,
    GROUP: 1
}


const ToeicComponent: React.FC = () => {
    const questions:{
        type: number,
        part: number,
        data: MultiChoiceProp[]
    }[] = [{
        type: 0,
        part: 1,
        data : [
            {
                type: 1,
                index: 1,
                containImage: true,
                content: "https://study4.com/media/ets2023/img/1/image15.png",
                questionChilds: [
                    {
                        type: 0,
                        index: 1,
                        containImage: true,
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
                type: 0,
                index: 4,
                containImage: false,
                content: "As soon as James started working, he realized that his decision had not been a good one.",
                answers: [
                    {
                        key: "A",
                        value: "To request a ticket change"
                    },
                    {
                        key: "B",
                        value: "To request a ticket change"
                    },
                    {
                        key: "C",
                        value: "To request a ticket change"
                    },
                    {
                        key: "D",
                        value: "To request a ticket change"
                    }
                ],
                questionChilds: [],
                hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
            }, 
            {
                type: 0,
                index: 5,
                containImage: true,
                content: "https://study4.com/media/ets2023/img/1/image3.png",
                answers: [
                    {
                        key: "A",
                        value: "To request a ticket change"
                    },
                    {
                        key: "B",
                        value: "To request a ticket change"
                    },
                    {
                        key: "C",
                        value: "To request a ticket change"
                    },
                    {
                        key: "D",
                        value: "To request a ticket change"
                    }
                ],
                questionChilds: [],
                hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
            }
        ]
    }];



    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = questions.map((item, index) => {
        const result = {
            key: index + 1 + '',
            label: `Part ${item.part}`,
            children: <>
                {Array.from({ length: item.data.length }, (_, i) => (
                     item.data[i].type == TypeQuestion.SINGLE ? 
                     <MultiChoice prop={item.data[i]} /> 
                     : 
                     <MultiChoiceGroup 
                     content={item.data[i].content} 
                     questionChilds={item.data[i].questionChilds || []} 
                     containImage={item.data[i].containImage}/>
                ))} 
            </>
        }  
        return result;
    });


    return <div className="toeic-exam">
        <ReactAudioPlayer
            src="https://res.cloudinary.com/dwqrocbjv/video/upload/v1705736176/n2h9iwja4gbev1ttkdg4.mp3"
            autoPlay
            controls
        />
        <Tabs className="tab-list" defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
}


export default ToeicComponent;