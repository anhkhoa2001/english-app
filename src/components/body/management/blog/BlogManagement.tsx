import { Button, Image, Modal, Space, Switch, Table, TableProps, Tag } from 'antd';
import '../css/BlogMangement.scss';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import BlogForm from '../form/BlogForm';
import { MessageResponse } from '../../../../entity/response/MessageResponse';
import { BlogDTO } from '../../../../entity/props/BlogItemDTO';
import { ModalCustom } from '../../../exception/SuccessModal';
import BlogService from '../../../../service/BlogService';


const skill = ['Listening', 'Writing', 'Speaking', 'Reading'];
const englishBasic = ['Pronunciation', 'Grammary', 'Vocabulary'];
const englishFor = ['For Newbie', 'For Oversea Student', 'For Working People'];

const ADD_BLOG = 'ADD_BLOG';
const EDIT_BLOG = 'EDIT_BLOG';
const modal = new Map();
modal.set(ADD_BLOG, false);
modal.set(EDIT_BLOG, false);

const BlogManagement: React.FC = () => {
    const blogFormRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(modal);
    const [blogs, setBlogs] = useState<BlogDTO[]>([]);
    const blogRef = useRef<BlogDTO>();

    const showModalAdd = (key: string) => {
        modal.set(key, true);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const change = (e:any) => {

    }

    const getAll: (data: MessageResponse<BlogDTO[]> | null) => void = (data) => {
        try {
            setBlogs(data?.data || []);
            console.log('data blogs', data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        BlogService.getAllBlog(getAll);
    }, []);


    const handleTypeBlog = (input: string, color: string) => {
        return input.split(',').map(i => {
            return <Tag color={color}>
                    {i.toUpperCase()}
                </Tag>;
        });
    }
      
    const columns: TableProps<BlogDTO>['columns']= [
    {
        title: 'ID',
        dataIndex: 'blogId',
        key: 'blogId',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (url) => <Image
            width={120}
            src={url}
        />
    },
    {
        title: 'Skill',
        dataIndex: 'skill',
        key: 'skill',
        render: (text) => <>{handleTypeBlog(text, 'blue')}</>
    },
    {
        title: 'English Basic',
        dataIndex: 'englishBasic',
        key: 'englishBasic',
        render: (text) => <>{handleTypeBlog(text, 'red')}</>
    },
    {
        title: 'English For',
        dataIndex: 'englishFor',
        key: 'englishFor',
        render: (text) => <>{handleTypeBlog(text, 'green')}</>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (pub) => <Switch checked={pub} disabled />
    },
    {
        title: 'Create At',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (value: Date) => `${moment(value).format('DD-MM-YYYY HH:mm:ss')}`,
    },
    {
        title: 'Create By',
        dataIndex: 'createBy',
        key: 'createBy',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, e) => (
            <Space size="middle">
                <Button onClick={() => {
                    console.log('click edit', e);
                    blogRef.current = e;
                    showModalAdd(EDIT_BLOG);
                }}  icon={<EditOutlined />} />
            </Space>
        ),
    },
    ];



    const handleOk = (key: string) => {
        modal.set(key, false);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const handleCancel = (key: string) => {
        modal.set(key, false);
        const newMap = new Map(modal);
        setIsModalOpen(newMap);
    };

    const submitFormAddBlog = (e: any) => {
        console.log('submit blog', e);

        const create: (data: MessageResponse<BlogDTO> | null) => void = (data) => {
            try {
                handleOk(ADD_BLOG);
                ModalCustom.onDisplaySuccess('Success', 'Success');
                //CourseService.getAllCourse(default_page, default_pageSize, loadCourse);
            } catch (error) {
                console.log('error', error);
            }
        }

        BlogService.createBlog(e, create);
    }


    const submitFormEditBlog = (e: any) => {
        console.log('submit edit blog', e);
    }

    return <div className="blog-management">
        <span className="title">All Blogs</span>
        <span className="add-course">
            <Button type="primary"  icon={<PlusOutlined />} onClick={() => showModalAdd(ADD_BLOG)}>
                Add Blog
            </Button>
        </span>
        <Table columns={columns} dataSource={blogs} 
            style={{ width: 1300 }}  
            onChange={change} />

        <Modal title="Add New Blog"
            open={isModalOpen.get(ADD_BLOG)}
            onOk={() => {
                //@ts-ignore
                blogFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(ADD_BLOG)}
            okText='Submit'
            width={1600}>
            <BlogForm onSubmit={submitFormAddBlog} blogFormRef={blogFormRef} />
        </Modal>

        <Modal title="Add Edit Blog"
            open={isModalOpen.get(EDIT_BLOG)}
            onOk={() => {
                //@ts-ignore
                blogFormRef.current?.submit();
            }}
            onCancel={() => handleCancel(EDIT_BLOG)}
            okText='Submit'
            width={1600}>
            <BlogForm onSubmit={submitFormEditBlog} blogFormRef={blogFormRef} item={blogRef.current} />
        </Modal>
    </div>
}


export default BlogManagement;