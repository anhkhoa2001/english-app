import { Comment } from '@ant-design/compatible';
import { BlogDTO, BlogItemDTO } from '../../../entity/props/BlogItemDTO';
import './css/BlogItemComponent.scss'
import { Avatar } from 'antd';
import './css/BlogItemComponent.scss'
import React, { useState } from 'react';
import moment from 'moment';
import CommentCustom, { Editor } from '../comment/CommentCustom';

const BlogItemComponent: React.FC<{ blog: BlogDTO }> = ({ blog }) => {

    const [contentCurrent, setContentCurrent] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const info = "123";

    const ReactComponent = (element: string) => {
        return React.createElement('div', { dangerouslySetInnerHTML: { __html: element } });
    };

    const handleChange = (e: any) => {
    }

    const handleSubmit = () => {
    }

    return <>
        <div className="blog-item">
            <Comment
                author={<a>{blog.author.fullname}</a>}
                avatar={
                    <Avatar
                        src={blog.author.avatar}
                        alt={blog.author.fullname}
                    />
                }
                content={moment(blog.createAt, 'x').format('DD-MM-YYYY')}
                className="blog-item-avatar"
            />
            <div className="blog-content">
                {ReactComponent(blog?.content || "")}
            </div>

        </div>
        <div className="comment">
            <CommentCustom content={'comment chua fetch'} name={'Dam Tam Khoa'} avatar={''}
                socket={undefined} comment_id={1} handle={() => { }} >
                <CommentCustom content={'comment chua fetch'} name={'Dam Tam Khoa'} avatar={''}
                    socket={undefined} comment_id={1} handle={() => { }} >
                </CommentCustom>
            </CommentCustom>
            <Comment
                //@ts-ignore
                author={<a>{info?.fullname || ""}</a>}
                avatar={
                    <Avatar
                        //@ts-ignore
                        src={info?.avatar || ""}
                        //@ts-ignore
                        alt={info?.fullname || ""}
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={contentCurrent}
                    />
                }
            />
        </div>
    </>
}


export default BlogItemComponent;