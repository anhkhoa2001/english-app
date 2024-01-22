import './LoginComponent.scss'
import './ButonSocial.scss';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle, FaGithubAlt  } from "react-icons/fa";
import { BASE_PATH } from '../../../entity/Contants';

const LoginComponent: React.FC = () => {

    return <div className="modal-login">
        <div className="modal-box">
                <p>Đăng nhập ngay để bắt đầu trải nghiệm học tiếng Anh <br></br>
                    và luyện thi TOEIC/IELTS hiệu quả cùng hàng 
                    trăm <br></br> ngàn học viên mỗi ngày.</p>
                <a className="button button--social-login button--facebook" href={BASE_PATH.PATH_PROXY + "/oauth2/authorization/facebook"}>
                    <span className='icon'><FaFacebookF /></span>Đăng nhập bằng Facebook
                </a>
                <br></br>
                <a className="button button--social-login button--googleplus" href={BASE_PATH.PATH_PROXY + "/oauth2/authorization/google"}>
                    <span className='icon'><FaGoogle  /></span>Đăng nhập bằng Google
                </a>
                <br></br>
                <a className="button button--social-login button--github" href={BASE_PATH.PATH_PROXY + "/oauth2/authorization/github"}>
                    <span className='icon'><FaGithubAlt /></span>Đăng nhập bằng Github
                </a>
            </div>
    </div>
}


export default LoginComponent;