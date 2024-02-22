import { AppstoreOutlined, DeleteOutlined, EditOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Form, Input, MenuProps, Space, Table, TableProps, Tag } from "antd";
import { Menu } from "antd/lib";
import './css/ManagementComponent.scss';
import CourseManagement from "./course/CourseManagement";
import { useContext, useEffect, useState } from "react";
import CourseList from "./course/CourseList";
import { ExamItemDTO } from "../../../entity/props/ExamItemDTO";
import ExamManagement from "./exam/ExamManagement";
import ExamList from "./exam/ExamList";
import MessageResponse from "../../../entity/response/MessageResponse";
import CourseService, { CourseDTO } from "../../../service/CourseService";

type MenuItem = Required<MenuProps>['items'][number];
const max = 999999;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const ManagementComponent: React.FC = () => {

    const [elementDashboard, setElementDashboard] = useState(<CourseList/>);
    const [courses, setCourses] = useState<CourseDTO | null>(null);

    const loadCourse: (data: MessageResponse<CourseDTO> | null) => void = (data) => {
        try {
            setCourses(data?.data == undefined ? null : data.data);

            console.log('data', courses?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        CourseService.getAllCourse("abc", 1, max, loadCourse);
    }, []);

    const exams: ExamItemDTO[] = [
        {
            code: "TOEIC-EXAM2002",
            title: "TOEIC Test 2023 Listening",
            type: 1
        },
        {
            code: "TOEIC-EXAM2003",
            title: "TOEIC Test 2024 Listening",
            type: 2
        },
        {
            code: "TOEIC-EXAM2004",
            title: "TOEIC Test 2025 Listening",
            type: 3
        }
    ]

    const onChangeCourseCenter = () => {
        setElementDashboard(<CourseList/>);
    }

    const onChangeExamCenter = () => {
        setElementDashboard(<ExamList/>);
    }

    const items: MenuProps['items'] = [
        getItem(<p onClick={onChangeCourseCenter}>Courses Center</p>, 'sub1', <AppstoreOutlined />, courses?.data.map(c => {
            return getItem(c.code + ' - ' + c.courseName, c.code);
        })),

        getItem(<p onClick={onChangeExamCenter}>Exams Center</p>, 'sub2', <AppstoreOutlined />, exams.map(e => {
            return getItem(e.title, e.code);
        })),
        getItem('Group', 'grp', null, [
            getItem('Blogs Center', '13'),
            getItem('Documents Center', '14')], 'group'),
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        if(courses?.data.map(e => e.code).includes(e.key)) {
            CourseService.getAllCourse("abc", 1, max, loadCourse);
            setElementDashboard(<CourseManagement code={e.key}/>);
        } else if(exams.map(e => e.code).includes(e.key)) {
            setElementDashboard(<ExamManagement />);
        }
    };

    return <div className="management">
        <div className="menu">
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </div>
        <div className="dashboard">
            {elementDashboard}
        </div>
    </div>
}


export default ManagementComponent;