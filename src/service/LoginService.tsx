import MessageResponse from '../dto/response/MessageResponse';
import RestService from './RestService';

type LoginCallback = (response: MessageResponse<string> | null, isLogined: boolean) => void;

const LoginService = {
    checkLogin: function(token: string, 
                func: LoginCallback) {
        console.log('token', token);

        new RestService<string>().get(
            'http://localhost:9001/public/check-token',
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
            'http://localhost:9001/public/generate-token',
            {},
            body,
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