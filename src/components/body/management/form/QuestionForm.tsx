
import { Checkbox, Form, Input, Select } from 'antd';
import '../css/QuestionForm.scss'
import { CheckOutlined } from '@ant-design/icons';
import EditorComponent from '../../editor/EditorComponent';

const types = ['Single', 'Group'];

const QuestionForm: React.FC = () => {

    const handleContent = (value: string) => {

    }
    return <div className="question-form">
        <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            style={{ width: 1300 }}
        >
            <Form.Item label="Type Question">
                <Select defaultValue={types[0]}>
                    {types.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Content" className='content'>
                 <EditorComponent class_name="tall" setContent={handleContent}/>
            </Form.Item>
            <Form.Item label="List Question">
                <Checkbox defaultChecked={false} >Dap an A <CheckOutlined color='green' /></Checkbox>
                <br />
                <Checkbox />
                <br />
                <Checkbox />
            </Form.Item>
        </Form>
    </div>
}


export default QuestionForm;