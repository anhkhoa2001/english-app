import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditorComponent: React.FC<{class_name: string}> = (class_name) => {
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
            onChange={(event) => {
                console.log(event);
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    </div>
}


export default EditorComponent;