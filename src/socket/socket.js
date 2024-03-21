import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (content, refId, entityRef, sender, parentId, url) => {
  const [socket, setSocket] = useState();
  const [connect, setConnect] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    const s = io(url, {
      reconnection: false,
      query: `refId=${refId}&entityRef=${entityRef}&sender=${sender}&parentId=${parentId}`,
    });
    setSocket(s);
    s.on("connect", () => {
      console.log('connected', s);
      setConnect(true);
    });

    s.on("disconnect", () => {
      console.log('disconnect');
      setConnect(false);
    });

    s.on("connect_error", (err) => {
      console.log('connect_error', err);
    });
  }, [refId + entityRef]);

    

  const readMessage = () => {
    socket.on("read_message", (res) => {
      console.log('read message', res);
      setResponse(res);
    });
  }

  const sendMessage = (content, pId) => {
    const m = {
      content: content,
      sender: sender,
      parentId: pId,
      refId: refId,
      entityRef: entityRef
    };

    console.log('send message', m);
    socket.emit("send_message",
      m
    );
  }

  return [sendMessage, response, connect, socket, readMessage];
};
