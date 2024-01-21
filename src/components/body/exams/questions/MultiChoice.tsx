import { Radio, Space, Tooltip } from "antd";
import QuestionNumber from "./QuestionNumber";
import '../css/MultiChoice.scss'
import React from "react";
import { MultiChoiceProp } from "../../../../entity/props/MultiChoiceProp";

const MultiChoice: React.FC<{prop: MultiChoiceProp}> 
                            = ({prop}) => {

    return <div className="question multi-choice">
        <QuestionNumber index={prop.index}/>
        <Tooltip title={prop.hint}>
            {prop.content}
        </Tooltip>
        <Radio.Group className="answer" style={prop.content !== "" ? {marginLeft: "36px"} : {marginLeft: "0px"}}>  
            <Space direction="vertical">
                {Array.from({ length: prop.answers.length }, (_, i) => (
                    <Radio value={prop.answers[i].key} key={i}>{`${prop.answers[i].key}. ${prop.answers[i].value}`}</Radio>
                ))}
            </Space>
        </Radio.Group>
    </div>
}


export default MultiChoice;