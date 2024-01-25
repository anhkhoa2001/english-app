import { Button, Form, Input, Select, Switch, Upload } from "antd";

const { TextArea } = Input;


const SectionForm: React.FC<{onSubmit: (e:any) => void}> = ({onSubmit}) => {
    return <div className="section-form" style={{width: '900px'}}>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: '900px' }}
            onFinish={onSubmit}
        >
            <Form.Item 
            label="Section Name"
            required={true}>
                <Input />
            </Form.Item>
            <Form.Item label="Status" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Description">
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    </div>
}


export default SectionForm;