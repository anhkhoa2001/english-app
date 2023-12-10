
const LoginComponent: React.FC = () => {

    return <div className="login-block">
        <p>Đăng nhập ngay để bắt đầu trải nghiệm học tiếng Anh và luyện thi 
            TOEIC/IELTS hiệu quả cùng hàng trăm ngàn học viên mỗi ngày.</p>
        <div className="row">
            <div className="col-12 f-login-block">
                <span data-href="/oauth/login/facebook/?next=" className="btn btn-block s-button f-login-button jqlink">
                    Đăng nhập với Facebook
                </span>
            </div>
            <div className="col-12 g-login-block">
                <span className="btn btn-block s-button g-login-button jqlink">
                    <a href="http://localhost:9001/oauth2/authorization/google">
                        Đăng nhập với Google
                    </a>
                </span>
            </div>
            <div className="col-12 g-login-block">
                <span className="btn btn-block s-button g-login-button jqlink">
                    <a href="http://localhost:9001/oauth2/authorization/github">
                        Đăng nhập với Github
                    </a>
                </span>
            </div>
        </div>
    </div>
}


export default LoginComponent;