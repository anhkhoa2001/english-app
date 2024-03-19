import './App.css'
import TokenProvider from './context/TokenProvider';
import HeaderComponent from './components/header/HeaderComponent'
import BodyComponent from './components/body/BodyComponent';
import { useEffect, useState } from 'react';
import { test, useSocket } from './socket/socket'

function App() {
  const [isConnected, setConnected] = useState(false);
  const [socket, setSocket] = useState<any>();
  test();
  useSocket('123', '321');
  return (
    <TokenProvider>
        <HeaderComponent></HeaderComponent>
        <BodyComponent ></BodyComponent>
    </TokenProvider>
  )
}

export default App
