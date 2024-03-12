
import { Button, Checkbox, Flex, Form, Input, Select } from 'antd';
import '../css/QuestionForm.scss'
import { CheckOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import EditorComponent from '../../editor/EditorComponent';
import React, { useEffect, useState } from 'react';
import QuestionItem from './QuestionItem';

const types = ['Single', 'Group'];

const CreateQuestionForm: React.FC<{id: number, part: number, 
    onSubmit: (e: any) => void, formRef: any}> = ({id, part, onSubmit, formRef}) => {
    
    const [questionElemment, setQuestionElement] = useState<React.ReactNode>(<></>);
    const [questions, setQuestions] = useState<any>([]);
    const [typeQuestion, setTypeQuestion] = useState<string>(types[0]);
    const [input, setInput] = useState<any>();
    const [form] = Form.useForm();
    useEffect(() => {
        console.log('id', id);
        form.setFieldsValue({
            type: types[0],
            questions: []
        });
        setInput(form.getFieldsValue());

        setQuestions([]);
        setTypeQuestion(types[0 ]);
        setQuestionElement(<></>);
    }, [id]);

    const handleContent = (value: string) => {
        console.log('check value content ========================== ', value);
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
        console.log('handle input', content);
        form.setFieldsValue({
            type: content.type,
            questions: content.questions,
            content: content.content
        });
    };

    const addNewQuestion = () => {
        const index = questions.length + 1;
        var temp:any;
        const questionsCpy = [...questions, {
            index: index
        }];
        setQuestions(questionsCpy);
        if(questionsCpy.length > 1) {
            temp = {
                ...input,
                type: types[1]
            };
        }  else {
            temp = {
                ...input,
                type: types[0]
            }
        }
        temp = {
            ...temp,
            questions: questionsCpy
        };
        console.log('ques type detail', temp);
        setTypeQuestion(temp.type);
        setInput(temp);
        form.setFieldsValue(temp);

        setQuestionElement(questionsCpy.map(q => {
                console.log('item questions', q);
                return <QuestionItem index={q.index} input={temp} setInput={handleInput}/>   
            }));
    }

    console.log('ques type', typeQuestion);
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
            <Form.Item label="Type Question" name="questions" style={{display: "none"}}>
                <Select value={typeQuestion} disabled>
                    {types.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Content" className='content' name="content">
                <EditorComponent class_name="low" setContent={handleContent} />
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