import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from "antd";


const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const levels = ['Beginner', 'Intermediate', 'Expert'];

const CourseForm: React.FC<{onSubmit: (e:any) => void, courseFormRef: any}> = ({onSubmit, courseFormRef}) => {
    const [form] = Form.useForm();
    form.resetFields();
    return <div className="course-form" style={{maxWidth: '1200px'}}>
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: 1200 }}
            onFinish={onSubmit}
            ref={courseFormRef}
        >
            <Form.Item 
            label="Course Code"
            name="courseCode"
            rules={[{ required: true, message: 'Please input course code' }]}
            required={true}>
                <Input />
            </Form.Item>
            <Form.Item 
            label="Course Name"
            name="courseName"
            rules={[{ required: true, message: 'Please input course name' }]}
            required={true}>
                <Input />
            </Form.Item>
            <Form.Item 
            label="Summary"
            name="summary"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item 
            label="Level"
            name="level">
                <Select
                    defaultValue={levels[0]}
                    options={levels.map(e => {
                        return {
                            value: e,
                            label: e
                        };
                    })}
                />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <TextArea rows={4} />
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
                <Upload action="http://localhost:9999/api/up-file/upload-to-cloud">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
        </Form>
    </div>
}


export default CourseForm;