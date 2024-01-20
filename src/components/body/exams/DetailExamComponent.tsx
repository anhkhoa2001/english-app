import { useSearchParams } from "react-router-dom";
import CommonNav from "../courses/detail/CommonNav";
import './css/DetailExamComponent.scss'
import { TypeExam } from "../../../entity/Contants";
import ToeicComponent from "./types/TOEICComponent";

const DetailExamComponent: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const type: number = Number(searchParams.get('type'));

    return <div className="detail-exam">
        <CommonNav title={`Practice Set 2023 TOEIC Test 1 `} url_back="/exams" />

        <div className="content-exam">
            <div className="overview">

            </div>
            <div className="questions">
                {
                    type == TypeExam.TOEIC ? <ToeicComponent /> : <h1>hihi</h1>
                }
            </div>
        </div>
    </div>
}


export default DetailExamComponent;