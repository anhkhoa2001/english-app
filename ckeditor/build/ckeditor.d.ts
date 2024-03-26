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
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import Font from '@ckeditor/ckeditor5-font/src/font';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import { AutoImage } from '@ckeditor/ckeditor5-image';
import { ImageInsert } from '@ckeditor/ckeditor5-image';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { FontSize } from '@ckeditor/ckeditor5-font';
declare class Editor extends ClassicEditor {
    constructor(props: any);
    static builtinPlugins: (typeof Alignment | typeof BlockQuote | typeof Bold | typeof Essentials | typeof Heading | typeof Image | typeof ImageToolbar | typeof ImageUpload | typeof Italic | typeof Link | typeof Paragraph | typeof PasteFromOffice | typeof Table | typeof TableToolbar | typeof Undo | typeof SimpleUploadAdapter | typeof ImageStyle | typeof Font | typeof AutoImage | typeof ImageInsert | typeof FontSize)[];
    private static CURRENT_USER;
    static defaultConfig: EditorConfig;
}
export default Editor;
