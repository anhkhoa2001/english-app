
import { Form, Input } from 'antd';
import '../css/QuestionForm.scss'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const QuestionForm: React.FC = () => {
    return <div className="question-form" style={{ maxWidth: '1200px' }}>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ width: 1200 }}
        >
            <div className="content">
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
            </div>
        </Form>
    </div>
}


export default QuestionForm;