import { Comment } from "@ant-design/compatible";
import { Avatar, Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ReactNode, useState } from "react";


export interface ExampleCommentProps {
  children?: ReactNode;
  content: string;
  avatar: string;
  name: string;
  socket?: any;
  comment_id: number;
  handle?: any;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

export const Editor: React.FC<EditorProps> = ({ onChange, onSubmit, submitting, value }) => {
  return <div className='comment-input'>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} defaultValue={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>;
};

const CommentCustom: React.FC<ExampleCommentProps> = 
              ({ children, content, avatar, name, socket, comment_id, handle }) => {
    const [contentCurrent, setContentCurrent] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [reply, setReply] = useState(false);
    //@ts-ignore
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")));
  
    const handleChange = (e: any) => {
      setContentCurrent(e.target.value);
    }
  
    const handleSubmit = () => {
      setSubmitting(true);
      console.log('message socket', socket);
      const send = socket[0];
      send(contentCurrent, comment_id);
      setTimeout(() => {
        handle();
        setSubmitting(false);
        setReply(false);
      }, 1000);
    }
  
    const onReply = (id: number) => {
      console.log('id', id);
      setReply(true);
    }
  
    return <>
      <Comment
        actions={[<span key="comment-nested-reply-to" onClick={() => onReply(comment_id)}>Reply to</span>]}
        author={<a>{name}</a>}
        avatar={
          <Avatar
            src={avatar}
            alt={name}
          />
        }
        datetime={"2016-11-22 11:22:33"}
        content={
          <p>
            {content}
          </p>
        }
      >
        {children}
      </Comment>
      {reply ? <Comment
        style={{ marginLeft: "20px" }}
        avatar={
          <Avatar
            src={info?.avatar || ""}
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
      /> : <></>}
    </>;
  };


  export default CommentCustom;