import './App.css'
import BodyComponent from './components/body/BodyComponent';
import TokenProvider from './context/TokenProvider';
import HeaderComponent from './components/header/HeaderComponent'
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <TokenProvider>
        <HeaderComponent></HeaderComponent>
        <BodyComponent />
    </TokenProvider>
  )
}

export default App
