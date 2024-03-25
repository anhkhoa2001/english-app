import RedirectButton from "../event/redirect/RedirectButton";
import './HeaderComponent.scss'
import ProfileComponent from "./profile/ProfileComponent";
import { useEffect, useState } from "react";
import LoginService from "../../service/LoginService";
import { useToken } from "../../context/TokenProvider";
import { UserDTO } from "../../entity/props/ExamDTO";
import { MessageResponse } from "../../entity/response/MessageResponse";

export class UserInfo {
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
    const obj = useToken();
    const [isLogin, checkIsLogin] = useState(obj?.isLogined);
    const [info, setInfo] = useState<UserInfo>(new UserInfo('', '', '', ''));

   
    useEffect(() => {
        function getInfo() {
            const json = localStorage.getItem('info');
    
            if(json != undefined) {
                const i = JSON.parse(json);
                setInfo(new UserInfo(i.avatar, i.fullname, i.userId, i.usernam));
                checkIsLogin(true);
                console.log('json', isLogin);
                clearTimeout(timeout);
            } 
        };  

        const timeout = setTimeout(getInfo, 3000);
    }, [obj?.isLogined])

    return <nav className="navbar">
        <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" className="logo" />
        <ul className="navbar-collapse">
            <RedirectButton content="HomePage" path="/"></RedirectButton>
            <RedirectButton content="Courses" path="/courses"></RedirectButton>
            <RedirectButton content="Examination" path="/exams"></RedirectButton>
            <RedirectButton content="Blogs" path="/blogs"></RedirectButton>
            <RedirectButton content="Documents" path="/document"></RedirectButton>
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
