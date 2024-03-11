import { Form, SelectProps } from "antd";
import EditorComponent from "../../editor/EditorComponent";
import { Button, Input, Radio, RadioChangeEvent, Select, Space, Upload } from "antd/lib";
import { useState } from "react";
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

const QuestionItem: React.FC<{ index: number, input: any }> = ({ index, input }) => {

    const [upload, setUpload] = useState<PropUpload>({
        isUpload: false,
        url: ''
    });
    const [valueMC, setValueMC] = useState<number>(1);
    const [values, setValues] = useState<PropValue[]>([]);
    const [haveContent, setHaveContent] = useState<string[]>(['content_text', 'multi_choice']);
    console.log('var upload', upload);

    const getElement:any = () => {
        var rs:any = {};
        try {
            console.log('input item', input);
            const questions = input.questions || [];
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
        console.log('element q', elementQ);
    }

    const handleChange = (value: string[]) => {
        setUpload({
            isUpload: value.includes('audio'),
            url: ''
        });
        setHaveContent(value);
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
        console.log('radio checked', e.target.value);
        setValueMC(e.target.value);
    };

    const addNewOption = (e: any) => {
        console.log('input e', e.target.value);
        const op: PropValue = {
            key: values.length + 1,
            value: ''
        };
        //let temp = valueMC + 1;
        //console.log('temp', temp);
        //setValueMC(temp);
        setValues([...values, op]);
        const elementQ = getElement();
        elementQ.answer = [...values, op];
    }

    const onRemoveOption = (key: number) => {
        let newOps = values.filter(obj => obj.key !== key);
        setValues(newOps);
    }

    const getValueOption = (e:any, key: number) => {
        const ans = values.filter(e => e.key === key)[0];
        ans.value = e.target.value;
        console.log('values', values);
        setValues([...values]); 
        const elementQ = getElement();
        elementQ.answer = [...values];  
    }
    return <>
        <div className='question'>
            <Form.Item label={`Question ${index + 1}`}>
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
            {upload?.isUpload ? <Upload action={URL_UPLOAD_RESOURCE}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> : <></>}
        </div>
        <div className="answer">
            {/* <Input placeholder="Basic usage" /> */}
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
            <Input style={{ width: 100, marginLeft: 60, flexBasis: '700px' }} placeholder="typing your answer...." />}
        </div>
    </>
}


export default QuestionItem;