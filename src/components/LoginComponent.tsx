import { useEffect } from "react";

const LoginComponent: React.FC = () => {
    let token : string | null = null;

    useEffect(() => {
        fetch('http://localhost:9999/access/user')
            .then(response => {
                console.log(response);
                if(response.status === 401) {
                    //window.location.replace("http://localhost:9999/login");
                } else {
                    return response;
                }
            })
            .then(json => console.log(json))
    }, []);



    return <h1></h1>
}

export default LoginComponent;