
export const TypeExam =  {
    TOEIC: 'TOEIC',
    THPT: 'THPT',
    IELTS: 'IELTS',
    Minitest: 'Minitest'
}

export const TypeQuestion =  {
    MULTI_CHOICE: 0,
    TEXT_FILLING: 1,
}


export const BASE_PATH =  {
    PATH_USER_SERVICE: 'http://localhost:9001',
    PATH_GATEWAY: 'http://localhost:9000',
    PATH_FE: 'http://localhost:5173',
    PATH_PROXY: 'http://localhost:9001'
}

export const BEARER = "Bearer ";

export const URL_UPLOAD_RESOURCE = `${BASE_PATH.PATH_PROXY}/up-file/upload-to-cloud`;

export const URL_UPLOAD_RESOURCE_CK = `${BASE_PATH.PATH_PROXY}/up-file/upload-for-ckeditor`;
