import { Button } from "antd";

const QuestionNumber: React.FC<{index: number}> = ({index}) => {
    return <Button  style={{borderRadius: '0px'}} type="text">{index}</Button>
}


export default QuestionNumber;