import { Tabs, TabsProps } from "antd";
import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import ReactAudioPlayer from "react-audio-player";
import '../css/ToeicComponent.scss'
import MultiChoice from "../questions/MultiChoice";
import MultiChoiceGroup from "../questions/MultiChoiceGroup";
import { ExamPartDTO } from "../../../../entity/props/ExamDTO";

export const TypeQuestionItem = {
    SINGLE: 'Single',
    GROUP: 'Group'
}

const ToeicComponent: React.FC<{parts: ExamPartDTO[], indexTab: string, type?: string}> = ({parts, indexTab, type}) => {
    const [index, setIndex] = useState(indexTab);

    useEffect(() => {
        setIndex(indexTab)
    } , [indexTab])

    let start = 1;
    const items: TabsProps['items'] = parts.map((item, index) => {
        const result = {
            key: index + 1 + '',
            label: `Part ${index + 1}`,
            children: <>
                {
                    item.questions.map(i => {
                        if(i.type == TypeQuestionItem.SINGLE) {
                            start = start + 1;
                            return <MultiChoice prop={i} start={start - 1} type={type} /> 
                        } else {
                            start = start + i.questionChilds.length;
                            return <MultiChoiceGroup 
                                    content={i.content} 
                                    questionChilds={i.questionChilds || []} 
                                    start = {start - i.questionChilds.length}
                                    type={type}
                                    />
                        }
                    })
                }
            </>
        }  
        return result;
    });


    return <div className="toeic-exam">
        <ReactAudioPlayer
            src="https://res.cloudinary.com/dwqrocbjv/video/upload/v1705736176/n2h9iwja4gbev1ttkdg4.mp3"
            autoPlay={false}
            controls
        />
        <Tabs className="tab-list" activeKey={index} items={items} onChange={(e) => setIndex(e)}/>
    </div>
}


export default ToeicComponent;