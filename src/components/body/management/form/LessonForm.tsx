import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Select, Switch, Upload } from "antd";
import { URL_UPLOAD_RESOURCE } from "../../../../entity/Contants";
import { useEffect, useState } from "react";
import PreViewVideo from "../course/PreviewVideo";
import { ModalCustom } from "../../../exception/SuccessModal";
import { LessonDTO } from "../../../../entity/props/LessonDTO";
import { MessageResponse } from "../../../../entity/response/MessageResponse";
import { ExamDTO } from "../../../../entity/props/ExamDTO";
import { ExamService } from "../../../../service/ExamService";

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
    section_name: string, 
    sectionId: number,
    item?: LessonDTO
    onSubmit: (e: any) => void, lessonFormRef: any
}> =
    ({ onSubmit, section_name, sectionId, lessonFormRef, item }) => {
        const [form] = Form.useForm();
        const [exams, setExams] = useState<ExamDTO[]>([]);
        const [itemExam, setItemExam] = useState<ExamDTO>(new ExamDTO([]));

        console.log('item', item);
        form.setFieldsValue({
            sectionId: sectionId,
            sectionName: section_name
        });

        const [video, setVideo] = useState<string>();
        const [image, setImage] = useState<string>();
        const [isLesson, setIsLesson] = useState<boolean>(true);

        const loadExam: (data: MessageResponse<ExamDTO[]> | null) => void = (data) => {
            setExams(data?.data || []);
            for(const d of (data?.data || [])) {
                if(d.examCode == item?.examModel.examCode){
                    form.setFieldValue('examName', d.examName);
                    form.setFieldValue('examPartId', item.examModel.id);
                }
            }
        }

        useEffect(() => {
            // setVideo(item?.url_video);
            // setImage(item?.thumbnail);

            if (item?.lesson_id != undefined) {
                form.setFieldsValue({
                    lessonId: item.lesson_id,
                    lessonName: item?.lessionName,
                    status: item?.status,
                    description: item?.description,
                    type: item?.type || 'Lesson'
                });
                console.log('checktype', item.type != 'Minitest');
                setIsLesson(item.type != 'Minitest');
                if(item.type == 'Minitest') {
                    form.setFieldsValue({
                        status: item?.status,
                        description: item?.description
                    });
                    ExamService.getExamByConditionNoPagination({
                        types: ['Minitest']
                    }, loadExam);
                } else {
                    form.setFieldsValue({
                        thumbnail: [{
                            name: item.thumbnail,
                            response: {
                                default: item.thumbnail
                            }
                        }] || [],
                        video: [{
                            name: item.url_video,
                            response: {
                                default: item.url_video
                            }
                        }]
                    });
                }
                
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

        const changeType = (e: string) => {
            console.log('type', e);
            if(e === 'Minitest') {
                ExamService.getExamByConditionNoPagination({
                    types: [e]
                }, loadExam);
            }
            setIsLesson(e === 'lesson');
        }

        const onChangeExam = (e: string) => {
            console.log('change exam', e);
            for(const ex of exams) {
                if(ex.examCode === e) {
                    console.log('ex', ex);
                    setItemExam(ex);
                }
            }
        }

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
                    label="Lesson Id"
                    name="lessonId"
                    style={{display: item ? "block" : "none"}}
                >
                    <Input defaultValue={item?.lesson_id || 0} disabled={true} />
                </Form.Item>
                <Form.Item
                    label="Session Id"
                    name="sectionId"
                    style={{display:  "none"}}
                >
                    <Input defaultValue={item?.lesson_id || 0} disabled={true} />
                </Form.Item>
                <Form.Item
                    label="Section Name"
                    name="sectionName"
                    required={true}
                >
                    <Input defaultValue={section_name} disabled={true} />
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                    required={true}
                >
                    <Select
                        defaultValue="lesson"
                        allowClear
                        onChange={changeType}
                        options={[
                            { value: 'lesson', label: 'Lesson' },
                            { value: 'Minitest', label: 'Minitest' }
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Lesson Name"
                    name="lessonName"
                    required={true}
                >
                    <Input />
                </Form.Item>
                {
                    isLesson ?
                        <>
                            
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
                                <PreViewVideo url_video={video || ""} url_image={image || ""} width={400} />
                            </div>
                        </>
                        :
                        <>
                            <Form.Item
                                label="Exam Minitest Name"
                                name="examName"
                            >
                                <Select
                                    defaultValue={itemExam.examCode}
                                    onChange={onChangeExam}
                                    options={exams.map(e => {
                                        return {
                                            value: e.examCode,
                                            label: e.examName
                                        }
                                    })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Part"
                                name="examPartId"
                            >
                                <Select
                                    allowClear
                                    options={itemExam.parts.map(e => {
                                        return {
                                            value: e.id,
                                            label: e.partId + ' - ' +  itemExam.examName
                                        }
                                    })}
                                />
                            </Form.Item>
                        </>
                }
                <Form.Item label="Description"
                    name="description">
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </div>
    }


export default LessonForm;