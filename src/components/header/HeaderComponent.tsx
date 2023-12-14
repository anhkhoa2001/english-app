import RedirectButton from "../event/redirect/RedirectButton";
import './HeaderComponent.scss'
import TokenProvider, { useToken } from "../../context/TokenProvider";
import ProfileComponent from "./profile/ProfileComponent";
import { useEffect, useState } from "react";

const HeaderComponent: React.FC = () => {
    const obj = useToken() || null;
    const [isLogin, checkIsLogin] = useState(false);
    
    useEffect(() => {
        if(obj != undefined) {
            checkIsLogin(obj?.isLogined);
        }
    }, []);

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
