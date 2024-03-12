import { Form, SelectProps } from "antd";
import EditorComponent from "../../editor/EditorComponent";
import { Button, Input, Radio, RadioChangeEvent, Select, Space, Upload } from "antd/lib";
import { useEffect, useState } from "react";
import { CloseOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import ReactAudioPlayer from "react-audio-player";

interface PropValue {
    key: number,
    value: string
}

interface PropUpload {
    isUpload: boolean,
    url: string
}

const QuestionItem: React.FC<{ index: number, input: any, setInput: (e: any) => void }> = ({ index, input, setInput }) => {

    console.log('index', index);
    const [upload, setUpload] = useState<PropUpload>({
        isUpload: false,
        url: ''
    });
    const [valueMC, setValueMC] = useState<number>(1);
    const [values, setValues] = useState<PropValue[]>([]);
    const [haveContent, setHaveContent] = useState<string[]>(['content_text', 'multi_choice']);

    useEffect(() => {
        const elementQ = getElement();
        elementQ.type = haveContent;
        setInput(input);
    }, [index]);
 
    const getElement:any = () => {
        var rs:any = {};
        try {
            const questions = input.questions || [];
            console.log('questions', questions);
            //@ts-ignore
            const elementQ = questions.filter(e => e.index === index)[0]; 
            rs = elementQ;
        } catch(error) {
            console.log('handle element Q failed ' + error);
        }
        return rs;
    }

    const handleContent = (value: string) => {
        const elementQ = getElement();
        elementQ.content = value;
        setInput(input);
    }

    const handleChange = (value: string[]) => {
        setUpload({
            isUpload: value.includes('audio'),
            url: ''
        });
        setHaveContent(value);
        const elementQ = getElement();
        elementQ.type = value;
        setValues([]);
        setInput(input);
    };

    const options: SelectProps['options'] = [
        {
            label: 'Content Text',
            value: 'content_text',
            desc: 'Content Text'
        },
        {
            label: 'No Content',
            value: 'no_content',
            desc: 'No Content'
        },
        {
            label: 'Answer Text',
            value: 'ans_text',
            desc: 'Answer Text'
        },
        {
            label: 'Multiple Choice',
            value: 'multi_choice',
            desc: 'Multiple Choice'
        },
        {
            label: 'Audio',
            value: 'audio',
            desc: 'Audio'
        }
    ];

    const onChangeMC = (e: RadioChangeEvent) => {
        setValueMC(e.target.value);
        const elementQ = getElement();
        elementQ.solution = e.target.value;  
        setInput(input);
    };

    const addNewOption = (e: any) => {
        const op: PropValue = {
            key: values.length + 1,
            value: ''
        };
        setValues([...values, op]);
        const elementQ = getElement();
        console.log('element q add new', elementQ);
        elementQ.answer = [...values, op];
        setInput(input);  
    }

    const onRemoveOption = (key: number) => {
        let newOps = values.filter(obj => obj.key !== key);
        setValues(newOps);
        const elementQ = getElement();
        elementQ.answer = newOps;  
        setInput(input);  
    }

    const getValueOption = (e:any, key: number) => {
        const ans = values.filter(e => e.key === key)[0];
        ans.value = e.target.value;
        setValues([...values]); 
        const elementQ = getElement();
        elementQ.answer = [...values];  
        setInput(input);
    }

    const listenUpload = (e: any) => {
        if(e.file.status === 'done') {
            const mock = upload;
            mock.url = e.file.response.default;
            setUpload({...mock});
            const elementQ = getElement();
            elementQ.content = mock.url;  
            setInput(input);
        }
    }

    const getSolve = (e: any) => {
        console.log('solve text', e.target.value);
        const elementQ = getElement();
        elementQ.solution = e.target.value;  
        setInput(input);
    }
    return <div>
        <div className={`question ${index}`}>
            <Form.Item label={`Question ${index}`}>
                {haveContent.includes('audio') ?
                    <ReactAudioPlayer
                        src={upload?.url}
                        controls
                    />
                    :
                    (haveContent.includes('no_content') ? <div style={{ width: '600px' }}></div>
                        : <EditorComponent class_name="very-low" setContent={handleContent} />)}
                {/* <div style={{width: '600px'}}></div> */}
            </Form.Item>
            <Select
                className='options'
                mode="multiple"
                style={{ width: upload ? '12%' : '25%' }}
                placeholder="select options"
                defaultValue={['content_text', 'multi_choice']}
                onChange={handleChange}
                optionLabelProp="label"
                options={options}
                optionRender={(option) => (
                    <Space>
                        <span role="img" aria-label={option.data.label}>
                            {option.data.emoji}
                        </span>
                        {option.data.desc}
                    </Space>
                )}
            />
            {upload?.isUpload ? <Upload style={{maxWidth: '200px'}} action={URL_UPLOAD_RESOURCE} onChange={listenUpload}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> : <></>}
        </div>
        <div className={`answer ${index}`}>
            {haveContent.includes('multi_choice') ? <Radio.Group value={valueMC} onChange={onChangeMC}>
                <Space direction="vertical">
                    {
                        values.map(v => {
                            return <Radio value={v.key} >
                                <Input defaultValue={v.value} style={{ width: 200, marginLeft: 10 }} onBlur={(e) => getValueOption(e, v.key)}/>
                                <Button icon={<CloseOutlined />} onClick={() => onRemoveOption(v.key)} />
                            </Radio>;
                        })
                    }
                    <Radio checked={false}>
                        Add Option...
                        {<>
                            <Input onClick={addNewOption} style={{ width: 100, marginLeft: 10 }} />

                        </>}
                    </Radio>
                </Space>
            </Radio.Group> 
            : 
            <Input onBlur={(e) => getSolve(e)} style={{ width: 100, marginLeft: 60, flexBasis: '700px' }} placeholder="typing your answer...." />}
        </div>
    </div>
}


export default QuestionItem;