import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import LoginService from '../service/LoginService';
import MessageResponse from '../entity/response/MessageResponse';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const afterCheckLogin: (response: MessageResponse<string> | null, i: boolean) => void = (response, i) => {
        if(response != null) {
          console.log((window as any).globalConfig.PATH_FE);
          setSession(new TokenContextProps(response.data, i));
          localStorage.setItem("access_token", response.data);
          navigate('/');
        } else {
          localStorage.removeItem("access_token");
          setSession(new TokenContextProps("", false));
        }
    };


    useEffect(() => {
      if(tokenCurrent == undefined) {
        const url = new URLSearchParams(window.location.search);
        const code = url.get('code');
        const username = url.get('username');
        const type = url.get('type');
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



