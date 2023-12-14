import { ReactNode, createContext, useContext, useState } from 'react';

interface RenderContextProps {
    state?: object;
    action?: (value: object) => void;
  }
  
  const RenderContext = createContext<RenderContextProps | undefined>(undefined);
  
  const RenderProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [callback, setCallback] = useState({});
  
    const updateCallback = (value: object) => {
        setCallback(value);
    };
  
    return (
      <RenderContext.Provider value={{ callback, updateCallback } as RenderContextProps}>
        {children}
      </RenderContext.Provider>
    );
  };
  
  export const useRender = () => {
    return useContext(RenderContext);
  };

  export default RenderProvider;