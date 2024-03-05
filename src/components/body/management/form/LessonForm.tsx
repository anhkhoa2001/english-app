import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Switch, Upload } from "antd";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import { useEffect, useState } from "react";
import PreViewVideo from "../course/PreviewVideo";
import { ModalCustom } from "../../../exception/SuccessModal";
import { LessonDTO } from "../../../../entity/props/LessonDTO";

const { TextArea } = Input;

interface Resource {
    url: string,
    isLimit: boolean,
    files: any[]
}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const LessonForm: React.FC<{
    section_name: string, section_id: number,
    item?: LessonDTO
    onSubmit: (e: any) => void, lessonFormRef: any
}> =
    ({ onSubmit, section_name, section_id, lessonFormRef, item }) => {
        const [form] = Form.useForm();
        form.setFieldsValue({
            section_id: section_id,
            sectionName: section_name
        });

        const [video, setVideo] = useState<string>();
        const [image, setImage] = useState<string>();

        useEffect(() => {
            console.log('checl');
            setVideo(item?.url_video);
            setImage(item?.thumbnail);

            if(item?.lesson_id != undefined) {
                form.setFieldsValue({
                    lessonName: item?.lessionName,
                    status: item?.status,
                    thumbnail: [{
                        name: image,
                        response: {
                            default: image
                        }
                    }] || [],
                    video: [{
                        name: video,
                        response: {
                            default: video
                        }
                    }],
                    des: item?.description
                });
            } else {
                form.resetFields();
            }
        }, [item]);

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

        const handleImageChange = (info: any) => {
            if (info.file.status === 'error') {
                ModalCustom.onDisplayError('Failed', 'upload file failed!!!');
            } else if (info.file.status === 'done') {
                console.log(info.file);
                setImage(info.file.response.default);
            }
        };


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
                    label="Section Id"
                    name="section_id"
                    style={{ display: "none" }}
                >
                    <Input defaultValue={section_id} disabled={true} />
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
                    name="thumbnail"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        action={URL_UPLOAD_RESOURCE}
                        onChange={handleImageChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Video"
                    name="video"
                    valuePropName="fileList" getValueFromEvent={normFile}
                >
                    <Upload
                        action={URL_UPLOAD_RESOURCE}
                    //onChange={handleVideoChange} 
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <div className="preview-video" style={{ textAlign: "center", marginBottom: "30px" }}>
                    <PreViewVideo url_video={video || ""} url_image={image || ""} width={400}/>
                </div>
                <Form.Item label="Description"
                    name="des">
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </div>
    }


export default LessonForm;