import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Switch, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import EditorComponent from "../../editor/EditorComponent";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";

const typeExams = ['TOEIC', 'THPT', 'IELTS'];
const skills = ['Listening', 'Speaking', 'Writing', 'Reading', 'Other...'];

const ExamForm: React.FC<{onSubmit: (e:any) => void, examFormRef: any}> 
                                    = ({onSubmit, examFormRef}) => {
    const [form] = Form.useForm();
    form.resetFields();

    form.setFieldsValue({
        skill: skills[0],
        type: typeExams[0]
    });
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
              label="Examination Name"
              name="examName"
              
              required={true}>
                  <Input />
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
            <Form.Item label="Thumbnail" name = "thumbnail" valuePropName="fileList" >
                <Upload action={URL_UPLOAD_RESOURCE}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item label="Description" name = "description">
                <EditorComponent class_name="medium" />
            </Form.Item>
        </Form>
    </div>
}


export default ExamForm;