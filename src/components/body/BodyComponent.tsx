import LoginComponent from "./login/LoginComponent";
import {Routes, Route} from 'react-router-dom';
import './BodyComponent.scss'

const BodyComponent: React.FC = () => {

    return <div className="main">
        <Routes>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/" element={<h1>Day la trong home</h1>}></Route>
            <Route path="/courses" element={<h1>Day la trong Course</h1>}></Route>
            <Route path="/blogs" element={<h1>Day la trong Bloig</h1>}></Route>
            <Route path="/exams" element={<h1>Day la trong Exam</h1>}></Route>
        </Routes>
    </div>
}


export default BodyComponent;