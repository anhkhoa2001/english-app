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
import HomeComponent from './components/body/home/HomeComponent.tsx';
import ProfileDetailComponent from './components/header/profile/ProfileDetailComponent.tsx';
import ManagementComponent from './components/body/management/ManagementComponent.tsx';
import SummaryExam from './components/body/exams/SummaryExam.tsx';
import DeReviewExam from './components/body/exams/DeReviewExam.tsx';
import DocumentComponent from './components/body/library/DocumentComponent.tsx';
import EditorComponent from './components/body/editor/EditorComponent.tsx';

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
                <Route path="/document" element={<DocumentComponent />}></Route>
                <Route path="/profile" element={<ProfileDetailComponent />}></Route>
                <Route path="/profile/privacy" element={<>
                </>}></Route>
                <Route path="/management" element={<ManagementComponent />}></Route>
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

            <Route path="/exam/:code" element={
                <SummaryExam />
            }></Route>
            <Route path="/review/exam/:code" element={
                <DeReviewExam />
            }></Route>
            <Route path="/test-editor" element={
                <EditorComponent class_name='medium' data={'1234'} setContent={() => {}} />
            }></Route>
        </Routes>
        {/* <Footer style={{ textAlign: 'center', position: 'absolute', width: '100%', bottom: '0'}}>
            KhoaDT Design ©{new Date().getFullYear()} Created by Khoa Dam Tam From UET
        </Footer> */}
    </BrowserRouter>
)
