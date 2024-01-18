import './App.css'
import TokenProvider from './context/TokenProvider';
import HeaderComponent from './components/header/HeaderComponent'
import { Outlet } from 'react-router-dom';
import BodyComponent from './components/body/BodyComponent';


function App() {
  return (
    <TokenProvider>
        <HeaderComponent></HeaderComponent>
        <BodyComponent ></BodyComponent>
    </TokenProvider>
  )
}

export default App
