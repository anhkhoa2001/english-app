import { IoIosArrowBack } from "react-icons/io";
import './css/VideoNav.scss';
import { Link } from "react-router-dom";

const CommonNav: React.FC<{title: string, url_back: string}> = ({title, url_back}) => {

    return <div className="video-nav">
        <Link to={url_back} className="back-to"><IoIosArrowBack /></Link>
        <p className="title">{title}</p>
    </div>
}


export default CommonNav;