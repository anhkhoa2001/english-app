import { AppstoreOutlined, DeleteOutlined, EditOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Form, Input, MenuProps, Space, Table, TableProps, Tag } from "antd";
import { Menu } from "antd/lib";
import './css/ManagementComponent.scss';
import { CourseItemDTO } from "../../../entity/props/CourseItemDTO";
import CourseManagement from "./course/CourseManagement";
import { useState } from "react";
import CourseList from "./course/CourseList";
import { ExamItemDTO } from "../../../entity/props/ExamItemDTO";
import ExamManagement from "./exam/ExamManagement";

type MenuItem = Required<MenuProps>['items'][number];

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

    const courses: CourseItemDTO[] = [
        {
            code: "TOEIC2001",
            title: "The English Master Course",
            type: 0
        }
    ];

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

    const items: MenuProps['items'] = [
        getItem(<p onClick={onChangeCourseCenter}>Courses Center</p>, 'sub1', <AppstoreOutlined />, courses.map(c => {
            return getItem(c.title, c.code);
        })),

        getItem('Exams Center', 'sub2', <AppstoreOutlined />, exams.map(e => {
            return getItem(e.title, e.code);
        })),
        getItem('Group', 'grp', null, [
            getItem('Blogs Center', '13'),
            getItem('Documents Center', '14')], 'group'),
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        
        if(courses.map(e => e.code).includes(e.key)) {
            setElementDashboard(<CourseManagement />);
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