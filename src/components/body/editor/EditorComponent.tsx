import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditorComponent: React.FC<{class_name: string, content?: any}> 
    = (class_name, content) => {
        console.log('c', content);
    return <div className={`${class_name}`} >
        <CKEditor
            editor={ClassicEditor}
            data=""
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
                console.log('Blur.', content);
                content.current = editor.getData();
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    </div>
}


export default EditorComponent;