import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Switch, Upload } from "antd";

const { TextArea } = Input;


const LessonForm: React.FC = () => {
    return <div className="lesson-form" style={{width: '900px'}}>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: '900px' }}
        >
            <Form.Item 
            label="Section Name"
            required={true}
            >
                <Input  disabled={true} />
            </Form.Item>
            <Form.Item 
            label="Lesson Name"
            required={true}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Status" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Thumbnail" valuePropName="thumbnail" >
                <Upload action="/upload.do">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item label="Video" valuePropName="video" >
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


export default LessonForm;