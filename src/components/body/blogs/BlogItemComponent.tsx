import { Comment } from '@ant-design/compatible';
import { BlogDTO, BlogItemDTO } from '../../../entity/props/BlogItemDTO';
import './css/BlogItemComponent.scss'
import { Avatar } from 'antd';
import './css/BlogItemComponent.scss'
import React from 'react';
import moment from 'moment';

const BlogItemComponent: React.FC<{blog: BlogDTO}> = ({blog}) => {

    const ReactComponent = (element: string) => {
        return React.createElement('div', { dangerouslySetInnerHTML: { __html: element } });
    };

    return <div className="blog-item">
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
}


export default BlogItemComponent;