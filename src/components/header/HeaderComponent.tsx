import RedirectButton from "../event/redirect/RedirectButton";
import './HeaderComponent.scss'
import ProfileComponent from "./profile/ProfileComponent";
import { useEffect, useState } from "react";
import LoginService from "../../service/LoginService";
import MessageResponse from "../../entity/response/MessageResponse";
import { useToken } from "../../context/TokenProvider";

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
    console.log('check in header');
    const obj = useToken();
    console.log('check in header obj', obj);
    const [isLogin, checkIsLogin] = useState(obj?.isLogined);
    const [info, setInfo] = useState(new UserInfo('', ''));

    useEffect(() => {
        checkIsLogin(localStorage.getItem('access_token') != undefined);
        if (isLogin) {
            const token = localStorage.getItem('access_token');
            var info = localStorage.getItem('info') || null;
            if(info == null) {
                LoginService.getUsetInfo(token, (response: MessageResponse<UserInfo> | null) => {    
                    localStorage.setItem('info', JSON.stringify(new UserInfo(response?.data?.avatar ?? '', response?.data?.fullname ?? ''))); 
                    setInfo(new UserInfo(response?.data?.avatar ?? '', response?.data?.fullname ?? ''));
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
