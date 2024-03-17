import { Tabs, TabsProps } from 'antd';
import '../css/THPTComponent.scss'
import { MultiChoiceProp } from '../../../../entity/props/MultiChoiceProp';
import MultiChoice from '../questions/MultiChoice';
import MultiChoiceGroup from '../questions/MultiChoiceGroup';
import { ExamPartDTO, QuestionDTO } from '../../../../entity/props/ExamDTO';

const TypeQuestion = {
    SINGLE: 'Single',
    GROUP: 'Group'
}

const THPTComponent: React.FC<{parts: ExamPartDTO[]}> = ({parts}) => {

    const onChange = (key: string) => {
        console.log(key);
    };

    console.log('parts tghpr', parts);

    const items: TabsProps['items'] = parts.map((item, index) => {
        const result = {
            key: index + 1 + '',
            label: `Part ${index + 1}`,
            children: <>
                {Array.from({ length: item.questions.length }, (_, i) => (
                     item.questions[i].type == TypeQuestion.SINGLE ? 
                     <MultiChoice prop={item.questions[i]} key={i}/> 
                     : 
                     <MultiChoiceGroup   
                     content={item.questions[i].content} 
                     questionChilds={item.questions || []} 
                     key={i} />
                ))} 
            </>
        }  
        return result;
    });

    return <div className="thpt-exam">
        <Tabs className="tab-list" defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
}


export default THPTComponent;