import React, { useState } from 'react';
import { Avatar, Button, Flex, Form, Input, List, Rate, Tooltip } from 'antd';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';
import { URL_SOCKET } from "../../../../entity/Contants";
//@ts-ignore
import { useSocket } from '../../../../socket/socket';
import './css/ReviewsTab.scss';
import { useParams } from 'react-router-dom';


const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


const { TextArea } = Input;

interface CommentItem {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
}

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const CommentList: React.FC<{ comments: CommentItem[] }> = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props: CommentItem) => <Comment {...props} />}
    />
);

const Editor: React.FC<EditorProps> = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

const ReviewsTab: React.FC = () => {
    const {code} = useParams();
    const socket = useSocket('', code, 'comment', 'khoadt', 0, URL_SOCKET);
    
    console.log('socket', socket);
    const data:CommentItem[] = [
        {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>tuyet voi</p>,
            datetime: moment().fromNow(),
          },
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>nhu cc</p>,
            datetime: moment().subtract(2, 'days').fromNow(),
          },
    ];
    const [comments, setComments] = useState<CommentItem[]>(data);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (!value) {
            return;
        }

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                },
                ...comments,
            ]);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const [rate, setRate] = useState(4);
    return <div className='review-tab'>
        <h2 className='header'>Student feedback</h2>
        <Flex gap="middle" vertical>
            <Rate disabled tooltips={desc} onChange={setRate} value={rate} />
        </Flex>
        {/* comment */}
        <div>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </div>
    </div>;
}


export default ReviewsTab;