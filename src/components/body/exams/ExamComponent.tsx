import { Avatar, Checkbox, CheckboxProps, Collapse, Pagination } from 'antd';
import TitleComponent from '../TitleComponent';
import './css/ExamComponent.scss'
import { CollapseProps } from 'antd/lib';
import { Comment } from '@ant-design/compatible';
import { ExamItemDTO } from '../../../entity/props/ExamItemDTO';
import { Link } from 'react-router-dom';
import { TypeExam } from '../../../entity/Contants';

const ExamComponent: React.FC = () => {

    const onChangeSkill: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeType: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };


    const skills = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>All Skill</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Listening</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Writing</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Reading</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Speaking</Checkbox>
        </>
    ];

    const types = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeType}>All Exam Type</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeType}>Exam TOEIC</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeType}>Exam Ielts</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeType}>Exam THPTQG</Checkbox>
        </>
    ];

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Skill',
            children: skills,
        },
        {
            key: '2',
            label: 'Exam Type',
            children: types,
        }
    ];


    const exams: ExamItemDTO[] = [
        {
            title: "TOEIC New Economy",
            author: {
                fullname: "Dam Tam Khoa",
                role: "STUDENT",
                avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            summary: "The latest TOEIC format standard test set comes with full answers and explanations. Practice TOEIC New Economy in detail step by step, handling all types of problems and important tips every student should memorize before taking the test",
            code: "TOEIC001",
            type: TypeExam.TOEIC,
            image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
        },
        {
            title: "[2022-2023] Cụm trường phía Nam Hưng Yên - Đề thi thử tốt nghiệp THPT môn Tiếng Anh năm 2022-2023",
            author: {
                fullname: "Dam Tam Khoa",
                role: "STUDENT",
                avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            summary: "",
            code: "THPT002",
            type: 1,
            image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
        },
        {
            title: "TOEIC New Economy",
            author: {
                fullname: "Dam Tam Khoa",
                role: "STUDENT",
                avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            summary: "The latest TOEIC format standard test set comes with full answers and explanations. Practice TOEIC New Economy in detail step by step, handling all types of problems and important tips every student should memorize before taking the test",
            code: "TOEIC004",
            type: 0,
            image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
        },
        {
            title: "TOEIC New Economy",
            author: {
                fullname: "Dam Tam Khoa",
                role: "STUDENT",
                avartar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            summary: "The latest TOEIC format standard test set comes with full answers and explanations. Practice TOEIC New Economy in detail step by step, handling all types of problems and important tips every student should memorize before taking the test",
            code: "TOEIC005",
            type: 0,
            image: "https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png"
        }
    ];

    

    return <>
        <TitleComponent type="All Examinations" count_results={100} display={true} />
        <div className="exam">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']} />
            </div>
            <div className="right">
                {Array.from({ length: exams.length }, (_, i) =>
                    <Link to={`/learning/exam/${exams[i].code}?type=${exams[i].type}`} key={i}>
                        <div className="exam-item">
                            <img className="item-image" src={exams[i].image} alt="" />
                            <div className='item-detail'>
                                <h2>{exams[i].title}</h2>
                                <p>{exams[i].summary}</p>
                            </div>
                            <Comment
                                author={'Han Solo'}
                                avatar={
                                    <Avatar
                                        src={exams[i].author?.avartar}
                                        alt={exams[i].author?.fullname}
                                    />
                                }
                                content={''}
                            />
                        </div>
                    </Link>
                )}
                <div className='paging'>
                    <Pagination
                        onChange={() => { console.log('123') }}
                        total={exams.length}
                        pageSize={2}
                    />
                </div>
            </div>
        </div>
    </>

}


export default ExamComponent;