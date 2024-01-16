import { IoIosArrowBack } from "react-icons/io";
import './css/VideoNav.scss';
import { Link } from "react-router-dom";

const VideoNav: React.FC<{title: string}> = ({title}) => {

    return <div className="video-nav">
        <Link to="/" className="back-to"><IoIosArrowBack /></Link>
        <p className="title">{title}</p>
    </div>
}


export default VideoNav;