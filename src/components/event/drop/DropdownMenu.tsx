import { Link } from 'react-router-dom';
import { TitleProp } from '../../../dto/props/TitleProp';
import './DropdownMenu.scss'

const DropdownMenu: React.FC<{ menus: TitleProp[] }> = ({ menus }) => {

    return <nav className="menu">
        <ol>
            <li className="menu-item">
                <ol className="sub-menu">
                    {menus.map((e) => {
                        return <li className="menu-item" key={e.title}><Link to={e.path}>{e.title}</Link></li>
                    })}
                </ol>
            </li>
        </ol>
    </nav>
}

export default DropdownMenu;