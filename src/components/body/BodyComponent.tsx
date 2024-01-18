import {Outlet} from 'react-router-dom';
import './BodyComponent.scss' 

const BodyComponent: React.FC = () => {

    return <div className="main">
        <Outlet />
    </div>
}


export default BodyComponent;