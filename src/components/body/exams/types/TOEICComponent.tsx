import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import '../css/ToeicComponent.scss'
import MultiChoice from "../questions/MultiChoice";
import MultiChoiceGroup from "../questions/MultiChoiceGroup";
import { MultiChoiceProp } from "../../../../entity/props/MultiChoiceProp";

const TypeQuestion = {
    SINGLE: 0,
    GROUP: 1
}

const ToeicComponent: React.FC<{questions: {
    type: number,
    data: MultiChoiceProp[]
}[], indexTab: string}> = ({questions, indexTab}) => {

    console.log('index 123  ||  ', indexTab);
    const [index, setIndex] = useState(indexTab);

    useEffect(() => {
        setIndex(indexTab)
    } , [indexTab])

    const items: TabsProps['items'] = questions.map((item, index) => {
        const result = {
            key: index + 1 + '',
            label: `Part ${index + 1}`,
            children: <>
                {Array.from({ length: item.data.length }, (_, i) => (
                     item.data[i].type == TypeQuestion.SINGLE ? 
                     <MultiChoice prop={item.data[i]} key={i}/> 
                     : 
                     <MultiChoiceGroup 
                     content={item.data[i].content} 
                     questionChilds={item.data[i].questionChilds || []} 
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