import GitHubComponent from "./login/GitHubComponent";
import GoogleComponent from "./login/GoogleComponent";


//UseState
//UseEffect
//UseLayoutEffect
const LoginComponent: React.FC = () => {

    return <div>
        <GitHubComponent></GitHubComponent>
        <br></br>
        <GoogleComponent></GoogleComponent>
        <h1>hello</h1>
    </div>
}


export default LoginComponent;