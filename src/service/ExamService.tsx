import { ModalCustom } from "../components/exception/SuccessModal";
import { BASE_PATH } from "../entity/Contants";
import MessageResponse from "../entity/response/MessageResponse";
import RestService from "./RestService";

export interface ExamDTO {
    examCode: string,
    examName: string,
    description: string,
    summary: string,
    skill: true,
    type: string,
    thumbnail: string,
    createBy: string,
    createAt: Date,
    status: boolean
}

export const ExamService = {
    createExam: (token: string, request: any, func: (data: MessageResponse<ExamDTO> | null) => void) =>  {
        new RestService<ExamDTO>().post(
            BASE_PATH.PATH_PROXY + '/api/exam/create',
            {
                'Authorization': token
            },
            request,
            (status: number, data: MessageResponse<ExamDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create exam failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    deleteExam: (token: string, examCode: string, func: (data: MessageResponse<string> | null) => void) =>  {
        new RestService<string>().get(
            BASE_PATH.PATH_PROXY + `/api/exam/delete`,
            {
                'Authorization': token
            },
            {
                examCode: examCode
            },
            (status: number, data: MessageResponse<string> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Delete exam failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    editExam: (token: string, request: any, func: (data: MessageResponse<ExamDTO> | null) => void) =>  {
        new RestService<ExamDTO>().post(
            BASE_PATH.PATH_PROXY + `/api/exam/update`,
            {
                'Authorization': token
            },
            request,
            (status: number, data: MessageResponse<ExamDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Edit exam failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    getExamByCode: (token: string, examCode: string, func: (data: MessageResponse<ExamDTO> | null) => void) =>  {
        new RestService<ExamDTO>().get(
            BASE_PATH.PATH_PROXY + `/api/exam/get-by-code`,
            {
                'Authorization': token
            },
            {
                code: examCode
            },
            (status: number, data: MessageResponse<ExamDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get exam by code failed!!", `Defail : ${data?.message}`)
                }
            });
    },
    getAllExam: (token: string, func: (data: MessageResponse<ExamDTO[]> | null) => void) =>  {
        new RestService<ExamDTO[]>().get(
            BASE_PATH.PATH_PROXY + '/api/exam/get-all',
            {
                'Authorization': token
            },
            {},
            (status: number, data: MessageResponse<ExamDTO[]> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get All exam failed!!", `Defail : ${data?.message}`)
                }
            });
    },
}