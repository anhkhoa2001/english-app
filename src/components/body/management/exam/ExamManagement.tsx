import { Button, Collapse, CollapseProps, Form, Modal, Rate, Space, Table } from "antd";
import '../css/ExamManagement.scss';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PreViewVideo from "../course/PreviewVideo";
import { TableProps } from "antd/lib";
import { MultiChoiceProp } from "../../../../entity/props/MultiChoiceProp";
import PreviewContentQuestion from "./PreviewContentQuestion";
import QuestionForm from "../form/QuestionForm";

const PART = 'PART';
const modal = new Map();

const ExamManagement: React.FC = () => {
    const [isModalSectionOpen, setIsModalSectionOpen] = useState(modal);

    const showModalAdd = (key: string) => {
        isModalSectionOpen.set(key, true);
        const newMap = new Map(isModalSectionOpen);
        setIsModalSectionOpen(newMap);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <a href={''} target="_blank">{text}</a>,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Kind of question',
            dataIndex: 'kind',
            key: 'kind',
        },
        {
            title: 'Question Childs',
            key: 'childs',
            dataIndex: 'childs'
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button icon={<EditOutlined />} />
                    <Button icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const parts:{
        type: number,
        data: MultiChoiceProp[]
    }[] = [
        {
            type: 1,
            data : [
                {
                    type: 1,
                    index: 1,
                    content: <img src="https://study4.com/media/ets2023/img/1/image15.png" alt="" />,
                    questionChilds: [
                        {
                            type: 0,
                            index: 1,
                            content: "",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        },
                        {
                            type: 0,
                            index: 2,
                            content: "",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        },
                        {
                            type: 0,
                            index: 3,
                            content: "",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        }
                    ],
                    answers: [],
                    hint: ""
                },
                {
                    type: 1,
                    index: 5,
                    content: <>
                        <p>Travelling around Thailand in the 1990s, William Janssen was impressed with the basic rooftop solar heating systems that were on many homes, where energy from the sun was absorbed by a plate and then used to heat water for the home. Two decades later Janssen developed that basic idea he saw in south-east Asia into a portable device that uses the power from the sun to purify water.</p>
                        <p>The Desolenator operates as a mobile desalination unit that can take water from different places, such as the sea, rivers, boreholes, and rain, and purify <strong><u>it</u></strong> for human consumption. It is particularly valuable in regions where natural groundwater reserves have been polluted, or where seawater is the only water source available. Janssen saw that there was a need for a sustainable way to clean water for both the developing and the developed countries when he moved to the United Arab Emirates and saw large-scale water processing.</p>
                        <p>The Desolenator can produce 15 liters of drinking water per day, enough to sustain a family for cooking and drinking. Its main <strong><u>selling point</u></strong> is that unlike standard desalination techniques, it doesn't require a generated power supply; just sunlight. It measures 120 cm by 90 cm, and it's easy to transport, thanks to its two wheels. Water enters through a pipe and flows as a thin film between a sheet of double glazing and the surface of a solar panel, where it is heated by the sun. The warm water flows into a small boiler (heated by a solar-powered battery) where it is converted to steam. When the steam cools, it becomes <strong><u>distilled</u></strong> water. The device has a very simple filter to trap particles, and this can easily be shaken to remove them. A recent analysis found that at least two- thirds of the world's population lives with severe water scarcity for at least a month every year. Janssen says that by 2030 half of the world's population will be living with water stress - where the demand exceeds the supply over a certain period of time. It is really important that a sustainable solution is brought to the market that is able to help these people,' he says. 'Many countries don't have the money for desalination plants, which are very expensive to build. They don't have the money to operate them, they are very maintenance intensive, and they don't have the money to buy the diesel to run the desalination plants, so it is a really bad situation."</p>
                        <p>(Adapted from Cambridge English IELTS Academic 15 by Cambridge University Press)​</p>
                    </>,
                    questionChilds: [
                        {
                            type: 0,
                            index: 4,
                            content: "According to paragraph 1, what did Janssen do after his trip to Thailand?",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        },
                        {
                            type: 0,
                            index: 5,
                            content: "The word \"it\" in paragraph 2 refers to_________.",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        },
                        {
                            type: 0,
                            index: 6,
                            content: "Which best serves as the title for the passage?",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        }
                    ],
                    answers: [],
                    hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
                }
            ]
        },
        {
            type: 1,
            data : [
                {
                    type: 1,
                    index: 5,
                    content: <>
                        <p>Travelling around Thailand in the 1990s, William Janssen was impressed with the basic rooftop solar heating systems that were on many homes, where energy from the sun was absorbed by a plate and then used to heat water for the home. Two decades later Janssen developed that basic idea he saw in south-east Asia into a portable device that uses the power from the sun to purify water.</p>
                        <p>The Desolenator operates as a mobile desalination unit that can take water from different places, such as the sea, rivers, boreholes, and rain, and purify <strong><u>it</u></strong> for human consumption. It is particularly valuable in regions where natural groundwater reserves have been polluted, or where seawater is the only water source available. Janssen saw that there was a need for a sustainable way to clean water for both the developing and the developed countries when he moved to the United Arab Emirates and saw large-scale water processing.</p>
                        <p>The Desolenator can produce 15 liters of drinking water per day, enough to sustain a family for cooking and drinking. Its main <strong><u>selling point</u></strong> is that unlike standard desalination techniques, it doesn't require a generated power supply; just sunlight. It measures 120 cm by 90 cm, and it's easy to transport, thanks to its two wheels. Water enters through a pipe and flows as a thin film between a sheet of double glazing and the surface of a solar panel, where it is heated by the sun. The warm water flows into a small boiler (heated by a solar-powered battery) where it is converted to steam. When the steam cools, it becomes <strong><u>distilled</u></strong> water. The device has a very simple filter to trap particles, and this can easily be shaken to remove them. A recent analysis found that at least two- thirds of the world's population lives with severe water scarcity for at least a month every year. Janssen says that by 2030 half of the world's population will be living with water stress - where the demand exceeds the supply over a certain period of time. It is really important that a sustainable solution is brought to the market that is able to help these people,' he says. 'Many countries don't have the money for desalination plants, which are very expensive to build. They don't have the money to operate them, they are very maintenance intensive, and they don't have the money to buy the diesel to run the desalination plants, so it is a really bad situation."</p>
                        <p>(Adapted from Cambridge English IELTS Academic 15 by Cambridge University Press)​</p>
                    </>,
                    questionChilds: [
                        {
                            type: 0,
                            index: 7,
                            content: "According to paragraph 1, what did Janssen do after his trip to Thailand?",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        },
                        {
                            type: 0,
                            index: 8,
                            content: "The word \"it\" in paragraph 2 refers to_________.",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        },
                        {
                            type: 0,
                            index: 9,
                            content: "Which best serves as the title for the passage?",
                            answers: [
                                {
                                    key: "A",
                                    value: "locate"
                                },
                                {
                                    key: "B",
                                    value: "located"
                                },
                                {
                                    key: "C",
                                    value: "locating"
                                }
                            ],
                            hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions"
                        }
                    ],
                    answers: [],
                    hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
                }
            ]
        }
    ];
    interface DataType {
        key: string;
        code: string;
        content: React.ReactNode;
        childs: number;
        kind: string;
    }


    const [sectionCurrent, setSectionCurrent] = useState(parts);

    const itemDashboards: CollapseProps['items'] = sectionCurrent.map((item, index) => {
        const dataFake: DataType[] = item.data.map((l, i) => {
            return {
                key: i + '',
                code: l.index + '',
                content: <PreviewContentQuestion content={l.content}/>,
                childs: l.questionChilds?.length || 0,
                kind: l.type === 0 ? 'Single' : 'Group'
            }
        });
        return {
            key: index + '',
            label: <div className="header-course">
                <Form.Item label={`Part ${index + 1}`} >
                    <Button className="item-part" name={'edit' + index}>Add New Question</Button>
                    <Button className="item-part" name={'edit' + index}>Edit Part</Button>
                    <Button className="item-part" name={'delete' + index}>Delete Part</Button>
                </Form.Item>
            </div>,
            children: <Table columns={columns} dataSource={dataFake} pagination={false} />
        }
    });

    const closeModal = (key: string) => {
    };

    const handleCancel = (key: string) => {
    };

    return <div className="exam-manage" >
        <div className="introduction">
            <h1>The English Master Course: English Grammar, English Speaking</h1>
            <h3>A Complete English Language Course: English Grammar, Speaking, Pronunciation, and Writing. British and American English.</h3>
            <p className="summary">Bộ đề có cấu trúc sát nhất với bài thi TOEIC thực chiến. Luyện đề TOEIC Hacker 2 để nắm trọn mọi dạng bài. &nbsp;Luyện đề cùng đáp án và giải thích chi tiết.</p><p><strong>&gt;&gt;&gt; Hiện tại, phần giải thích đáp án đang được thầy cô Prep gấp rút hoàn thiện và cập nhật lên hệ thống trong thời gian tới. Prep sẽ tiếp tục cập nhật vào kho đề, các bạn hãy yên tâm chăm chỉ ôn luyện nhé !</strong></p>
            <div className="info">
                <div className="rating-star">
                    <p>{1000} attendences</p>
                </div>
                <span className="author">Created by <a href="/">Khoa dam tam</a></span>
            </div>
        </div>
        <div className="add-section">
            <span className="header">Content Examination</span>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalAdd(PART)}>
                Add New Part
            </Button>
        </div>
        <Collapse items={itemDashboards} expandIcon={({ isActive }) => <></>} defaultActiveKey={['1']} />
        <Modal title="Edit Question"
            open={true}
            onOk={() => closeModal('')}
            onCancel={() => handleCancel('')}
            okText='Submit'
            width={800}>
            <QuestionForm />
        </Modal>
    </div>
}


export default ExamManagement;