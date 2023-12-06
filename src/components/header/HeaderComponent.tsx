import RedirectButton from "../button/RedirectButton";


const HeaderComponent: React.FC = () => {


    return <nav className="flex">
        <div className="container">
            <img src="./public/logo.webp" className="w-0.5"/>
        </div>
        <div className="basis-1/2">
            <RedirectButton content="HomePage"></RedirectButton>
        </div>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Button
</button>
    </nav>
}

export default HeaderComponent;
