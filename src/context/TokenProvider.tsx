import React, { createContext, useContext, useState, useEffect } from 'react';
import LoginService from '../service/LoginService';
import { MessageResponse } from '../entity/response/MessageResponse';
import { UserInfo } from '../components/header/HeaderComponent';
import { UserDTO } from '../entity/props/ExamDTO';

class TokenContextProps {
    token: string;
    isLogined: boolean;

    constructor(token: string, isLogined: boolean) {
      this.token = token;
      this.isLogined = isLogined;
    }
}

export const TokenContext = createContext<TokenContextProps | undefined>(undefined);

const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const prop = new TokenContextProps("", false);
    const tokenCurrent = localStorage.getItem("access_token");
    const [session, setSession] = useState<TokenContextProps>(prop);

    const afterCheckLogin: (response: MessageResponse<string> | null, i: boolean) => void = (response, i) => {
      console.log('response', response);
      if(response != null) {
          setSession(new TokenContextProps(response.data, i));
          localStorage.setItem("access_token", response.data);

          const token = response.data;
          var info = localStorage.getItem('info') || null;
          if(info == null) {
              LoginService.getUsetInfo(token, (response: MessageResponse<UserDTO> | null) => {    
                  const info = new UserInfo(response?.data?.avatar ?? '', response?.data?.fullname ?? '', response?.data?.userId ?? '', response?.data?.username ?? '');
                  localStorage.setItem('info', JSON.stringify(info)); 
                  localStorage.setItem('userId', response?.data?.userId ?? '');
              });
          }
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("info");
          localStorage.removeItem("refresh");
          localStorage.removeItem("userId");
          setSession(new TokenContextProps("", false));
        }
    };


    useEffect(() => {
      if(tokenCurrent == undefined) {
        const url = new URLSearchParams(window.location.search);
        const code = url.get('code');
        const username = url.get('username');
        const type = url.get('type');
        const refresh = {
            code: code,
            username: username,
            type: type
        };
        localStorage.setItem('refresh', JSON.stringify(refresh));
        LoginService.getToken({
            code: code,
            username: username,
            type: type
        }, afterCheckLogin);
      } else {
          LoginService.checkToken(tokenCurrent, afterCheckLogin);
      }
    }, []);

    return (
        <TokenContext.Provider value={session}>
          {children}
        </TokenContext.Provider>
      );
}

export const useToken = () => {
  return useContext(TokenContext);
};


export default TokenProvider;



