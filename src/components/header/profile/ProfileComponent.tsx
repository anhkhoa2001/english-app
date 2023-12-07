import './ProfileComponent.scss'
import { IoMdArrowDropdown } from "react-icons/io";

const ProfileComponent: React.FC<{avatar: string, type_login: string}> = ({avatar, type_login}) => {

    return <div className="profile">
        <figure className="fir-image-figure">

            <a className="fir-imageover" rel="noopener" target="_blank">
                <img className="fir-author-image fir-clickcircle" src={avatar} alt="David East - Author" />
                <div className="fir-imageover-color"></div>
                <img className="fir-imageover-image fir-clickcircle" src={type_login} />
            </a>

            <figcaption>
                <div className="fig-author-figure-title">David East</div>
            </figcaption>
        </figure>
        <span className="icon-dropdown"><IoMdArrowDropdown /></span>
    </div>
}

export default ProfileComponent;