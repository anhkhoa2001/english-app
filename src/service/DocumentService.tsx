import { BASE_PATH } from "../entity/Contants";
import { DocumentDTO } from "../entity/props/DocumentDTO";
import { DataResponse, MessageResponse } from "../entity/response/MessageResponse";
import RestService from "./RestService";


const DocumentService = {
    createDocument: function(request: any, func: (data: MessageResponse<DocumentDTO> | null) => void) {
        new RestService<DocumentDTO>().post(
            BASE_PATH.PATH_PROXY + '/document/create',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<DocumentDTO> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    //@ts-ignore
                    ModalCustom.onDisplayError("create document  failed!!", `Defail : ${data?.message || data.error}`);
                }
            });
    },
    updateDocument: function(request: any, func: (data: MessageResponse<DocumentDTO> | null) => void) {
        new RestService<DocumentDTO>().post(
            BASE_PATH.PATH_PROXY + '/document/update',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<DocumentDTO> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    //@ts-ignore
                    ModalCustom.onDisplayError("create document  failed!!", `Defail : ${data?.message || data.error}`);
                }
            });
    },
    getAllDocument: function(func: (data: MessageResponse<DocumentDTO[]> | null) => void) {
        new RestService<DocumentDTO[]>().get(
            BASE_PATH.PATH_PROXY + '/document/get-all',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {},
            (status: number, data: MessageResponse<DocumentDTO[]> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    //@ts-ignore
                    ModalCustom.onDisplayError("get all document failed!!", `Defail : ${data?.message || data.error}`);
                }
            });
    },
    getAllPublicDocument: function(request: any, func: (data: MessageResponse<DataResponse<DocumentDTO[]>> | null) => void) {
        new RestService<DataResponse<DocumentDTO[]>>().post(
            BASE_PATH.PATH_PROXY + '/document/get-all-public',
            {},
            request,
            (status: number, data: MessageResponse<DataResponse<DocumentDTO[]>> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    //@ts-ignore
                    ModalCustom.onDisplayError("get all public  document failed!!", `Defail : ${data?.message || data.error}`);
                }
            });
    }
};

export default DocumentService;