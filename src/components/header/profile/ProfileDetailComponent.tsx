import { Button, message, Input, Tabs, TabsProps, Upload, UploadProps } from 'antd';
import './ProfileDetailComponent.scss'
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import LoginService from '../../../service/LoginService';
import { UserDTO } from '../../../entity/props/ExamDTO';
import { MessageResponse } from '../../../entity/response/MessageResponse';

const ProfileDetailComponent: React.FC = () => {
    const appName = 'Udemy';

    const onChange = (key: string) => {
        console.log(key);
    };

    

    const [info, setInfo] = useState({avatar: '', username: '', fullname: '', email: ''});

    useEffect(() => {
        var token = localStorage.getItem("access_token");
        LoginService.getUsetInfo(token, (response: MessageResponse<UserDTO> | null) => {
            setInfo({
                username: response?.data.username || '',
                avatar: response?.data.avatar || '',
                fullname: response?.data.fullname || '',
                email: response?.data.email || ''
            });
        });
    }, []);


    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Personal Details',
            children: <div>
                <p>Email: {info.email} ({appName} does not support changing emails. Please contact us if you have purchased the course and want to change your account.)</p>
                <span className='label'>Fullname</span>
                <Input className='input' placeholder="Basic usage" value={info?.fullname} />
                <span className='label'>Username</span>
                <Input className='input' value={info?.username} />
                <span className='label'>About Myself</span>
                <TextArea className='input' rows={5} placeholder='Share interesting things about yourself' />
                <span className='label'>Avatar</span>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <Button type="text" className='submit'>Save Profile</Button>
            </div>
        },
        {
            key: '2',
            label: 'Account Privacy',
            children: <p>Please read the <Link to="/profile/privacy">privacy statement</Link>
                &nbsp; and <Link to="/profile/term"> &nbsp; terms of use</Link>.</p>,
        },
        {
            key: '3',
            label: 'Change Password',
            children: <p>To change your password, you need to go directly to gmail or facebook to request a change. Because {appName} only connects accounts to Gmail/Facebook/GitHub, the website does NOT store passwords or support changing passwords.</p>,
        },
    ];

    return <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
        <div className="profile-detail">
        <h1>Account Center</h1>
        <Tabs size='large' defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
    </div>
}

export default ProfileDetailComponent;