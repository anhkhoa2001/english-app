import { useState } from 'react';
import './ToggleSearch.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconBaseProps } from 'react-icons';

const ToggleSearch: React.FC<{
    title_header: string,
    type_select: string,    
    select_contents: string[],
    include_icon: boolean,
    count_icon: number[],
    type_icon: React.ReactElement<IconBaseProps>
}> =
    ({ title_header, type_select, select_contents, include_icon, count_icon, type_icon }) => {
        const [dropMenu, setDropMenu] = useState(false);

        return <div className="toggle-search">
            <div className="toggle-header" onClick={() => setDropMenu(!dropMenu)}>
                <p>{title_header}</p>
                <span className="icon-toggle">
                    {
                        dropMenu ? <IoIosArrowUp /> : <IoIosArrowDown />
                    }</span>
            </div>
            <div className="toggle-loop">
                {dropMenu ? Array.from({ length: select_contents.length }, (_, i) => (
                    <label>
                        <input
                            type={type_select == 'checkbox' ? 'checkbox' : 'radio'}
                            name={type_select == 'checkbox' ? i + '0' : 'singleton-radio'}
                            key={i}
                        />
                        {include_icon ? 
                        Array.from({ length: count_icon[i] }, (_, j) => (type_icon ))
                        : 
                        ''}
                        <span className={!include_icon ? 'text-checkbox' : 'text-radio'} >
                            {select_contents[i].toString()}
                        </span>
                    </label>
                )) : <></>}
            </div>
        </div>
    }


export default ToggleSearch;