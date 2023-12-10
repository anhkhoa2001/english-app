import './RedirectButton.scss';
import { Link } from 'react-router-dom';

const RedirectButton: React.FC<{ content: string, path: string }> = ({ content, path }) => {

    return <Link to={path}>
        <li className="redirect-button">
            {content}
            <span></span><span></span><span></span><span></span>
        </li></Link>
}

export default RedirectButton;