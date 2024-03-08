import { Button, Collapse, CollapseProps, Form, Modal, Rate, Space, Table } from "antd";
import '../css/ExamManagement.scss';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { TableProps } from "antd/lib";
import { MultiChoiceProp } from "../../../../entity/props/MultiChoiceProp";
import PreviewContentQuestion from "./PreviewContentQuestion";
import QuestionForm from "../form/QuestionForm";
import { ExamDTO, ExamService } from "../../../../service/ExamService";
import MessageResponse from "../../../../entity/response/MessageResponse";

const PART = 'PART';
const DELETE_PART = 'DELETE_PART';
const ADD_QUESTION = 'ADD_QUESTION';
const EDIT_QUESTION = 'EDIT_QUESTION';
const modal = new Map();
modal.set(PART, false);
modal.set(EDIT_QUESTION, false);
modal.set(ADD_QUESTION, false);
modal.set(DELETE_PART, false);


let indexDelete = 0;

const ExamManagement: React.FC<{code: string}> = ({code}) => {
    const [isModalSectionOpen, setIsModalSectionOpen] = useState(modal);
    const [item, setItem] = useState<ExamDTO>();


    const loadExam: (data: MessageResponse<ExamDTO> | null) => void = (data) => {
        try {
            setItem(data?.data);

            console.log('course detail', data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        ExamService.getExamByCode("abc", code, loadExam);
    }, [code]);

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
                    <Button onClick={() => showModalAdd(EDIT_QUESTION)} icon={<EditOutlined />} />
                    <Button icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const parts: {
        data: MultiChoiceProp[]
    }[] = [
            {
                data: [
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
                    },
                    {
                        type: 0,
                        index: 6,
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
                            }
                        ],
                        answers: [],
                        hint: "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions",
                    }
                ]
            },
            {
                data: [
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
                content: <PreviewContentQuestion content={l.content} />,
                childs: l.questionChilds?.length || 0,
                kind: l.type === 0 ? 'Single' : 'Group'
            }
        });
        return {
            key: index + '',
            label: <div className="header-course">
                <Form.Item label={`Part ${index + 1}`} >
                    <Button className="item-part" name={'edit' + index} onClick={() => showModalAdd(ADD_QUESTION)}>Add New Question</Button>
                    <Button className="item-part" name={'delete' + index} onClick={() => deletePart(index)}>Delete Part</Button>
                </Form.Item>
            </div>,
            children: <Table columns={columns} dataSource={dataFake} pagination={false} />
        }
    });


    const addNewPart = () => {
        var newParts = [...sectionCurrent, {
            data: []
        }];
        setSectionCurrent(newParts);
        console.log(newParts);
    }



    const deletePart = (key: number) => {
        var newParts = [...sectionCurrent];
        if(newParts[key].data.length > 0) {
            indexDelete = key;
            showModalAdd(DELETE_PART);
        } else {
            newParts.splice(key, 1);
            setSectionCurrent(newParts);
        }
    }

    const closeModal = (key: string) => {
        if(key === DELETE_PART) {
            var newParts = [...sectionCurrent];
            newParts.splice(indexDelete, 1);
            setSectionCurrent(newParts);
        }
        isModalSectionOpen.set(key, false);
        const newMap = new Map(isModalSectionOpen);
        setIsModalSectionOpen(newMap);
    };

    const handleCancel = (key: string) => {
        isModalSectionOpen.set(key, false);
        const newMap = new Map(isModalSectionOpen);
        setIsModalSectionOpen(newMap);
    };

    const ReactComponent = (element: string) => {
        return React.createElement('div', { dangerouslySetInnerHTML: { __html: element } });
      };

    return <div className="exam-manage" >
        <div className="introduction">
            <h1>{item?.examName}</h1>
            <h3>{item?.summary}</h3>
            <p className="summary">
                {ReactComponent(item?.description || "")}
            </p>
            <div className="info">
                <div className="rating-star">
                    <p>{1000} attendences</p>
                </div>
                <div className="author"><p>Created by <a href="/">Khoa dam tam</a></p></div>
            </div>
        </div>
        <div className="add-section">
            <span className="header">Content Examination</span>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => addNewPart()}>
                Add New Part
            </Button>
        </div>
        <Collapse items={itemDashboards} expandIcon={({ isActive }) => <></>} defaultActiveKey={['1']} />
        <Modal title="Edit Question"
            open={isModalSectionOpen.get(EDIT_QUESTION)}
            onOk={() => closeModal(EDIT_QUESTION)}
            onCancel={() => handleCancel(EDIT_QUESTION)}
            okText='Submit'
            width={1400}>
            <QuestionForm />
        </Modal>

        <Modal title="Add New Question"
            open={isModalSectionOpen.get(ADD_QUESTION)}
            onOk={() => closeModal(ADD_QUESTION)}
            onCancel={() => handleCancel(ADD_QUESTION)}
            okText='Submit'
            width={1400}>
            <QuestionForm />
        </Modal>

        <Modal title="Warning when delete part" 
            open={isModalSectionOpen.get(DELETE_PART)}
            onOk={() => closeModal(DELETE_PART)}
            onCancel={() => handleCancel(DELETE_PART)}>
            <p>The section you want to delete contains questions!!! Do you want to continue deleting?</p>
      </Modal>
    </div>
}


export default ExamManagement;