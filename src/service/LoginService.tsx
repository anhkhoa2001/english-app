import { BASE_PATH, BEARER } from '../entity/Contants';
import { UserDTO } from '../entity/props/ExamDTO';
import MessageResponse from '../entity/response/MessageResponse';
import RestService from './RestService';

type LoginCallback = (response: MessageResponse<string> | null, isLogined: boolean) => void;

const LoginService = {
    checkToken: function(token: string, 
                func: LoginCallback) {
        new RestService<string>().get(
            BASE_PATH.PATH_PROXY + '/public/check-token',
            {
                'Authorization': token
            },
            {},
            (status: number, data: MessageResponse<string> | null) => {
                if(status === 200) {
                    console.log('data 1', data);
                    func(data, true);
                } else {
                    func(null, false);
                }
            });
    },
    getToken: function(body: object, func: LoginCallback) {
        new RestService<string>().post(
            BASE_PATH.PATH_PROXY + '/public/generate-token',
            {},
            body,
            (status: number, data: MessageResponse<string> | null) => {
                if(status === 200) {
                    console.log('data', data);
                    func(data, true);
                } else {
                    func(null, false);
                }
            });
    },
    killToken: function(token: string) {
        new RestService<string>().get(
            BASE_PATH.PATH_PROXY + '/public/kill-token',
            {
                'Authorization': BEARER + token
            },
            {},
            (status: number, data: MessageResponse<string> | null) => {
                console.log(status);
            });
    },
    getUsetInfo: function(token: string | null, func: (response: MessageResponse<UserDTO> | null) => void) {
        new RestService<UserDTO>().get(
            BASE_PATH.PATH_PROXY + '/user/user-info',
            {
                'Authorization': BEARER + token
            },
            {},
            (status: number, data: MessageResponse<UserDTO> | null) => {
                if(status === 200) {
                    func(data);
                } else {
                    func(null);
                }
            });
    }
};

export default LoginService;