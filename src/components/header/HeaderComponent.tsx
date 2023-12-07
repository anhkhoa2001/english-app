import RedirectButton from "../event/RedirectButton";
import ProfileComponent from "./profile/ProfileComponent";
import './HeaderComponent.scss'

const HeaderComponent: React.FC = () => {


    return <nav className="navbar">
        <img src="./public/logo.webp" className="logo" />
        <ul className="navbar-collapse">
            <RedirectButton content="HomePage"></RedirectButton>
            <RedirectButton content="Courses"></RedirectButton>
            <RedirectButton content="Examination"></RedirectButton>
            <RedirectButton content="Blogs"></RedirectButton>
            <ProfileComponent
                avatar="https://avatars.githubusercontent.com/u/72397589?v=4"
                type_login="https://fir-rollup.firebaseapp.com/twitter-logo.png"></ProfileComponent>
        </ul>
    </nav>
}

export default HeaderComponent;
