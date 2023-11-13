import { useEffect } from "react";

const GitHubComponent: React.FC = () => {
    let token : string | null = null;


    useEffect(() => {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams.get('username'));
    }, []);



    return <a href="http://localhost:9999/oauth2/authorization/github">Đăng nhập với tài khoản Github</a>
}

export default GitHubComponent;