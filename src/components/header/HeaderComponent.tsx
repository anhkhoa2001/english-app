import RedirectButton from "../event/redirect/RedirectButton";
import './HeaderComponent.scss'
import ProfileComponent from "./profile/ProfileComponent";
import { useEffect, useState } from "react";
import LoginService from "../../service/LoginService";
import { useToken } from "../../context/TokenProvider";
import { UserDTO } from "../../entity/props/ExamDTO";
import { MessageResponse } from "../../entity/response/MessageResponse";

class UserInfo {
    avatar: string;
    fullname: string;
    userId: string;
    username: string;

    constructor(avatar: string,
                fullname: string,
                userId: string,
                username: string) {
        this.avatar = avatar;
        this.fullname = fullname;
        this.userId = userId;
        this.username = username;
    }
}

const HeaderComponent: React.FC = () => {
    console.log('check in header');
    const obj = useToken();
    console.log('check in header obj', obj);
    const [isLogin, checkIsLogin] = useState(obj?.isLogined);
    const [info, setInfo] = useState<UserInfo>(new UserInfo('', '', '', ''));

    useEffect(() => {
        checkIsLogin(localStorage.getItem('access_token') != undefined);
        if (isLogin) {
            const token = localStorage.getItem('access_token');
            var info = localStorage.getItem('info') || null;
            if(info == null) {
                LoginService.getUsetInfo(token, (response: MessageResponse<UserDTO> | null) => {    
                    const info = new UserInfo(response?.data?.avatar ?? '', response?.data?.fullname ?? '', response?.data?.userId ?? '', response?.data?.username ?? '');
                    localStorage.setItem('info', JSON.stringify(info)); 
                    localStorage.setItem('userId', response?.data?.userId ?? '');
                    setInfo(info);
                });
            } else {
                setInfo(JSON.parse(localStorage.getItem('info') || ""));
            }
            console.log('info', info);
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
                {/* <ProfileComponent
                    avatar={info.avatar}
                    count_noti={10}
                    fullname={info.fullname}></ProfileComponent> */}
        </ul>
    </nav>
}

export default HeaderComponent;
