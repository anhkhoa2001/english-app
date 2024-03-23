import { Input, Radio, Space, Tooltip } from "antd";
import React from "react";
import { QuestionDTO, QuestionItemDTO } from "../../../../entity/props/ExamDTO";
import QuestionNumber from "./QuestionNumber";
//@ts-ignore
import ReactAudioPlayer from "react-audio-player";


const MultiChoiceGroup: React.FC<{
    content: React.ReactNode,  questionChilds: QuestionItemDTO[], start: number
}>
    = ({ content, questionChilds, start }) => {

        console.log('childs', questionChilds[0].answer );
        return <div className="question multi-choice-group">
            <Tooltip title={""}>
                <span style={{margin: "15px", display: "block", fontWeight: "500", fontSize: "18px"}}>
                    <div className="content" dangerouslySetInnerHTML={{ __html: content || "" }} />
                </span>
            </Tooltip>
            {Array.from({ length: questionChilds.length }, (_, i) => (
                <>
                    <div className="index">
                        <div id = {`question-${questionChilds[i].item_id}`} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                            <QuestionNumber index={start++}/>
                        </div>
                        <Tooltip  title={questionChilds[i].hint} style={{marginLeft: "36px"}}>
                            {
                                questionChilds[i].type.includes('audio') ?
                                <ReactAudioPlayer
                                    src={questionChilds[i].content}
                                    autoPlay={false}
                                    controls
                                    className='child'
                                />
                                :
                                <div className="content" dangerouslySetInnerHTML={{ __html: questionChilds[i].content }} />
                            }
                        </Tooltip>
                    </div>
                    <Radio.Group className="answer" style={questionChilds[i].content !== "" ? {marginLeft: "54px"} : {marginLeft: "0px"}}>  
                        
                        <Space direction="vertical">
                            {
                                questionChilds[i].type.includes('multi_choice') 
                                ?
                                Array.from({ length: questionChilds[i].answer.length }, (_, j) => (
                                    <Radio value={questionChilds[i].answer[j].key} key={i}>{`${questionChilds[i].answer[j].key}. ${questionChilds[i].answer[j].value}`}</Radio>
                                )) 
                                :
                                <Input width={500} placeholder="Typing your idea!!!!" />
                            }
                        </Space>
                    </Radio.Group>
                </>
            ))}
        </div>
    }


export default MultiChoiceGroup;