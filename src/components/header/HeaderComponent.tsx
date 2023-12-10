import RedirectButton from "../event/redirect/RedirectButton";
import ProfileComponent from "./profile/ProfileComponent";
import './HeaderComponent.scss'
import { useState } from "react";
import LoginService from "../../service/LoginService";

const HeaderComponent: React.FC = () => {
    //login nen ap dung context
    const [isLogin, checkIsLogin] = useState(false);

    if(!isLogin) {
        LoginService.checkLogin();
    }

    return <nav className="navbar">
        <img src="./public/logo.webp" className="logo" />
        <ul className="navbar-collapse">
            <RedirectButton content="HomePage" path="/home"></RedirectButton>
            <RedirectButton content="Courses" path="#"></RedirectButton>
            <RedirectButton content="Examination" path="#"></RedirectButton>
            <RedirectButton content="Blogs" path="#"></RedirectButton>
            {isLogin ? 
                <ProfileComponent
                avatar="https://avatars.githubusercontent.com/u/72397589?v=4"
                type_login="https://fir-rollup.firebaseapp.com/twitter-logo.png"
                count_noti={10}></ProfileComponent> 
                : <RedirectButton content="Log in" path="/login"></RedirectButton>}
        </ul>
    </nav>
}

export default HeaderComponent;
