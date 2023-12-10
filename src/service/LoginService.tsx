import './RestService'
import RestService from './RestService';

const LoginService = {
    checkLogin: function() {
        const token:string = localStorage.getItem("token") || "";
        console.log('token', token);

        RestService.get(
            'http://localhost:9001/public/check-token',
            {
                'Authorization': token
            },
            {},
            (status: number, data:object) => {
                console.log(status);
            } );
    },
    getToken: function(code: string) {

    }
};

export default LoginService;