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

const CourseForm: React.FC<{onSubmit: (e:any) => void, courseFormRef: any}> = ({onSubmit, courseFormRef}) => {
    return <div className="course-form" style={{maxWidth: '1200px'}}>
        <Form
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
                <Select>
                    {levels.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                    
                </Select>
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
            <Form.Item label="Thumbnail" name="thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="http://localhost:9999/api/up-file/upload-to-cloud">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
        </Form>
    </div>
}


export default CourseForm;