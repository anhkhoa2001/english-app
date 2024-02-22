import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Switch, Upload } from "antd";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import { useState } from "react";
import PreViewVideo from "../course/PreviewVideo";
import { ModalCustom } from "../../../exception/SuccessModal";

const { TextArea } = Input;

interface Resource {
    url: string,
    isLimit: boolean,
    files: any[]
}

const LessonForm: React.FC<{ section_name: string, section_code: string, 
    onSubmit: (e:any) => void, lessonFormRef: any }> = ({onSubmit, section_name, section_code, lessonFormRef }) => {
    const [form] = Form.useForm();
    form.resetFields();
    const [video, setVideo] = useState<Resource>();
    const [image, setImage] = useState<Resource>();


    // const handleVideoChange = (info: any) => {
    //     if (info.file.status === 'done') {
    //         console.log('success', info.file);
    //         const r: Resource = {
    //             url: info.file.response.default,
    //             isLimit: true,
    //             files: [info.file]
    //         }
    //         setVideo(r);
    //     } else if (info.file.status === 'error') {
    //         console.log('failed', info.file);
    //     }
    // };

    // const handleImageChange = (info: any) => {
    //     if (info.file.status === 'error') {
    //         ModalCustom.onDisplayError('Failed', 'upload file failed!!!');
    //     } else if (info.file.status === 'done') {
    //         console.log(info.file);
    //         const r: Resource = {
    //             url: info.file.response.default,
    //             isLimit: true,
    //             files: [info.file]
    //         }
    //         setImage(r);
    //     }
    // };


    return <div className="lesson-form" style={{ width: '900px' }}>
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: '900px' }}
            onFinish={onSubmit}
            ref={lessonFormRef}
        >
            <Form.Item
                label="Section Code"
                name="sectionCode"
                style={{ display: "none" }}
            >
                <Input defaultValue={section_code} disabled={true} />
            </Form.Item>
            <Form.Item
                label="Section Name"
                name="sectionName"
                required={true}
            >
                <Input defaultValue={section_name} disabled={true} />
            </Form.Item>
            <Form.Item
                label="Lesson Name"
                name="lessonName"
                required={true}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Status"
                valuePropName="checked"
                name="status"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                label="Thumbnail"
                valuePropName="thumbnail"
                name="thumbnail"
            >
                <Upload
                    action={URL_UPLOAD_RESOURCE}
                    //onChange={handleImageChange}
                    fileList={image?.files}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="Video"
                valuePropName="video"
                name="video"
            >
                <Upload
                    action={URL_UPLOAD_RESOURCE}
                    //onChange={handleVideoChange} 
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <div className="preview-video" style={{ textAlign: "center", marginBottom: "30px" }}>
                <PreViewVideo url_video={video?.url || ""} url_image={image?.url || ""} />
            </div>
            <Form.Item label="Description"
                name="des">
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    </div>
}


export default LessonForm;