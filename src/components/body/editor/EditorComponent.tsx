import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomClasssicEditor from './CustomClasssicEditor';
import './EditorComponent.scss';

const EditorComponent: React.FC<{class_name: string, data?: string, setContent: (value: string) => void}> 
    = ({class_name, data, setContent}) => {
        const [dataEditor, setDataEditor] = useState<string>(data || "1");
        return <div className={`${class_name}`} >
            <CKEditor
                //@ts-ignore
                editor={CustomClasssicEditor}
                data={dataEditor || 'xyz'}
                onReady={editor => {
                    console.log('Editor is ready to use!', data);
                }}
                onChange={(event, data) => {
                    console.log('data', data);
                }}
                onBlur={(event, editor) => {
                    //@ts-ignore
                    setContent(editor.getData());
                }}
                onFocus={(event, editor) => {
                }}
            />
        </div>
}


export default EditorComponent;