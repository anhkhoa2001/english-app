import { Button, Form, Input, Select, Switch, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import EditorComponent from "../../editor/EditorComponent";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import { UploadOutlined } from "@ant-design/icons";
import { BlogDTO } from "../../../../entity/props/BlogItemDTO";

const skill = ['Listening', 'Writing', 'Speaking', 'Reading'];
const englishBasic = ['Pronunciation', 'Grammary', 'Vocabulary'];
const englishFor = ['For Newbie', 'For Oversea Student', 'For Working People'];


const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const BlogForm: React.FC<{onSubmit: (e:any) => void, blogFormRef: any, item?: BlogDTO}> 
                                    = ({onSubmit, blogFormRef, item}) => {

    const [form] = Form.useForm();
    const [dataEditor, setDataEditor] = useState<string>();
    form.resetFields();


    useEffect(() => {
        setDataEditor(item?.content || "?");
    }, []);

    if(item != undefined) {
        form.setFieldsValue({
            title: item.title,
            summary: item.summary,
            status: item.status,
            content: item.content,
            thumbnail: [
                {
                    name: item.thumbnail,
                    type: 'image/',
                    response: {
                        default: item.thumbnail
                    }
                }
            ]
        });

        for(const sk of skill) {
            if(item.skill.includes(sk.toLocaleLowerCase())) {
                const s = form.getFieldValue('skill') == undefined ? [] : form.getFieldValue('skill');
                console.log('skills', s);
                s.push(sk);
                console.log('skills aster', s);
                form.setFieldValue('skill', s);
            }
        }

        for(const sk of englishBasic) {
            if(item.englishBasic.includes(sk.toLocaleLowerCase())) {
                const s = form.getFieldValue('englishBasic') == undefined ? [] : form.getFieldValue('englishBasic');
                s.push(sk);
                form.setFieldValue('englishBasic', s);
            }
        }

        for(const sk of englishFor) {
            if(item.englishFor.includes(sk.toLocaleLowerCase().replace(/ /g, ''))) {
                const s = form.getFieldValue('englishFor') == undefined ? [] : form.getFieldValue('englishFor');
                s.push(sk);
                form.setFieldValue('englishFor', s);
            }
        }

    }

    const preview = (e: any) => {
        console.log('preview', e);
    }

    const handleEditor = (value: string) => {
        form.setFieldsValue({
            content: value
        });
    }

    return <div className="course-form" style={{maxWidth: '1200px'}}>
        <Form
            form={form}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            style={{ width: 1600 }}
            onFinish={onSubmit}
            ref={blogFormRef}
        >
            <Form.Item 
            label="Title Blog"
            name="title"
            rules={[{ required: true, message: 'Please input title blog' }]}
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
            label="English Basic"
            name="englishBasic">
                <Select
                    mode="multiple"
                    options={englishBasic.map(e => {
                        return {
                            value: e.toLocaleLowerCase(),
                            label: e
                        };
                    })}
                />
            </Form.Item>
            <Form.Item 
            label="English For"
            name="englishFor">
                <Select
                    mode="multiple"
                    options={englishFor.map(e => {
                        return {
                            value: e.toLocaleLowerCase().replace(/ /g, ''),
                            label: e
                        };
                    })}
                />
            </Form.Item>
            <Form.Item label="Content" name="content">
                <EditorComponent class_name="tall" data={dataEditor} setContent={handleEditor} />
            </Form.Item>
            <Form.Item 
            rules={[{ required: true, message: 'Please input thumbnail file' }]}
            label="Thumbnail" 
            name="thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action={URL_UPLOAD_RESOURCE} onChange={preview}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            {/* <Form.Item label="Description" name="description">
                <EditorComponent class_name="tall" data={dataEditor} setContent={handleEditor} />
            </Form.Item>
            <Form.Item label="Public" name="public" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item 
            rules={[{ required: true, message: 'Please input thumbnail file' }]}
            label="Thumbnail" 
            name="thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action={URL_UPLOAD_RESOURCE} onChange={preview}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item> */}
        </Form>
    </div>
}


export default BlogForm;