import { Button, Form, Input, Select, Switch, Upload } from "antd";
import { DocumentDTO } from "../../../../entity/props/DocumentDTO";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import EditorComponent from "../../editor/EditorComponent";
import { UploadOutlined } from "@ant-design/icons";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";



const skill = ['Listening', 'Writing', 'Speaking', 'Reading'];
const topics = ['TOEIC', 'IELTS', 'THPT', 'VSTEP', 'APTIS'];


const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const DocumentForm: React.FC<{onSubmit: (e:any) => void, docFormRef: any, item?: DocumentDTO}> 
                                    = ({onSubmit, docFormRef, item}) => {
    const [form] = Form.useForm();
    const [dataEditor, setDataEditor] = useState<string>();
    form.resetFields();


    if(item != undefined) {
        form.setFieldsValue({
            documentName: item.documentName,
            documentId: item.documentId,
            summary: item.summary,
            status: item.status,
            thumbnail: [
                {
                    name: item.thumbnail,
                    type: 'image/',
                    response: {
                        default: item.thumbnail
                    }
                }
            ],
            link: [
                {
                    name: item.link,
                    type: item.type,
                    response: {
                        default: item.link
                    }
                }
            ]
        });

        for(const sk of skill) {
            if(item.skill.includes(sk.toLocaleLowerCase())) {
                const s = form.getFieldValue('skill') == undefined ? [] : form.getFieldValue('skill');
                s.push(sk);
                form.setFieldValue('skill', s);
            }
        }

        for(const sk of topics) {
            if(item.topic.includes(sk.toLocaleLowerCase())) {
                const s = form.getFieldValue('topic') == undefined ? [] : form.getFieldValue('topic');
                s.push(sk);
                form.setFieldValue('topic', s);
            }
        }

        // for(const sk of englishFor) {
        //     if(item.englishFor.includes(sk.toLocaleLowerCase().replace(/ /g, ''))) {
        //         const s = form.getFieldValue('englishFor') == undefined ? [] : form.getFieldValue('englishFor');
        //         s.push(sk);
        //         form.setFieldValue('englishFor', s);
        //     }
        // }

    }

    const preview = (e: any) => {
        console.log('preview', e);
    }

    const handleEditor = (value: string) => {
        form.setFieldsValue({
            content: value
        });
    }

    return <div className="document-form" style={{maxWidth: '1200px'}}>
        <Form
            form={form}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            style={{ width: 1200 }}
            onFinish={onSubmit}
            ref={docFormRef}
        >
            <Form.Item 
            label="Document ID"
            name="documentId"
            style={item == undefined ? {display: "none"} : {}}>
                <Input disabled/>
            </Form.Item>
            <Form.Item 
            label="Document Name"
            name="documentName"
            rules={[{ required: true, message: 'Please input document name' }]}
            required={true}>
                <Input />
            </Form.Item>
            <Form.Item 
            label="Summary"
            name="summary"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch />
            </Form.Item>
            
            <Form.Item 
            label="Skill"
            name="skill"
            rules={[{ required: true, message: 'Please select skill for blog' }]}
            required={true}>
                <Select
                    mode="multiple"
                    options={skill.map(e => {
                        return {
                            value: e.toLocaleLowerCase(),
                            label: e
                        };
                    })}
                />
            </Form.Item>
            <Form.Item 
            label="Topic"
            name="topic">
                <Select
                    mode="multiple"
                    options={topics.map(e => {
                        return {
                            value: e.toLocaleLowerCase(),
                            label: e
                        };
                    })}
                />
            </Form.Item>
            <Form.Item 
            label="Thumbnail" 
            name="thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action={URL_UPLOAD_RESOURCE} onChange={preview}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item 
            label="Upload Resource" 
            name="link" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action={URL_UPLOAD_RESOURCE} onChange={preview}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
        </Form>
    </div>
}


export default DocumentForm;