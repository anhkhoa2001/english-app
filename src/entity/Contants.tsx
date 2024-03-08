
export const TypeExam =  {
    TOEIC: 0,
    THPT: 1,
    IELTS: 2
}

export const TypeQuestion =  {
    MULTI_CHOICE: 0,
    TEXT_FILLING: 1,
}


export const BASE_PATH =  {
    PATH_USER_SERVICE: 'http://localhost:9001',
    PATH_GATEWAY: 'http://localhost:9000',
    PATH_FE: 'http://localhost:5173',
    PATH_PROXY: 'http://localhost:9999'
}

export const BEARER = "Bearer ";


export interface UserInfo {
    avatar: string;
    fullname: string;
    username: string;
    email: string;
}

export const URL_UPLOAD_RESOURCE = "http://localhost:9999/api/up-file/upload-to-cloud";

export const URL_UPLOAD_RESOURCE_CK = "http://localhost:9999/api/up-file/upload-for-ckeditor";
