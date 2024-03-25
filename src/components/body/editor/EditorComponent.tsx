import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomClasssicEditor from './CustomClasssicEditor';
import './EditorComponent.scss';

const EditorComponent: React.FC<{class_name: string, data?: string, setContent: (value: string) => void}> 
    = ({class_name, data, setContent}) => {

        const [dataEditor, setDataEditor] = useState<string>();
        useEffect(() => {
            setDataEditor(data);
        }, [data]);

        return <div className={`${class_name}`} >
            <CKEditor
                //@ts-ignore
                editor={CustomClasssicEditor}
                data={dataEditor}
                id={'ckeditor'}
                onReady={editor => {
                }}
                onChange={(event, editor) => {
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