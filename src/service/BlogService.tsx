import { ModalCustom } from "../components/exception/SuccessModal";
import { BASE_PATH } from "../entity/Contants";
import { BlogDTO } from "../entity/props/BlogItemDTO";
import { DataResponse, MessageResponse } from "../entity/response/MessageResponse";
import RestService from "./RestService";



const BlogService = {
    createBlog: function(request: any, func: (data: MessageResponse<BlogDTO> | null) => void) {
        new RestService<BlogDTO>().post(
            BASE_PATH.PATH_PROXY + '/blog/create',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<BlogDTO> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    //@ts-ignore
                    ModalCustom.onDisplayError("create blog  failed!!", `Defail : ${data?.message || data.error}`);
                }
            });
    },
    getAllBlog: function(func: (data: MessageResponse<BlogDTO[]> | null) => void) {
        new RestService<BlogDTO[]>().get(
            BASE_PATH.PATH_PROXY + '/blog/get-all',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            {},
            (status: number, data: MessageResponse<BlogDTO[]> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    //@ts-ignore
                    ModalCustom.onDisplayError("Get All blog failed!!", `Defail : ${data?.message || data.error}`);
                }
            });
    },
    getByCondition: function(request: any, func: (data: MessageResponse<DataResponse<BlogDTO[]>> | null) => void) {
        new RestService<DataResponse<BlogDTO[]>>().post(
            BASE_PATH.PATH_PROXY + '/blog/get-by-condition',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<DataResponse<BlogDTO[]>> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    //@ts-ignore
                    ModalCustom.onDisplayError("Get All blog by condition  failed!!", `Defail : ${data?.message || data.error}`);
                }
            });
    }
};

export default BlogService;