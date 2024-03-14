import { Form, SelectProps } from "antd";
import EditorComponent from "../../editor/EditorComponent";
import { Button, Input, Radio, RadioChangeEvent, Select, Space, Upload } from "antd/lib";
import { useEffect, useState } from "react";
import { CloseOutlined, DeleteOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import ReactAudioPlayer from "react-audio-player";
import { QuestionItemDTO } from "../../../../entity/props/ExamDTO";

interface PropValue {
    key: number,
    value: string
}

interface PropUpload {
    isUpload: boolean,
    url: string
}

const QuestionItem: React.FC<{ index: number, input: any, getInput: (e: any) => void, deleteItem: (index: number) => void, item: QuestionItemDTO, id?: number }>
    = ({ index, input, getInput, deleteItem, item, id }) => {

        const [upload, setUpload] = useState<PropUpload>({
            isUpload: false,
            url: ''
        });
        const [valueMC, setValueMC] = useState<number>(1);
        const [values, setValues] = useState<PropValue[]>([]);
        const [haveContent, setHaveContent] = useState<string[]>(['content_text', 'multi_choice']);
        const [editorData, setEditorData] = useState<string>("");
        const [solution, setSolution] = useState<string>("");

        useEffect(() => {
            loadToElement(item);
            //getInput(input);
        }, [id]);

        const getElement: any = () => {
            var rs: any = {};
            try {
                if (item === undefined) {
                    const questions = input.questions || [];
                    //@ts-ignore
                    const elementQ = questions.filter(e => e.index === index)[0];
                    rs = elementQ;
                } else {
                    console.log('check element queue', input);
                    rs = {...item};
                }
            } catch (error) {
                console.log('handle element Q failed ' + error);
            }

            return rs;
        }

        const loadToElement = (i: QuestionItemDTO) => {
            try {
                const types = i.type.replace(/ /g, '').split(',');
                if (types.includes('audio')) {
                    setUpload({
                        isUpload: true,
                        url: i.content
                    });
                } else {
                    setEditorData(i.content);
                }
                setHaveContent(types);
    
                if (!types.includes('multi_choice')) {
                    setSolution(i.solution);
                } else {
                    const valuesRes: PropValue[] = i.answer.map(e => {
                        return {
                            key: Number(e.key),
                            value: e.value
                        }
                    });
                    setValues(valuesRes);
                    setValueMC(Number(i.solution));
                }
            } catch(err) {
                console.log('error ==== ', err);
                i.type = haveContent.join(',');
            }
        }

        const handleContent = (value: string) => {
            item.content = value;
            getInput(item);
        }

        const handleChange = (value: string[]) => {
            setUpload({
                isUpload: value.includes('audio'),
                url: ''
            });
            setHaveContent(value);
            item.type = value.join(',');
            setValues([]);
            getInput(item);
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
            console.log('go to change');
            setValueMC(e.target.value);
            item.solution = e.target.value;
            getInput(item);
        };

        const addNewOption = (e: any) => {
            const op: PropValue = {
                key: values.length + 1,
                value: ''
            };
            setValues([...values, op]);
            console.log('check item', item);
            item.answer  = [...values, op];
            getInput(item);
        }

        const onRemoveOption = (key: number) => {
            let newOps = values.filter(obj => obj.key !== key);
            setValues(newOps);
            item.answer = newOps;
            getInput(item);
        }

        const getValueOption = (e: any, key: number) => {
            const ans = values.filter(e => e.key === key)[0];
            ans.value = e.target.value;
            setValues([...values]);
            item.answer = [...values];
            getInput(item);
        }

        const listenUpload = (e: any) => {
            if (e.file.status === 'done') {
                const mock = upload;
                mock.url = e.file.response.default;
                setUpload({ ...mock });
                item.content = mock.url;
                getInput(item);
            }
        }

        const getSolve = (e: any) => {
            console.log('solve text', e.target.value);
            item.solution = e.target.value;
            getInput(item);
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
                            : <EditorComponent class_name="very-low" setContent={handleContent} data={editorData} />)}
                    {/* <div style={{width: '600px'}}></div> */}
                </Form.Item>
                <Select
                    className='options'
                    mode="multiple"
                    style={{ width: upload ? '12%' : '25%' }}
                    placeholder="select options"
                    value={haveContent}
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
                {upload?.isUpload ? <Upload style={{ maxWidth: '200px' }} action={URL_UPLOAD_RESOURCE} onChange={listenUpload}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload> : <></>}
            </div>
            <div className={`answer ${index}`}>
                {haveContent.includes('multi_choice') ?
                    <Radio.Group value={valueMC} onChange={onChangeMC}>
                        <Space direction="vertical">
                            {
                                values.map(v => {
                                    return <Radio value={v.key} >
                                        <Input defaultValue={v.value} style={{ width: 200, marginLeft: 10 }} onBlur={(e) => getValueOption(e, v.key)} />
                                        <Button icon={<CloseOutlined />} onClick={() => onRemoveOption(v.key)} />
                                    </Radio>;
                                })
                            }
                            <Radio >
                                Add Option...
                                {<>
                                    <Input onClick={addNewOption} style={{ width: 100, marginLeft: 10 }} />

                                </>}
                            </Radio>
                        </Space>
                    </Radio.Group>
                    :
                    <Input onBlur={(e) => getSolve(e)} defaultValue={solution} style={{ width: 100, marginLeft: 60, flexBasis: '700px' }} placeholder="typing your answer...." />
                }
                <Button className="delete-item" icon={<DeleteOutlined />} onClick={() => deleteItem(index)} />
            </div>
        </div>
    }


export default QuestionItem;