import { ModalCustom } from "../components/exception/SuccessModal";
import { BASE_PATH } from "../entity/Contants";
import { ExamDTO, QuestionDTO } from "../entity/props/ExamDTO";
import { DataResponse, MessageResponse } from "../entity/response/MessageResponse";
import RestService from "./RestService";

const token = localStorage.getItem('access_token');
export const ExamService = {
    createExam: ( request: any, func: (data: MessageResponse<ExamDTO> | null) => void) =>  {
        new RestService<ExamDTO>().post(
            BASE_PATH.PATH_PROXY + '/exam/create',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<ExamDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create exam failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    deleteExam: ( examCode: string, func: (data: MessageResponse<string> | null) => void) =>  {
        new RestService<string>().get(
            BASE_PATH.PATH_PROXY + `/exam/delete`,
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {
                examCode: examCode
            },
            (status: number, data: MessageResponse<string> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Delete exam failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    editExam: ( request: any, func: (data: MessageResponse<ExamDTO> | null) => void) =>  {
        new RestService<ExamDTO>().post(
            BASE_PATH.PATH_PROXY + `/exam/update`,
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<ExamDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Edit exam failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    getExamByCode: ( examCode: string, func: (data: MessageResponse<ExamDTO> | null) => void) =>  {
        new RestService<ExamDTO>().get(
            BASE_PATH.PATH_PROXY + `/exam/get-by-code`,
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {
                code: examCode
            },
            (status: number, data: MessageResponse<ExamDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get exam by code failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    getAllExam: ( func: (data: MessageResponse<ExamDTO[]> | null) => void) =>  {
        new RestService<ExamDTO[]>().get(
            BASE_PATH.PATH_PROXY + '/exam/get-all',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {},
            (status: number, data: MessageResponse<ExamDTO[]> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get All exam failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    getAllExamByCondition: (request: any, func: (data: MessageResponse<DataResponse<ExamDTO[]>> | null) => void) =>  {
        new RestService<DataResponse<ExamDTO[]>>().post(
            BASE_PATH.PATH_PROXY + '/exam/get-all-exam-public',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<DataResponse<ExamDTO[]>> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get All exam failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    createQuestion: ( request: any, func: (data: MessageResponse<QuestionDTO> | null) => void) =>  {
        new RestService<QuestionDTO>().post(
            BASE_PATH.PATH_PROXY + '/question/create',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<QuestionDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Create question failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },

    deletePart: ( request: any, func: (data: MessageResponse<string> | null) => void) =>  {
        new RestService<string>().get(
            BASE_PATH.PATH_PROXY + '/exam/delete-part',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<string> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Delete part failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    deleteQuestion: ( questionId: number, func: (data: MessageResponse<string> | null) => void) =>  {
        new RestService<string>().get(
            BASE_PATH.PATH_PROXY + '/question/delete',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {
                questionId: questionId
            },
            (status: number, data: MessageResponse<string> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Delete question failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
    updateQuestion: ( request: any, func: (data: MessageResponse<QuestionDTO> | null) => void) =>  {
        new RestService<QuestionDTO>().post(
            BASE_PATH.PATH_PROXY + '/question/update',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<QuestionDTO> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Update question failed!!", `Defail : ${data?.message || data?.error}`)
                }
            });
    },
}