import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (room, username) => {
  const s = io('http://192.168.0.8:9005', {
    reconnection: false,
    query: `username=${username}&room=${room}`, //"room=" + room+",username="+username,
  });
  s.on("connect", () => setConnected(true));
  s.on("read_message", (res) => {
    console.log(res);
    setSocketResponse({
      room: res.room,
      content: res.content,
      username: res.username,
      messageType: res.messageType,
      createdDateTime: res.createdDateTime,
    });
  });
};


export const test = () => {
  console.log('123')
}
 