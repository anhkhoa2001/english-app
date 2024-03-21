import './css/Q&ATab.scss'
import React, { ReactNode, useEffect, useState } from 'react';
import { Avatar, Button, Form } from 'antd';
import { Comment } from '@ant-design/compatible';
import TextArea from 'antd/es/input/TextArea';
//@ts-ignore
import { useSocket } from '../../../../socket/socket';
import { useParams } from 'react-router-dom';
import { URL_SOCKET } from "../../../../entity/Contants";
import { MessageResponse } from '../../../../entity/response/MessageResponse';
import { CommentDTO } from '../../../../entity/props/Socket';
import CommentService from '../../../../service/CommentService';

interface ExampleCommentProps {
  children?: ReactNode;
  content: string;
  avatar: string;
  name: string;
  socket?: any;
  comment_id: number;
  handle?: any;
  info: any;
}

interface StructuralComment {
  hasChild: boolean;
  childrens: React.ReactNode;
  element: React.ReactNode;
  content: string;
  avatar: string;
  name: string;
}

const ExampleComment: React.FC<ExampleCommentProps> = ({ children, content, avatar, name, socket, comment_id, handle, info }) => {
  const [contentCurrent, setContentCurrent] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [reply, setReply] = useState(false);

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
          src={info.avatar || ""}
          alt={info.fullname || ""}
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

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const Editor: React.FC<EditorProps> = ({ onChange, onSubmit, submitting, value }) => {
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

const TABLE_REF = 'u_course';
const QATab: React.FC = () => {
  const { code } = useParams();
  const [info, setInfo] = useState();
  const [elements, setElements] = useState<CommentDTO[]>([]);
  const [contentCurrent, setContentCurrent] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const socket = useSocket('', code, TABLE_REF, localStorage.getItem('userId'), 0, URL_SOCKET);


  const handleChange = (e: any) => {
    setContentCurrent(e.target.value);
  }

  const handleSubmit = () => {
    setSubmitting(true);
    console.log('message socket', socket);
    const send = socket[0];
    send(contentCurrent, 0);
    setTimeout(() => {
      reRender();
      setSubmitting(false);
    }, 1000)
  }

  const reRender = () => {
    console.log('re-render', info);
    CommentService.getAllComment({
      refId: code,
      entityRef: TABLE_REF
    }, loadComments);
  }

  const loadComments: (data: MessageResponse<CommentDTO[]> | null) => void = (data) => {
    try {
      setElements(data?.data || []);
      console.log('comments', data?.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    try {
      CommentService.getAllComment({
        refId: code,
        entityRef: TABLE_REF
      }, loadComments);
      setInfo(JSON.parse(localStorage.getItem("info")));
    } catch (err) {
      setInfo({
        avatar: '',
        fullname: ''
      });
    }
  }, [code]);

  if(socket[3] != undefined) {
    socket[3].on("read_message", (res: CommentDTO) => {
      const newEle = [...elements];
      if(res.parentId == 0) {
        setElements([...newEle, res]);
      } else {
        insertComment(newEle, res.parentId, res);
        setElements(newEle);
        console.log('newEle', newEle);
      }
    });
  }

  // function insertComment(tree: CommentDTO[], parentId: number, newComment: CommentDTO) {
  //     for (const node of tree) {
  //         if(newComment.commentId == node.commentId) {
  //             return false;
  //         } else if (node.commentId === parentId) {
  //             if (!node.childrens) {
  //                 node.childrens = [];
  //             }
  //             if(newComment.commentId != node.commentId) {
  //               node.childrens.push(newComment);
  //             }
  //             return true; // Đã thêm thành công
  //         } else if (node.childrens && insertComment(node.childrens, parentId, newComment)) {
  //             return true; // Đã thêm thành công
  //         }
  //     }
  //     return false; // Không tìm thấy parentId trong cây
  // }

    function insertComment(tree: CommentDTO[], parentId: number, newComment: CommentDTO) {
      // Hàm đệ quy để tìm nút cha có parentId tương ứng
      const findParent = (nodes: CommentDTO[]) => {
          for (const node of nodes) {
              if (node.commentId === parentId) {
                  // Nếu tìm thấy nút cha, kiểm tra xem newComment đã tồn tại trong childrens chưa
                  const existIndex = node.childrens.findIndex(child => child.commentId === newComment.commentId);
                  if (existIndex === -1) {
                      // Nếu không tìm thấy newComment, chèn vào mảng childrens
                      node.childrens.push(newComment);
                  } else {
                      // Nếu newComment đã tồn tại, ghi đè lên
                      node.childrens[existIndex] = newComment;
                  }
                  return true;
              } else if (node.childrens && findParent(node.childrens)) {
                  // Nếu không tìm thấy ở nút hiện tại, tiếp tục tìm trong các nút con
                  return true;
              }
          }
          return false;
      };

      // Bắt đầu tìm nút cha từ gốc của cây
      findParent(tree);
  }

  const convertToExampleCommentProps = (data: any[]): React.ReactNode => {
    const result: React.ReactNode[] = [];

    const convert = (comments: any[]): void => {
      for (const comment of comments) {
        const { childrens, content, avatar, name, commentId } = comment;
        let convertedComment: React.ReactNode =
          <ExampleComment content={content} name={name} avatar={avatar} socket={socket} comment_id={commentId} handle={reRender} info={info}></ExampleComment>;
        if (childrens && childrens.length > 0) {
          const childElement = convertToExampleCommentProps(childrens);
          convertedComment = <ExampleComment info={info} content={content} name={name} avatar={avatar} socket={socket} comment_id={commentId} handle={reRender}>{childElement}</ExampleComment>
        }

        result.push(convertedComment);
      }
    };

    convert(data);

    return result;
  };

  return <>
    {
      convertToExampleCommentProps(elements)
    }
    <Comment
      author={<a>{info?.fullname || ""}</a>}
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
    />
  </>
};

export default QATab;