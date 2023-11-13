import { useState } from "react";
import DemoHooks from "./DemoHooks";

const Home: React.FC= () => {

    const [content, setContent] = useState(false);
    const styleDemoUseEffect = {
        color: 'blue'
    }

    return <div>
                {content && <DemoHooks></DemoHooks>}
                <button  onClick={() => {
                    setContent(!content)
                }}>Toggle</button>
            </div>
}


export default Home;