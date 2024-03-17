import { Input, Radio, Space, Tooltip } from "antd";
import QuestionNumber from "./QuestionNumber";
import '../css/MultiChoice.scss'
import React from "react";
import { QuestionDTO } from "../../../../entity/props/ExamDTO";

const MultiChoice: React.FC<{prop: QuestionDTO}> 
                            = ({prop}) => {

    return <div className="question multi-choice">
        <div id = {`question-${prop.questionId}`}>
            <QuestionNumber index={prop.questionId}/>
        </div>
        <Tooltip title={prop.questionChilds[0].hint} style={{marginLeft: "36px"}}>
            <div dangerouslySetInnerHTML={{ __html: prop.content }} />
        </Tooltip>
        <Radio.Group className="answer" style={prop.content !== "" ? {marginLeft: "36px"} : {marginLeft: "0px"}}>  
            <Space direction="vertical">
                {
                    prop.questionChilds[0].type.includes('multi_choice') ?
                    Array.from({ length: prop.questionChilds[0].answer.length }, (_, i) => (
                        <Radio value={prop.questionChilds[0].answer[i].key} key={i}>{`${prop.questionChilds[0].answer[i].key}. ${prop.questionChilds[0].answer[i].value}`}</Radio>
                    )) 
                    :
                    <Input placeholder="Typing your idea!!!!" />
                }
            </Space>
        </Radio.Group>
    </div>
}


export default MultiChoice;