import { Modal } from "antd";
import { BASE_PATH } from "../entity/Contants";
import MessageResponse from "../entity/response/MessageResponse";
import RestService from "./RestService";
import { ModalCustom } from "../components/exception/SuccessModal";
import { CourseItemDTO } from "../entity/props/CourseItemDTO";

export interface CourseDTO {
    data: {
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
    }[],
    totalRecord: number
}

const CourseService = {
    getAllCourse: async (token: string, page: number, pageSize: number, func: (data: MessageResponse<CourseDTO> | null) => void) =>  {
        new RestService<CourseDTO>().post(
            BASE_PATH.PATH_PROXY + '/api/course/get-all',
            {
                'Authorization': token
            },
            {
                page: page,
                pageSize: pageSize
            },
            (status: number, data: MessageResponse<CourseDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
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