import './ProfileComponent.scss'
import LoginService from '../../../service/LoginService';
import { Dropdown, MenuProps } from 'antd';
import { BASE_PATH } from '../../../entity/Contants';
import { Navigate, useNavigate } from 'react-router-dom';
import DropdownMenu from '../../event/drop/DropdownMenu';
import { useToken } from '../../../context/TokenProvider';

const ProfileComponent: React.FC<{ avatar: string, count_noti: number, fullname: string }>
    = ({ avatar, count_noti, fullname }) => {

        const navigate = useNavigate();
        const obj = useToken();
        const logout = () => {
            console.log('checkl');
            var token = localStorage.getItem('access_token');
            LoginService.killToken(token ?? '');
            localStorage.removeItem('access_token');
            localStorage.removeItem('info');
            localStorage.removeItem('refresh');
            //navigate()
            window.location.replace(BASE_PATH.PATH_FE);
        }

        const items: MenuProps['items'] = [
            {
              label: 'Logout',
              key: '1',
              onClick: logout
            },
            {
                label: 'Profile',
                key: '2',
                onClick: () => navigate('/profile')
            },
            {
                label: 'Management',
                key: '3',
                onClick: () => navigate('/management')
            },
          ];
        

        return <div className="profile ">
            <div className="bell-icon active" >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="30px" viewBox="0 0 50 30" enable-background="new 0 0 50 30" xmlSpace="preserve">
                    <g className="bell-icon__group">
                        <path className="bell-icon__ball" id="ball" fill-rule="evenodd" stroke-width="1.5" clip-rule="evenodd" fill="none" stroke="#currentColor" stroke-miterlimit="10" d="M28.7,25 c0,1.9-1.7,3.5-3.7,3.5s-3.7-1.6-3.7-3.5s1.7-3.5,3.7-3.5S28.7,23,28.7,25z" />
                        <path className="bell-icon__shell" id="shell" fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" stroke="#currentColor" stroke-width="2" stroke-miterlimit="10" d="M35.9,21.8c-1.2-0.7-4.1-3-3.4-8.7c0.1-1,0.1-2.1,0-3.1h0c-0.3-4.1-3.9-7.2-8.1-6.9c-3.7,0.3-6.6,3.2-6.9,6.9h0 c-0.1,1-0.1,2.1,0,3.1c0.6,5.7-2.2,8-3.4,8.7c-0.4,0.2-0.6,0.6-0.6,1v1.8c0,0.2,0.2,0.4,0.4,0.4h22.2c0.2,0,0.4-0.2,0.4-0.4v-1.8 C36.5,22.4,36.3,22,35.9,21.8L35.9,21.8z" />
                    </g>
                </svg>
                <div className="notification-amount">
                    <span>{count_noti}</span>

                    <DropdownMenu menus={[]}></DropdownMenu>
                </div>
            </div>
            <figure className="fir-image-figure">
                <a className="fir-imageover" rel="noopener" target="_blank">
                    <img className="fir-author-image fir-clickcircle" src={avatar === '' ? '/avatar_default.png' : avatar} alt={fullname} />
                    <div className="fir-imageover-color"></div>
                </a>

                <figcaption>
                    <div className="fig-author-figure-title">{fullname}</div>
                </figcaption>
            </figure>
            <Dropdown.Button style={{width: "20%"}}
                menu={{ items }}
            >
            </Dropdown.Button>
        </div>
    }

export default ProfileComponent;