import LoginComponent from "./login/LoginComponent";
import {Routes, Route} from 'react-router-dom';

const BodyComponent: React.FC = () => {

    return <div className="main">
        <Routes>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/" element={<h1>Day la trong home</h1>}></Route>
        </Routes>
    </div>
}


export default BodyComponent;