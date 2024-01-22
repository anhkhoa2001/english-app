import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import VideoCourseComponent from './components/body/courses/detail/VideoCourseComponent.tsx';
import LoginComponent from './components/body/login/LoginComponent.tsx';
import CourseComponent from './components/body/courses/CourseComponent.tsx';
import "../node_modules/video-react/dist/video-react.css";
import ExamComponent from './components/body/exams/ExamComponent.tsx';
import DetailExamComponent from './components/body/exams/DetailExamComponent.tsx';
import BlogComponent from './components/body/blogs/BlogComponent.tsx';
import LibraryComponent from './components/body/library/LibraryComponent.tsx';
import HomeComponent from './components/body/home/HomeComponent.tsx';
import ProfileDetailComponent from './components/header/profile/ProfileDetailComponent.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="" element={<App />}>
                <Route path="/login" element={<LoginComponent />}></Route>
                <Route path="/" element={<HomeComponent />}></Route>
                <Route path="/courses" element={
                    <>
                        <CourseComponent />
                    </>
                }></Route>
                <Route path="/blogs" element={<BlogComponent />}></Route>
                <Route path="/library" element={<LibraryComponent />}></Route>
                <Route path="/profile" element={<ProfileDetailComponent />}></Route>
                <Route path="/profile/privacy" element={<>
                </>}></Route>
                <Route path="/profile/term" element={<ProfileDetailComponent />}></Route>
                <Route path="/exams" element={
                    <>
                        <ExamComponent />
                    </>
                }></Route>
            </Route>

            <Route path="/learning/course/:code" element={
                <VideoCourseComponent />
            }></Route>

            <Route path="/learning/exam/:code" element={
                <DetailExamComponent />
            }></Route>
        </Routes>
        {/* <Footer style={{ textAlign: 'center', position: 'absolute', width: '100%', bottom: '0'}}>
            KhoaDT Design ©{new Date().getFullYear()} Created by Khoa Dam Tam From UET
        </Footer> */}
    </BrowserRouter>
)
