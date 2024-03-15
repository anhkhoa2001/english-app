import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomClasssicEditor from './CustomClasssicEditor';

const EditorComponent: React.FC<{class_name: string, data?: string | undefined, setContent: (value: string) => void}> 
    = ({class_name, data, setContent}) => {

        return <div className={`${class_name}`} >
        <CKEditor
		 	//@ts-ignore
            editor={CustomClasssicEditor}
            data={data || ""}
            onReady={editor => {
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, data) => {
                console.log('data', data);
            }}
            onBlur={(event, editor) => {
				 //@ts-ignore
                console.log('on blur', editor.getData());
				 //@ts-ignore
                setContent(editor.getData());
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    </div>
}


export default EditorComponent;