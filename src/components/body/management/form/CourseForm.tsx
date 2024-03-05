import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from "antd";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import EditorComponent from "../../editor/EditorComponent";
import { useEffect, useState } from "react";
import { CourseItemDTO } from "../../../../entity/props/CourseItemDTO";
import { CourseDTO } from "../../../../service/CourseService";


const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const levels = ['Beginner', 'Intermediate', 'Expert'];

const CourseForm: React.FC<{onSubmit: (e:any) => void, courseFormRef: any, item?: CourseDTO}> 
                                    = ({onSubmit, courseFormRef, item}) => {
    const [form] = Form.useForm();
    const [dataEditor, setDataEditor] = useState<string>();
    form.resetFields();

    form.setFieldsValue({
        level: levels[0],
        description: localStorage.getItem("editor")
    });

    if(item != undefined) {
        useEffect(() => {
            setDataEditor(item.description);
            console.log('course item', item);
        }, []);
        form.setFieldsValue({
            level: item.level,
            courseCode: item.code,
            courseName: item.courseName,
            summary: item.summary,
            status: item.status,
            public: item.public,
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
    }

    const handleSubmit = (e: any) => {
        e.description = localStorage.getItem("editor");
        onSubmit(e);
    }

    return <div className="course-form" style={{maxWidth: '1200px'}}>
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: 1200 }}
            onFinish={handleSubmit}
            ref={courseFormRef}
        >
            <Form.Item 
            label="Course Code"
            name="courseCode"
            rules={[{ required: true, message: 'Please input course code' }]}
            required={true}>
                <Input disabled={item != undefined}/>
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
                <EditorComponent class_name="tall" data={dataEditor} />
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
                <Upload action={URL_UPLOAD_RESOURCE}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
        </Form>
    </div>
}


export default CourseForm;