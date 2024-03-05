import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditorComponent: React.FC<{class_name: string, data?: string | undefined}> 
    = ({class_name, data}) => {
    console.log('data content', data);
    console.log('data class', class_name);
    return <div className={`${class_name}`} >
        <CKEditor
            editor={ClassicEditor}
            data={data || ""}
            config={
                {
                    ckfinder: {
                        uploadUrl: "/upload"
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
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    </div>
}


export default EditorComponent;