import MessageResponse from '../dto/response/MessageResponse';
import RestService from './RestService';

type LoginCallback = (response: MessageResponse<string> | null, isLogined: boolean) => void;

const LoginService = {
    checkToken: function(token: string, 
                func: LoginCallback) {
        new RestService<string>().get(
            (window as any).globalConfig.PATH_USER_SERVICE + '/public/check-token',
            {
                'Authorization': token
            },
            {},
            (status: number, data: MessageResponse<string> | null) => {
                if(status === 200) {
                    func(data, true);
                } else {
                    func(null, false);
                }
            });
    },
    getToken: function(body: object, func: LoginCallback) {
        new RestService<string>().post(
            (window as any).globalConfig.PATH_USER_SERVICE + '/public/generate-token',
            {},
            body,
            (status: number, data: MessageResponse<string> | null) => {
                if(status === 200) {
                    func(data, true);
                } else {
                    func(null, false);
                }
            });
    },
    killToken: function(token: string, func: LoginCallback) {
        new RestService<string>().get(
            (window as any).globalConfig.PATH_USER_SERVICE + '/public/kill-token',
            {
                'Authorization': token
            },
            {},
            (status: number, data: MessageResponse<string> | null) => {
                if(status === 200) {
                    func(data, true);
                } else {
                    func(null, false);
                }
            });
    }
};

export default LoginService;