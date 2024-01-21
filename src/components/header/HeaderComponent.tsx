import RedirectButton from "../event/redirect/RedirectButton";
import './HeaderComponent.scss'
import TokenProvider, { useToken } from "../../context/TokenProvider";
import ProfileComponent from "./profile/ProfileComponent";
import { useEffect, useState } from "react";
import LoginService from "../../service/LoginService";
import MessageResponse from "../../entity/response/MessageResponse";

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
    const [info, setInfo] = useState(new UserInfo('', ''));

    useEffect(() => {
        if (obj != undefined) {
            checkIsLogin(obj?.isLogined);
        }
        if (obj?.isLogined) {
            const token = localStorage.getItem('access_token');
            LoginService.getUsetInfo(token, (response: MessageResponse<UserInfo> | null) => {
                setInfo(new UserInfo(response?.data?.avatar ?? '', response?.data?.fullname ?? ''));
            });
        }
    }, [obj?.isLogined]);




    return <nav className="navbar">
        <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" className="logo" />
        <ul className="navbar-collapse">
            <RedirectButton content="HomePage" path="/"></RedirectButton>
            <RedirectButton content="Courses" path="/courses"></RedirectButton>
            <RedirectButton content="Examination" path="/exams"></RedirectButton>
            <RedirectButton content="Blogs" path="/blogs"></RedirectButton>
            <RedirectButton content="Library" path="/library"></RedirectButton>
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
