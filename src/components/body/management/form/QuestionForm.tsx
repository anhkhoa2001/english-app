
import { Checkbox, Form, Input, Select } from 'antd';
import '../css/QuestionForm.scss'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CheckOutlined } from '@ant-design/icons';

const types = ['Single', 'Group'];

const QuestionForm: React.FC = () => {
    return <div className="question-form">
        <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            style={{ width: 1300 }}
        >
            <Form.Item label="Type Question">
                <Select value={types[0]}>
                    {types.map(e => {
                        return <Select.Option value={e}>{e}</Select.Option>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Content" className='content'>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        ckfinder: {
                            uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                        }
                    }}
                    data="<img src='https://study4.com/media/ets2023/img/1/image15.png' alt='' />"
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                />
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