import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Switch, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import EditorComponent from "../../editor/EditorComponent";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import { ExamDTO } from "../../../../service/ExamService";
import { useEffect, useState } from "react";

const typeExams = ['TOEIC', 'THPT', 'IELTS'];
const skills = ['Listening', 'Speaking', 'Writing', 'Reading', 'Other...'];

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const ExamForm: React.FC<{onSubmit: (e:any) => void, examFormRef: any, item?: ExamDTO}> 
                                    = ({onSubmit, examFormRef, item}) => {
    const [form] = Form.useForm();
    const [dataEditor, setDataEditor] = useState<string>();
    form.resetFields();


    const handleContent = (value: string) => {
        console.log('value handle ', value);
        form.setFieldsValue({
            description: value
        });
    }

    form.setFieldsValue({
        skill: skills[0],
        type: typeExams[0]
    });

    if(item != undefined) {
        console.log('exam item', item);
        useEffect(() => {
            setDataEditor(item.description);
        }, []);
        form.setFieldsValue({
            examCode: item.examCode,
            examName: item.examName,
            skill: item.skill,
            status: item.status,
            type: item.type,
            thumbnail: [
                {
                    name: item.thumbnail,
                    type: 'image/',
                    response: {
                        default: item.thumbnail
                    }
                }
            ],
            summary: item.summary,
            description: item.description
        });
    }
    return <div className="exam-form" style={{maxWidth: '1200px'}}>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: 1200 }}
            onFinish={onSubmit}
            ref={examFormRef}
            form={form}
        >
            <Form.Item 
              label="Examination Code"
              name="examCode"
              rules={[{ required: true, message: 'Please input course code' }]}
              required={true}>
                  <Input disabled={item != undefined} />
            </Form.Item>
            <Form.Item 
              label="Examination Name"
              name="examName"
              rules={[{ required: true, message: 'Please input course code' }]}
              required={true}>
                  <Input />
            </Form.Item>
            <Form.Item 
              label="Status"
              name="status">
                 <Switch />
            </Form.Item>
            <Form.Item name = "summary" label="Summary">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Skill" name = "skill">
                <Select defaultValue={skills[0]}>
                    {skills.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Exam Type" name = "type">
                <Select defaultValue={typeExams[0]}>
                    {typeExams.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Thumbnail" name = "thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action={URL_UPLOAD_RESOURCE}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item label="Description" name = "description">
                <EditorComponent class_name="medium" data={dataEditor} setContent={handleContent}/>
            </Form.Item>
        </Form>
    </div>
}


export default ExamForm;