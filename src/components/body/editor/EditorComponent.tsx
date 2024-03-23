import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomClasssicEditor from './CustomClasssicEditor';

const EditorComponent: React.FC<{class_name: string, data?: string | undefined, setContent: (value: string) => void}> 
    = ({class_name, data, setContent}) => {
        console.log('data editor', data);
        return <div className={`${class_name}`} >
            <CKEditor
                //@ts-ignore
                editor={CustomClasssicEditor}
                data={data || 'xyz'}
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