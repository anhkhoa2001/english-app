import './App.css'
import BodyComponent from './components/body/BodyComponent';
import TokenProvider from './context/TokenProvider';
import RenderProvider from './context/RenderProvider';
import HeaderComponent from './components/header/HeaderComponent'


function App() {
  return (
    <TokenProvider>
      <RenderProvider>
        <HeaderComponent></HeaderComponent>
        <BodyComponent></BodyComponent>
      </RenderProvider>
    </TokenProvider>
  )
}

export default App
