import { Input, Radio, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { QuestionDTO, QuestionItemDTO } from "../../../../entity/props/ExamDTO";
import QuestionNumber from "./QuestionNumber";
//@ts-ignore
import ReactAudioPlayer from "react-audio-player";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";


const MultiChoiceGroup: React.FC<{
    content: React.ReactNode,  questionChilds: QuestionItemDTO[], start: number, type?: string
}>
    = ({ content, questionChilds, start, type }) => {

        console.log('type react', (type != undefined || type != ''));
        const [isViewResult, setIsViewResult] = useState<boolean>((type != undefined || type != '') && type === 'view-result');
        console.log(questionChilds);
        const onChange = (e: any, index: number) => {
            questionChilds[index].output = e.target.value;
        }
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
                    <Radio.Group 
                    className="answer" 
                    style={questionChilds[i].content !== "" ? {marginLeft: "54px"} : {marginLeft: "0px"}}
                    value={questionChilds[i].output}>  
                        <Space direction="vertical">
                            {
                                questionChilds[i].type.includes('multi_choice') 
                                ?
                                Array.from({ length: questionChilds[i].answer.length }, (_, j) => (
                                    <Radio 
                                    value={questionChilds[i].answer[j].key} key={i}
                                    style={(isViewResult && questionChilds[i].answer[j].key + '' == questionChilds[i].output) ? 
                                    (questionChilds[i].output == questionChilds[i].solution ? {color: "#0dff0d"} : {color: "red"}) : 
                                    (questionChilds[i].solution == questionChilds[i].answer[j].key + '' ? {color: "#0dff0d"} : {})} >
                                        {`${questionChilds[i].answer[j].key}. ${questionChilds[i].answer[j].value}`}
                                    </Radio>
                                )) 
                                :
                                <>
                                    {isViewResult && <>
                                        <Input style={{ borderColor: "red", background: "#ffe4e4" }} width={500}
                                            defaultValue={isViewResult ? questionChilds[i].output : ''}
                                            onChange={(e) => onChange(e, i)}
                                            suffix={
                                                <StopOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                            } />
                                    </>}
                                    <Input width={500}
                                        style={isViewResult ? { borderColor: "#2ff72f", background: "#d7edd7" } : {}}
                                        defaultValue={isViewResult ? questionChilds[i].solution : ''}
                                        placeholder={isViewResult ? '' : 'Typing your answer!!!'}
                                        onChange={(e) => onChange(e, i)}
                                        suffix={
                                            <CheckOutlined />
                                        } />
                                </>
                            }
                        </Space>
                    </Radio.Group>
                </>
            ))}
        </div>
    }


export default MultiChoiceGroup;