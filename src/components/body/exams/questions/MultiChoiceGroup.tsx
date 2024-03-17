import { Tooltip } from "antd";
import React from "react";
import MultiChoice from "./MultiChoice";
import { QuestionDTO, QuestionItemDTO } from "../../../../entity/props/ExamDTO";


const MultiChoiceGroup: React.FC<{
    content: React.ReactNode,  questionChilds: QuestionDTO[]
}>
    = ({ content, questionChilds }) => {
        return <div className="question multi-choice-group">
            <Tooltip title={""}>
                <span style={{margin: "15px", display: "block", fontWeight: "500", fontSize: "18px"}}>
                    {content}
                </span>
            </Tooltip>
            {Array.from({ length: questionChilds.length }, (_, i) => (
                <MultiChoice prop={questionChilds[i]} key={i}/>
            ))}
        </div>
    }


export default MultiChoiceGroup;