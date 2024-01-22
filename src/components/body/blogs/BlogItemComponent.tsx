import { Comment } from '@ant-design/compatible';
import { BlogItemDTO } from '../../../entity/props/BlogItemDTO';
import './css/BlogItemComponent.scss'
import { Avatar } from 'antd';
import './css/BlogItemComponent.scss'

const BlogItemComponent: React.FC<{blog: BlogItemDTO}> = ({blog}) => {

    return <div className="blog-item">
        <Comment
            author={<a>{blog.author.fullname}</a>}
            avatar={
                <Avatar
                    src={blog.author.avartar}
                    alt={blog.author.fullname}
                />
            }
            content={blog.author.createAt}
            className="blog-item-avatar"
        />
        <div className="blog-content">
            {blog.content}
        </div>
    </div>
}


export default BlogItemComponent;