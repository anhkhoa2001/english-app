import { ModalCustom } from "../components/exception/SuccessModal";
import { BASE_PATH } from "../entity/Contants";
import { CommentDTO } from "../entity/props/Socket";
import { MessageResponse } from "../entity/response/MessageResponse";
import RestService from "./RestService";


const CommentService = {
    getAllComment: async (request: any, func: (data: MessageResponse<CommentDTO[]> | null) => void) =>  {
        new RestService<CommentDTO[]>().get(
            BASE_PATH.PATH_SOCKET + '/comment/get-all-comments',
            {
                'Authorization': localStorage.getItem('access_token')
            },
            request,
            (status: number, data: MessageResponse<CommentDTO[]> | null) => {
                if (status === 200) {
                    func(data);
                } else {
                    //func(null, false);
                    ModalCustom.onDisplayError("Get All comment failed!!", `Defail : ${data?.message || data.error}`)
                }
            });
    }
};

export default CommentService;