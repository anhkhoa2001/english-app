import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from "antd";
import { useState } from "react";


const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const levels = ['Beginner', 'Intermediate', 'Expert'];

const CourseForm: React.FC = () => {
    return <div className="course-form" style={{maxWidth: '1200px'}}>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: 1200 }}
        >
            <Form.Item 
            label="Course Name"
            rules={[{ required: true, message: 'Please input your name' }]}
            required={true}>
                <Input />
            </Form.Item>
            <Form.Item label="Summary">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Level">
                <Select>
                    {levels.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                    
                </Select>
            </Form.Item>
            <Form.Item label="Description">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Public" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Status" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
        </Form>
    </div>
}


export default CourseForm;