import './css/Q&ATab.scss'
import React, { ReactNode, useEffect, useState } from 'react';
import { Avatar, Button, Form } from 'antd';
import { Comment } from '@ant-design/compatible';
//@ts-ignore
import { useSocket } from '../../../../socket/socket';
import { useParams } from 'react-router-dom';
import { URL_SOCKET } from "../../../../entity/Contants";
import { MessageResponse } from '../../../../entity/response/MessageResponse';
import { CommentDTO } from '../../../../entity/props/Socket';
import CommentService from '../../../../service/CommentService';
import CommentCustom, { Editor } from '../../comment/CommentCustom';

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
          <CommentCustom content={content} name={name} avatar={avatar} socket={socket} comment_id={commentId} handle={reRender} info={info}></CommentCustom>;
        if (childrens && childrens.length > 0) {
          const childElement = convertToExampleCommentProps(childrens);
          convertedComment = <CommentCustom content={content} name={name} avatar={avatar} socket={socket} comment_id={commentId} handle={reRender}>{childElement}</CommentCustom>
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