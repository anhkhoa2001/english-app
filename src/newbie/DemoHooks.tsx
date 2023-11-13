import { useEffect, useLayoutEffect, useRef, useState } from "react";

//Hooks
//Higher Order Component
//Render props


//demo useEffect
//1. UseEffect
//Cập nhật lại state
//Cập nhật lại DOM (mutate)
//Render Component
//Call cleanup function
//call useEffect callback

//2. UseLayoutEffect
//Cập nhật lại state
//mutate
//call cleanup funtion
//call useLayoutEffect callback
//render component

//3.UseRef
//Nhận 1 giá trị tham chiếu từ bên ngoài component
//4.UseMemo
//k phải 1 hook
//tránh re-render component
//so sánh props của component để quyết định re-render


//5. UseCallback
//depens của useCallback rỗng thì tham chiếu của giá trị không bị thay đổi
//sử dụng cùng memo

//6. UseMemo
//tránh thực hiện logic không cần thiết

const DemoHooks: React.FC = () => {
    const [count, setCount] = useState(0);
    const [countdown, setCountDown] = useState(10);

    let timerId = useRef(100);


    const handleStart = () => {
        console.log('countdown');
        timerId.current = setInterval(() => {
            setCountDown((c) => c > 0 ? c - 1 : c);
        }, 1000);
    };


    return <div>
        <h1>{countdown}</h1>
        <button onClick={handleStart}>Start</button>
        <button onClick={() => {
            clearInterval(timerId.current);
            console.log('stop');
        }}>Stop</button>
    </div>
}


export default DemoHooks;