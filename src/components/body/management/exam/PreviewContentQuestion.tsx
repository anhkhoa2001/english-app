import { Image } from 'antd';
import '../css/PreviewContentQuestion.scss'


const PreviewContentQuestion: React.FC<{content: React.ReactNode}> = ({content}) => {

    return <div className="preview-content-question">
        {content?.type == 'img' ? 
        <Image
            width={400}
            src="https://study4.com/media/ets2023/img/1/image15.png"
        /> : content}
    </div>
}


export default PreviewContentQuestion;