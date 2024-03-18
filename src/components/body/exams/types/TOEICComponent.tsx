import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import '../css/ToeicComponent.scss'
import MultiChoice from "../questions/MultiChoice";
import MultiChoiceGroup from "../questions/MultiChoiceGroup";
import { MultiChoiceProp } from "../../../../entity/props/MultiChoiceProp";
import { ExamPartDTO } from "../../../../entity/props/ExamDTO";

const TypeQuestion = {
    SINGLE: 'Single',
    GROUP: 'Group'
}

const ToeicComponent: React.FC<{parts: ExamPartDTO[], indexTab: string}> = ({parts, indexTab}) => {

    console.log('index 123  ||  ', parts);
    const [index, setIndex] = useState(indexTab);

    useEffect(() => {
        setIndex(indexTab)
    } , [indexTab])

    const items: TabsProps['items'] = parts.map((item, index) => {
        const result = {
            key: index + 1 + '',
            label: `Part ${index + 1}`,
            children: <>
                {Array.from({ length: item.questions.length }, (_, i) => (
                     item.questions[i].type == TypeQuestion.SINGLE ? 
                     <MultiChoice prop={item.questions[i]} key={i}/> 
                     : 
                     <MultiChoiceGroup 
                     content={item.questions[i].content} 
                     questionChilds={item.questions || []} 
                     key={i} />
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
        <Tabs className="tab-list" activeKey={index} items={items} onChange={(e) => setIndex(e)}/>
    </div>
}


export default ToeicComponent;