import RedirectButton from "../event/redirect/RedirectButton";
import './HeaderComponent.scss'
import TokenProvider, { useToken } from "../../context/TokenProvider";
import ProfileComponent from "./profile/ProfileComponent";
import { useEffect, useState } from "react";
import LoginService from "../../service/LoginService";
import MessageResponse from "../../dto/response/MessageResponse";

class UserInfo {
    avatar: string;
    fullname: string;

    constructor(avatar: string,
                fullname: string) {
        this.avatar = avatar;
        this.fullname = fullname;
    }
}

const HeaderComponent: React.FC = () => {
    const obj = useToken() || null;
    const [isLogin, checkIsLogin] = useState(false);
    let info:UserInfo = new UserInfo('', '');

    useEffect(() => {
        if (obj != undefined) {
            checkIsLogin(obj?.isLogined);
        }

        if (isLogin) {
            const token = localStorage.getItem('access_token');
            LoginService.getUsetInfo(token, (response: MessageResponse<UserInfo> | null) => {
                info = new UserInfo(response?.data?.avatar ?? '', response?.data?.fullname ?? '');
            });
        }
    }, [obj?.isLogined]);




    return <nav className="navbar">
        <img src="./public/logo.webp" className="logo" />
        <ul className="navbar-collapse">
            <RedirectButton content="HomePage" path="/"></RedirectButton>
            <RedirectButton content="Courses" path="#"></RedirectButton>
            <RedirectButton content="Examination" path="#"></RedirectButton>
            <RedirectButton content="Blogs" path="#"></RedirectButton>
            {isLogin ?
                <ProfileComponent
                    avatar={info.avatar}
                    count_noti={10}
                    fullname={info.fullname}></ProfileComponent>
                : <RedirectButton content="Log in" path="/login"></RedirectButton>}
        </ul>
    </nav>
}

export default HeaderComponent;
