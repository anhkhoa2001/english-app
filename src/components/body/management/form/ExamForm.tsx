import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Switch, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import EditorComponent from "../../editor/EditorComponent";

const typeExams = ['TOEIC', 'THPT', 'IELTS'];
const skills = ['Listening', 'Speaking', 'Writing', 'Reading', 'Other...'];



const ExamForm: React.FC = () => {
    return <div className="exam-form" style={{maxWidth: '1200px'}}>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: 1200 }}
        >
            <Form.Item 
              label="Examination Name"
              required={true}>
                  <Input />
            </Form.Item>
            <Form.Item label="Summary">
                <EditorComponent class_name="medium" />
            </Form.Item>
            <Form.Item label="Skill">
                <Select>
                    {skills.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Exam Type">
                <Select>
                    {typeExams.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Thumbnail" valuePropName="fileList" >
                <Upload action="/upload.do">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item label="Description">
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    </div>
}


export default ExamForm;