import { Input, Radio, Space, Tooltip } from "antd";
import QuestionNumber from "./QuestionNumber";
import '../css/MultiChoice.scss'
import React from "react";
import { QuestionDTO } from "../../../../entity/props/ExamDTO";
//@ts-ignore
import ReactAudioPlayer from "react-audio-player";

const MultiChoice: React.FC<{prop: QuestionDTO, start: number}> 
                            = ({prop, start}) => {


    const onChange = (e: any) => {
        prop.questionChilds[0].output = e.target.value;
    }
    return <div className="question multi-choice">
        <div id = {`question-${prop.questionId}`} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <QuestionNumber index={start}/>
        </div>
        <Tooltip  title={prop.questionChilds[0].hint} style={{marginLeft: "36px"}}>
            {
                prop.type.includes('audio') ?
                <ReactAudioPlayer
                    src={prop.content}
                    autoPlay={false}
                    controls
                    className='child'
                />
                :
                <div className="content" dangerouslySetInnerHTML={{ __html: prop.content }} />
            }
        </Tooltip>
        <Radio.Group className="answer" style={prop.content !== "" ? {marginLeft: "54px"} : {marginLeft: "0px"}} onChange={onChange}>  
            <Space direction="vertical">
                {
                    prop.questionChilds[0].type.includes('multi_choice') ?
                    Array.from({ length: prop.questionChilds[0].answer.length }, (_, i) => (
                        <Radio value={prop.questionChilds[0].answer[i].key} key={i}>{`${prop.questionChilds[0].answer[i].key}. ${prop.questionChilds[0].answer[i].value}`}</Radio>
                    )) 
                    :
                    <Input width={500} placeholder="Typing your idea!!!!" onChange={onChange}/>
                }
            </Space>
        </Radio.Group>
    </div>
}


export default MultiChoice;