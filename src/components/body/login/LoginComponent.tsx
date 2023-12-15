
const LoginComponent: React.FC = () => {

    return <div className="login-block">
        <p>Đăng nhập ngay để bắt đầu trải nghiệm học tiếng Anh và luyện thi 
            TOEIC/IELTS hiệu quả cùng hàng trăm ngàn học viên mỗi ngày.</p>
        <div className="row">
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
        </div>
    </div>
}


export default LoginComponent;