import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { URL_UPLOAD_RESOURCE, URL_UPLOAD_RESOURCE_CK } from '../../../entity/Contants';


const EditorComponent: React.FC<{class_name: string, data?: string | undefined, setContent: (value: string) => void}> 
    = ({class_name, data, setContent}) => {
    console.log('data content', data);
    console.log('data class', class_name);
    return <div className={`${class_name}`} >
        <CKEditor
            editor={ClassicEditor}
            data={data || ""}
            config={
                {
                    ckfinder: {
                        uploadUrl: URL_UPLOAD_RESOURCE_CK
                    }
                }
            }
            onReady={editor => {
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, data) => {
                console.log('data', data);
            }}
            onBlur={(event, editor) => {
                console.log('on blur', editor.getData());
                localStorage.setItem("editor", editor.getData());
                setContent(editor.getData());
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    </div>
}


export default EditorComponent;