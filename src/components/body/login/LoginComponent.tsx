import './LoginComponent.scss'
import './ButonSocial.scss';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle, FaGithubAlt  } from "react-icons/fa";

const LoginComponent: React.FC = () => {

    return <div className="modal-login">
        <div className="modal-box">
                <p>Đăng nhập ngay để bắt đầu trải nghiệm học tiếng Anh <br></br>
                    và luyện thi TOEIC/IELTS hiệu quả cùng hàng 
                    trăm <br></br> ngàn học viên mỗi ngày.</p>
                <a className="button button--social-login button--facebook" href={(window as any).globalConfig.PATH_USER_SERVICE + "/oauth2/authorization/facebook"}>
                    <span className='icon'><FaFacebookF /></span>Đăng nhập bằng Facebook
                </a>
                <br></br>
                <a className="button button--social-login button--googleplus" href={(window as any).globalConfig.PATH_USER_SERVICE + "/oauth2/authorization/google"}>
                    <span className='icon'><FaGoogle  /></span>Đăng nhập bằng Google
                </a>
                <br></br>
                <a className="button button--social-login button--github" href={(window as any).globalConfig.PATH_USER_SERVICE + "/oauth2/authorization/github"}>
                    <span className='icon'><FaGithubAlt /></span>Đăng nhập bằng Github
                </a>
                {/* <div className="row">
                    <div className="col-12 g-login-block">
                        <span className="btn btn-block s-button g-login-button jqlink">
                            <a href={(window as any).globalConfig.PATH_USER_SERVICE + "/oauth2/authorization/google"}>
                                Đăng nhập với Google
                            </a>
                        </span>
                    </div>
                    <div className="col-12 g-login-block">
                        <span className="btn btn-block s-button g-login-button jqlink">
                            <a href={(window as any).globalConfig.PATH_USER_SERVICE + "/oauth2/authorization/github"}>
                                Đăng nhập với Github
                            </a>
                        </span>
                    </div>
                    <div className="col-12 g-login-block">
                        <span className="btn btn-block s-button g-login-button jqlink">
                            <a href={(window as any).globalConfig.PATH_USER_SERVICE + "/oauth2/authorization/facebook"}>
                                Đăng nhập với Facebook
                            </a>
                        </span>
                    </div>
                </div> */}
            </div>
    </div>
}


export default LoginComponent;