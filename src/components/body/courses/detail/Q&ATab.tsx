import './css/Q&ATab.scss'
import React, { ReactNode } from 'react';
import { Avatar, Button, Form } from 'antd';
import { Comment } from '@ant-design/compatible';
import TextArea from 'antd/es/input/TextArea';

interface ExampleCommentProps {
  children?: ReactNode;
}

const ExampleComment: React.FC<ExampleCommentProps> = ({ children }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <p>
          We supply a series of design principles, practical patterns and high-quality design
          resources (Sketch and Axure).
        </p>
      }
    >
      {children}
    </Comment>
  );

  interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

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

const QATab: React.FC = () => {
    return <ExampleComment>
        <ExampleComment></ExampleComment>
        <ExampleComment>
            <ExampleComment></ExampleComment>
        </ExampleComment>
    </ExampleComment>
};

export default QATab;