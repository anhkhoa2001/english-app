import { BASE_PATH } from "../entity/Contants";
import RestService from "./RestService";
import { ModalCustom } from "../components/exception/SuccessModal";
import { CourseItemDTO } from "../entity/props/CourseItemDTO";
import { LessonDTO } from "../entity/props/LessonDTO";
import { SectionDTO } from "../entity/props/SectionDTO";
import { MessageResponse } from "../entity/response/MessageResponse";

export interface CourseDTO {
    code: string,
    courseName: string,
    description: string,
    level: string,
    status: true,
    summary: string,
    thumbnail: string,
    createBy: string,
    createAt: Date,
    public: true,
    totalSub: number,
    rate: number,
    lectures: number,
    totalStudent: number
}


export interface CourseListResponse {
    data: CourseDTO[],
    totalRecord: number
}

const CourseService = {
    getAllCourse: async ( page: number, pageSize: number, func: (data: MessageResponse<CourseDTO[]> | null) => void) =>  {
        new RestService<CourseDTO[]>().post(
            BASE_PATH.PATH_PROXY + '/course/get-all',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {
                page: page,
                pageSize: pageSize
            },
            (status: number, data: MessageResponse<CourseDTO[]> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get All course failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    getAllCoursePublic: async ( request: any, func: (data: MessageResponse<CourseListResponse> | null) => void) =>  {
        new RestService<CourseListResponse>().post(
            BASE_PATH.PATH_PROXY + '/course/get-courses-public',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<CourseListResponse> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get All course public failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    create: ( request: any, func: (data: MessageResponse<CourseDTO> | null) => void) =>  {
        new RestService<CourseDTO>().post(
            BASE_PATH.PATH_PROXY + '/course/create',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<CourseDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create course failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    update: ( request: any, func: (data: MessageResponse<CourseDTO> | null) => void) =>  {
        new RestService<CourseDTO>().post(
            BASE_PATH.PATH_PROXY + '/course/update',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<CourseDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create course failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    createSection: ( request: any, func: (data: MessageResponse<SectionDTO> | null) => void) =>  {
        new RestService<SectionDTO>().post(
            BASE_PATH.PATH_PROXY + '/section/create',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<SectionDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create section failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    deleteSection: ( sectionId: any, func: (data: MessageResponse<SectionDTO> | null) => void) =>  {
        new RestService<SectionDTO>().delete(
            BASE_PATH.PATH_PROXY + `/section/delete-by-id?sectionId=${sectionId}`,
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {},
            (status: number, data: MessageResponse<SectionDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Delete section failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    createLesson: ( request: any, func: (data: MessageResponse<LessonDTO> | null) => void) =>  {
        new RestService<LessonDTO>().post(
            BASE_PATH.PATH_PROXY + '/lesson/create',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<LessonDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create lesson failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    updateLesson: ( request: any, func: (data: MessageResponse<LessonDTO> | null) => void) =>  {
        new RestService<LessonDTO>().post(
            BASE_PATH.PATH_PROXY + '/lesson/update',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<LessonDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Update lesson failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    deleteLesson: ( lessonId: number, func: (data: MessageResponse<LessonDTO> | null) => void) =>  {
        new RestService<LessonDTO>().delete(
            BASE_PATH.PATH_PROXY + `/lesson/delete?lessonId=${lessonId}`,
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {},
            (status: number, data: MessageResponse<LessonDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Update lesson failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    getByCode: ( code: string, func: (data: MessageResponse<CourseItemDTO> | null) => void) =>  {
        new RestService<CourseItemDTO>().get(
            BASE_PATH.PATH_PROXY + '/course/get-by-code',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {
                code: code
            },
            (status: number, data: MessageResponse<CourseItemDTO> | null) => {
                console.log('get-by-code', data);
                console.log('get-by-status', status);
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("get course by code failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    },
    joinToCourse: (courseCode: string, func: (data: MessageResponse<string> | null) => void) =>  {
        new RestService<string>().get(
            BASE_PATH.PATH_PROXY + '/course/join-course',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {
                courseCode: courseCode
            },
            (status: number, data: MessageResponse<string> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Join course failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    }
};

export default CourseService;