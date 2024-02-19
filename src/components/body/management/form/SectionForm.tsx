import { Button, Form, Input, Select, Switch, Upload } from "antd";

const { TextArea } = Input;


const SectionForm: React.FC<{onSubmit: (e:any) => void, formRef: any}> = ({onSubmit, formRef}) => {
    return <div className="section-form" style={{width: '900px'}}>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: '900px' }}
            onFinish={onSubmit}
            ref={formRef}
        >
            <Form.Item 
            label="Section Name"
            name="sectionName"
            required={true}>
                <Input />
            </Form.Item>
            <Form.Item 
            name="status"
            label="Status" 
            valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item 
            name="description"
            label="Description">
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    </div>
}


export default SectionForm;