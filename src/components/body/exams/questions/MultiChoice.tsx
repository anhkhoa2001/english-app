import { Input, Radio, Space, Tooltip } from "antd";
import QuestionNumber from "./QuestionNumber";
import '../css/MultiChoice.scss'
import React, { useState } from "react";
import { QuestionDTO, QuestionItemDTO } from "../../../../entity/props/ExamDTO";
//@ts-ignore
import ReactAudioPlayer from "react-audio-player";
import { CheckOutlined, InfoCircleOutlined, StopOutlined } from "@ant-design/icons";

const MultiChoice: React.FC<{ prop: QuestionDTO, start: number, type?: string }>
    = ({ prop, start, type }) => {


        const [isViewResult, setIsViewResult] = useState<boolean>((type != undefined || type != '') && type === 'view-result');
        const [isView, setIsView] = useState<boolean>((type != undefined || type != '') );
        const [item, setItem] = useState<QuestionItemDTO>(prop.questionChilds[0]);

        console.log('childs', item);
        const onChange = (e: any) => {
            item.output = e.target.value;
        }
        return <div className="question multi-choice">
            <div className="parent-content" dangerouslySetInnerHTML={{ __html: prop.content }} />
            <div id={`question-${prop.questionId}`} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <QuestionNumber index={start} />
            </div>
            <Tooltip title={item.hint} style={{ marginLeft: "36px" }}>
                {
                    prop.type.includes('audio') ?
                        <ReactAudioPlayer
                            src={prop.content}
                            autoPlay={false}
                            controls
                            className='child'
                        />
                        :
                        <div className="content" dangerouslySetInnerHTML={{ __html: prop.questionChilds[0].content }} />
                }
            </Tooltip>
            <Radio.Group
                className="answer"
                style={prop.content !== "" ? { marginLeft: "54px" } : { marginLeft: "0px" }}
                onChange={onChange}
                value={item.output}>
                <Space direction="vertical">
                    {
                        item.type.includes('multi_choice') ?
                            Array.from({ length: item.answer.length }, (_, i) => (
                                <Radio 
                                value={item.answer[i].key} 
                                key={i} 
                                style={(isViewResult && item.answer[i].key + '' == item.output) ? 
                                    (item.output == item.solution ? {color: "#0dff0d"} : {color: "red"}) : 
                                    (item.solution == item.answer[i].key + '' ? {color: "#0dff0d"} : {})} >
                                    {`${item.answer[i].key}. ${item.answer[i].value}`}
                                </Radio>
                            ))
                            :
                            <>
                                {isViewResult && <>
                                    <Input style={{ borderColor: "red", background: "#ffe4e4" }} width={500}
                                        defaultValue={isViewResult ? item.output : ''}
                                        onChange={onChange}
                                        suffix={
                                            <StopOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                        } />
                                </>}
                                <Input width={500}
                                    style={isView ? { borderColor: "#2ff72f", background: "#d7edd7" } : {}}
                                    defaultValue={isView ? item.solution : ''}
                                    onChange={onChange}
                                    suffix={
                                        <CheckOutlined />
                                    } />
                            </>
                    }
                </Space>
            </Radio.Group>
        </div>
    }


export default MultiChoice;