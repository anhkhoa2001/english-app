import axios from 'axios';

function objectToQueryString(obj: object) {
    const queryString = Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent((obj as any)[key])}`)
        .join('&');

    return `?${queryString}`;
}

const RestService = {
    post: function () {
    },

    get: function (
        path: string,
        header: object,
        param: object,
        func: (status: number, data: object) => void) {

        axios({
            method: 'get',
            url: path + objectToQueryString(param),
            headers: header
        })
            .then(function (response) {
                //func(response);
            })
            .catch(function(error) {
                func(error.response.status, {});
            });
    }
};

export default RestService;