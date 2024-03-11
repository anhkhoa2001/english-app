import { BASE_PATH } from "../entity/Contants";
import MessageResponse from "../entity/response/MessageResponse";
import RestService from "./RestService";
import { ModalCustom } from "../components/exception/SuccessModal";
import { CourseItemDTO } from "../entity/props/CourseItemDTO";
import { LessonDTO } from "../entity/props/LessonDTO";
import { SectionDTO } from "../entity/props/SectionDTO";

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
    rate: number
}

const CourseService = {
    getAllCourse: async (token: string, page: number, pageSize: number, func: (data: MessageResponse<CourseDTO[]> | null) => void) =>  {
        new RestService<CourseDTO[]>().post(
            BASE_PATH.PATH_PROXY + '/api/course/get-all',
            {
                'Authorization': token
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
                    ModalCustom.onDisplayError("Get All course failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    create: (token: string, request: any, func: (data: MessageResponse<CourseDTO> | null) => void) =>  {
        new RestService<CourseDTO>().post(
            BASE_PATH.PATH_PROXY + '/api/course/create',
            {
                'Authorization': token
            },
            request,
            (status: number, data: MessageResponse<CourseDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create course failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    update: (token: string, request: any, func: (data: MessageResponse<CourseDTO> | null) => void) =>  {
        new RestService<CourseDTO>().post(
            BASE_PATH.PATH_PROXY + '/api/course/update',
            {
                'Authorization': token
            },
            request,
            (status: number, data: MessageResponse<CourseDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create course failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    createSection: (token: string, request: any, func: (data: MessageResponse<SectionDTO> | null) => void) =>  {
        new RestService<SectionDTO>().post(
            BASE_PATH.PATH_PROXY + '/api/section/create',
            {
                'Authorization': token
            },
            request,
            (status: number, data: MessageResponse<SectionDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create section failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    deleteSection: (token: string, sectionId: any, func: (data: MessageResponse<SectionDTO> | null) => void) =>  {
        new RestService<SectionDTO>().delete(
            BASE_PATH.PATH_PROXY + `/api/section/delete-by-id?sectionId=${sectionId}`,
            {
                'Authorization': token
            },
            {},
            (status: number, data: MessageResponse<SectionDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Delete section failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    createLesson: (token: string, request: any, func: (data: MessageResponse<LessonDTO> | null) => void) =>  {
        new RestService<LessonDTO>().post(
            BASE_PATH.PATH_PROXY + '/api/lesson/create',
            {
                'Authorization': token
            },
            request,
            (status: number, data: MessageResponse<LessonDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create lesson failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    updateLesson: (token: string, request: any, func: (data: MessageResponse<LessonDTO> | null) => void) =>  {
        new RestService<LessonDTO>().post(
            BASE_PATH.PATH_PROXY + '/api/lesson/update',
            {
                'Authorization': token
            },
            request,
            (status: number, data: MessageResponse<LessonDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Update lesson failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    deleteLesson: (token: string, lessonId: number, func: (data: MessageResponse<LessonDTO> | null) => void) =>  {
        new RestService<LessonDTO>().delete(
            BASE_PATH.PATH_PROXY + `/api/lesson/delete?lessonId=${lessonId}`,
            {
                'Authorization': token
            },
            {},
            (status: number, data: MessageResponse<LessonDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Update lesson failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    getByCode: (token: string, code: string, func: (data: MessageResponse<CourseItemDTO> | null) => void) =>  {
        new RestService<CourseItemDTO>().get(
            BASE_PATH.PATH_PROXY + '/api/course/get-by-code',
            {
                'Authorization': token
            },
            {
                code: code
            },
            (status: number, data: MessageResponse<CourseItemDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create course failed!!", `Defail : ${data?.message}`)
                }
            });
    }
};

export default CourseService;