import './DropdownMenu.scss'

const DropdownMenu: React.FC<{ menus: string[] }> = ({ menus }) => {

    return <nav className="menu">
        <ol>
            <li className="menu-item">
                <ol className="sub-menu">
                    {menus.map((e) => {
                        return <li className="menu-item" key={e}><a href="#0">{e}</a></li>
                    })}
                </ol>
            </li>
        </ol>
    </nav>
}

export default DropdownMenu;