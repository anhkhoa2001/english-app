import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import VideoCourseComponent from './components/body/courses/detail/VideoCourseComponent.tsx';
import LoginComponent from './components/body/login/LoginComponent.tsx';
import CourseComponent from './components/body/courses/CourseComponent.tsx';
import "../node_modules/video-react/dist/video-react.css";
import ExamComponent from './components/body/exams/ExamComponent.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="" element={<App />}>
                <Route path="/login" element={<LoginComponent />}></Route>
                <Route path="/" element={<h1>Day la trong home</h1>}></Route>
                <Route path="/courses" element={
                    <>
                        <CourseComponent />
                    </>
                }></Route>
                <Route path="/blogs" element={<h1>Day la trong Bloig 321312</h1>}></Route>
                <Route path="/exams" element={
                    <>
                        <ExamComponent />
                    </>
                }></Route>
                <Route path="/courses/lesson" element={
                    <h1>Khoa dam tam</h1>
                }></Route>
            </Route>

            <Route path="/learning/:code" element={
                <VideoCourseComponent />
            }>
                
            </Route>
        </Routes>
    </BrowserRouter>
)
