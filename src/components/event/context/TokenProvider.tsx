import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoginService from '../../../service/LoginService';
import MessageResponse from '../../../dto/response/MessageResponse';

class TokenContextProps {
    token: string;
    isLogined: boolean;

    constructor(token: string, isLogined: boolean) {
      this.token = token;
      this.isLogined = isLogined;
    }
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const prop = new TokenContextProps("", false);
    const tokenCurrent = localStorage.getItem("access_token");
    const [session, setSession] = useState<TokenContextProps | null>(prop);

    const afterCheckLogin: (response: MessageResponse<string> | null, i: boolean) => void = (response, i) => {
        if(response != null) {
          console.log('response', response);
          console.log('i', i);
          prop.token = response.data;
          prop.isLogined = i;
          setSession(prop);
        }
    };

    if(tokenCurrent == undefined) {
        const code = new URLSearchParams(window.location.search).get('code');
        const username = new URLSearchParams(window.location.search).get('username');
        const type = new URLSearchParams(window.location.search).get('type');

        console.log('code in provider', code);
        LoginService.getToken({
            code: code,
            username: username,
            type: type
        }, afterCheckLogin);
    } else {
        LoginService.checkLogin(tokenCurrent, afterCheckLogin);
    }

    return (
        <TokenContext.Provider value={session == null ? prop : session}>
          {children}
        </TokenContext.Provider>
      );
}

export const useToken = () => {
  return useContext(TokenContext);
};

export default TokenProvider;