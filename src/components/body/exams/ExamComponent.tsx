import { Avatar, Checkbox, CheckboxProps, Collapse } from 'antd';
import TitleComponent from '../TitleComponent';
import './css/ExamComponent.scss'
import { CollapseProps } from 'antd/lib';
import { Comment } from '@ant-design/compatible';

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

    return <>
        <TitleComponent type="All Examinations" count_results={100} />
        <div className="exam">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']} />
            </div>
            <div className="right">
                <div className="exam-item">
                    <img className="item-image" src="https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png" alt="" />
                    <div className='item-detail'>
                        <h2>TOEIC New Economy</h2>
                        <p>Bộ đề chuẩn chỉnh format TOEIC mới nhất kèm đầy đủ, giải thích đáp án.
                            Luyện đề TOEIC New Economy chi tiết theo từng bước, xử lý mọi dạng bài và các tips quan trọng mọi
                            sĩ tử nên nằm lòng trước khi đi thi.</p>
                    </div>
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                        }
                        content={''
                        }
                    />
                </div>
                <div className="exam-item">
                    <img className="item-image" src="https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png" alt="" />
                    <div className='item-detail'>
                        <h2>TOEIC New Economy</h2>
                        <p>Bộ đề chuẩn chỉnh format TOEIC mới nhất kèm đầy đủ, giải thích đáp án.
                            Luyện đề TOEIC New Economy chi tiết theo từng bước, xử lý mọi dạng bài và các tips quan trọng mọi
                            sĩ tử nên nằm lòng trước khi đi thi.</p>
                    </div>
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                        }
                        content={''
                        }
                    />
                </div>
                <div className="exam-item">
                    <img className="item-image" src="https://res.cloudinary.com/dwqrocbjv/image/upload/v1705601402/r3nuc5zs1rxdvckabo4x.png" alt="" />
                    <div className='item-detail'>
                        <h2>TOEIC New Economy</h2>
                        <p>Bộ đề chuẩn chỉnh format TOEIC mới nhất kèm đầy đủ, giải thích đáp án.
                            Luyện đề TOEIC New Economy chi tiết theo từng bước, xử lý mọi dạng bài và các tips quan trọng mọi
                            sĩ tử nên nằm lòng trước khi đi thi.</p>
                    </div>
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                        }
                        content={''
                        }
                    />
                </div>
            </div>
        </div>
    </>

}


export default ExamComponent;