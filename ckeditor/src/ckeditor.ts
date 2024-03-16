/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import Font from '@ckeditor/ckeditor5-font/src/font';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import { AutoImage } from '@ckeditor/ckeditor5-image';
import { ImageInsert } from '@ckeditor/ckeditor5-image';
import { Alignment } from '@ckeditor/ckeditor5-alignment';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {

	constructor(props : any) {
		super(props)

		{
			(window as any).globalEditor = this;
		}

	}

	public static override builtinPlugins = [
		Alignment,
		BlockQuote,
		Bold,
		Essentials,
		Heading,
		Image,
		ImageToolbar,
		ImageUpload,
		Indent,
		Italic,
		Link,
		Paragraph,
		PasteFromOffice,
		Table,
		TableToolbar,
		Undo,
		SimpleUploadAdapter , 
		ImageStyle,
		Font,
		AutoImage,
		ImageInsert ,
	];

	private static CURRENT_USER : any = JSON.parse((localStorage.getItem('currentUser')) as any)

	public static override defaultConfig: EditorConfig = {
		
		toolbar: {
			items: [
				'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
				'|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify',
				'heading',
				'|',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'|',
				'insertImage',
				'blockQuote',
				'insertTable',
				'undo',
				'redo',
			]
		},
		language: 'en',
		image: {
			toolbar:  [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		simpleUpload : {
			uploadUrl :  "http://localhost:9001/api/up-file/upload-for-ckeditor"
		},
	}
}

export default Editor;
