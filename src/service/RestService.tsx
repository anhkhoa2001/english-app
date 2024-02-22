import axios from 'axios';
import MessageResponse from '../entity/response/MessageResponse';

function objectToQueryString(obj: object) {
    const queryString = Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent((obj as any)[key])}`)
        .join('&');
    return queryString === '' ? '' : `?${queryString}`;
}

class RestService<T> {
    post(path: string,
        header: object,
        body: object,
        func: (status: number, data: MessageResponse<T> | null) => void) {
        axios({
            method: 'post',
            url: path,
            data: body,
            headers: header,
        })
            .then(function (response) {
                func(response.status, response.data);
            })
            .catch(function(error) {
                func(error.response.status, error.response.data);
            });
    };

    get(
        path: string,
        header: object,
        param: object,
        func: (status: number, data: MessageResponse<T> | null) => void) {
            // fetch(path + objectToQueryString(param), {
            //     method: "GET",
            //     headers: new Headers(Object.entries(header))
            // })
            // .then(response => response.json())
            // .then(json => {
            //     func(200, json);
            // })
            // .catch(error => console.error(error));
            axios({
                method: 'get',
                url: path + objectToQueryString(param),
                headers: header
            })
            .then(function (response) {
                func(response.status, response.data);
            })
            .catch(function(error) {
                func(error, null);
            });
    }
};

export default RestService;