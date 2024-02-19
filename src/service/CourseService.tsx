import { BASE_PATH } from "../entity/Contants";
import MessageResponse from "../entity/response/MessageResponse";
import RestService from "./RestService";

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
        public: true
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
    }
};

export default CourseService;