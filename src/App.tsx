import './App.css'
import BodyComponent from './components/body/BodyComponent';
import TokenProvider from './context/TokenProvider';
import HeaderComponent from './components/header/HeaderComponent'


function App() {
  return (
    <TokenProvider>
        <HeaderComponent></HeaderComponent>
      <BodyComponent></BodyComponent>
    </TokenProvider>
  )
}

export default App
