import { Tooltip } from "antd";
import React from "react";
import MultiChoice from "./MultiChoice";
import { MultiChoiceProp } from "../../../../entity/props/MultiChoiceProp";


const MultiChoiceGroup: React.FC<{
    content: string, containImage: boolean, questionChilds: MultiChoiceProp[]
}>
    = ({ content, containImage, questionChilds }) => {
        console.log(questionChilds);
        return <div className="question multi-choice-group">
            <Tooltip title={""}>
                {containImage ? <img src={content || undefined} /> : <span>{content}</span>}
            </Tooltip>
            {Array.from({ length: questionChilds.length }, (_, i) => (
                <MultiChoice prop={questionChilds[i]} />
            ))}
        </div>
    }


export default MultiChoiceGroup;