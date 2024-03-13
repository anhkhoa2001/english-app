
import { Button, Checkbox, Flex, Form, Input, Select } from 'antd';
import '../css/QuestionForm.scss'
import { CheckOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import EditorComponent from '../../editor/EditorComponent';
import React, { useEffect, useRef, useState } from 'react';
import QuestionItem from './QuestionItem';
import { QuestionDTO } from '../../../../entity/props/ExamDTO';

const types = ['Single', 'Group'];

const CreateQuestionForm: React.FC<{
    id: number, part: number,
    onSubmit: (e: any) => void, formRef: any, examCode: string, item?: QuestionDTO
}> =
    ({ id, part, onSubmit, formRef, examCode, item }) => {

        const [questionElemment, setQuestionElement] = useState<React.ReactNode[]>([]);
        const [questions, setQuestions] = useState<any>([]);
        const [typeQuestion, setTypeQuestion] = useState<string>(types[0]);
        const [input, setInput] = useState<any>();
        const [form] = Form.useForm();
        const elementRef = useRef<React.ReactNode[]>([]);
        const questionRef = useRef<any[]>([]);
        const [dataEditorParent, setDataEditorParent] = useState();

        console.log('id', id);
        useEffect(() => {
            if (item === undefined) {
                form.setFieldsValue({
                    type: types[0],
                    questions: [],
                    examCode: examCode,
                    part: part,
                    content: ''
                });
                setInput(form.getFieldsValue());

                setQuestions([]);
                setTypeQuestion(types[0]);
                setQuestionElement([]);
            } else {
                form.setFieldsValue({
                    type: item.type,
                    questions: item.questionChilds,
                    examCode: examCode,
                    part: part,
                    content: item.content
                });
                console.log('checked', form.getFieldsValue());
                setDataEditorParent(item.content);
                setQuestions(item.questionChilds);
                questionRef.current = item.questionChilds;
                const questionEle = item.questionChilds.map(q => {
                    return <QuestionItem index={q.index} input={form.getFieldsValue()} getInput={handleInput} deleteItem={deleteQuestion} />
                });
                elementRef.current = questionEle;
                setQuestionElement(questionEle);
                setInput(form.getFieldsValue());
            }
        }, [id]);

        const handleContent = (value: string) => {
            setInput({
                ...input,
                content: value
            });
            form.setFieldsValue({
                ...input,
                content: value
            });
        }

        const handleInput = (content: any) => {
            form.setFieldsValue({
                type: content.type,
                questions: content.questions,
                content: content.content
            });
        };

        const addNewQuestion = () => {
            const index = questions.length + 1;
            var temp: any;
            const questionsCpy = [...questions, {
                index: index
            }];
            setQuestions(questionsCpy);
            if (questionsCpy.length > 1) {
                temp = {
                    ...input,
                    type: types[1]
                };
            } else {
                temp = {
                    ...input,
                    type: types[0]
                }
            }
            temp = {
                ...temp,
                questions: questionsCpy
            };
            console.log('ques type detail', questionsCpy);
            setTypeQuestion(temp.type);
            setInput(temp);
            setQuestions(questionsCpy);
            questionRef.current = questionsCpy;
            const questionEle = questionsCpy.map(q => {
                return <QuestionItem index={q.index} input={temp} getInput={handleInput} deleteItem={deleteQuestion} />
            });
            elementRef.current = questionEle;
            setQuestionElement(questionEle);
            form.setFieldsValue(temp);
        }

        const deleteQuestion = (index: number) => {
            if (questionRef.current.length > 1) {
                questionRef.current.splice(index - 1, 1);
            } else {
                questionRef.current = [];
            }
            setQuestions([...questionRef.current]);
            setQuestionElement(questionRef.current.map(q => {
                return <QuestionItem index={q.index} input={form.getFieldsValue()} getInput={handleInput} deleteItem={deleteQuestion} />
            }));
            form.setFieldsValue({
                ...form.getFieldsValue(),
                questions: questionRef.current
            });
        }

        return <div className="question-form">
            <Form
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                style={{ width: 1300 }}
                onFinish={onSubmit}
                ref={formRef}
                form={form}
            >
                <Form.Item label="Type Question" name="type">
                    <Select value={typeQuestion} disabled>
                        {types.map(e => {
                            return <Select.Option value={e}>{e}</Select.Option>;
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Type Question" name="part" style={{ display: "none" }}>
                    <Select value={typeQuestion} disabled>
                        {types.map(e => {
                            return <Select.Option value={e}>{e}</Select.Option>;
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Type Question" name="examCode" style={{ display: "none" }}>
                    <Select value={typeQuestion} disabled>
                        {types.map(e => {
                            return <Select.Option value={e}>{e}</Select.Option>;
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Type Question" name="questions" style={{ display: "none" }}>
                    <Select value={typeQuestion} disabled>
                        {types.map(e => {
                            return <Select.Option value={e}>{e}</Select.Option>;
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Content" className='content' name="content">
                    <EditorComponent class_name="low" data={dataEditorParent} setContent={handleContent} />
                </Form.Item>
                {questionElemment}
                <Flex gap="small" vertical>
                    <Flex wrap="wrap" gap="small">
                        <Button icon={<PlusOutlined />} onClick={() => addNewQuestion()}>Add Question</Button>
                    </Flex>
                </Flex>
            </Form>
        </div>
    }


export default CreateQuestionForm;