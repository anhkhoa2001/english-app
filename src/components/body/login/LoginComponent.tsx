import './LoginComponent.scss'
import './ButonSocial.scss';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle, FaGithubAlt  } from "react-icons/fa";
import { BASE_PATH } from '../../../entity/Contants';

const LoginComponent: React.FC = () => {

    return <div className="modal-login">
        <div className="modal-box">
                <p>Log in now to start your English learning experience <br></br>
                     and effective TOEIC/IELTS test preparation in the same class
                     hundreds <br></br> thousands of students every day.</p>
                <a className="button button--social-login button--facebook" href={BASE_PATH.PATH_PROXY + "/oauth2/authorization/facebook"}>
                    <span className='icon'><FaFacebookF /></span>Login with Facebook
                </a>
                <br></br>
                <a className="button button--social-login button--googleplus" href={BASE_PATH.PATH_PROXY + "/oauth2/authorization/google"}>
                    <span className='icon'><FaGoogle  /></span>Login with Google
                </a>
                <br></br>
                <a className="button button--social-login button--github" href={BASE_PATH.PATH_PROXY + "/oauth2/authorization/github"}>
                    <span className='icon'><FaGithubAlt /></span>Login with Github
                </a>
            </div>
    </div>
}


export default LoginComponent;