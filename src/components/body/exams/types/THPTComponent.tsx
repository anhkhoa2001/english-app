import { Tabs, TabsProps } from 'antd';
import '../css/THPTComponent.scss'
import { MultiChoiceProp } from '../../../../entity/props/MultiChoiceProp';
import MultiChoice from '../questions/MultiChoice';
import MultiChoiceGroup from '../questions/MultiChoiceGroup';
import { ExamPartDTO, QuestionDTO } from '../../../../entity/props/ExamDTO';
import { TypeQuestionItem } from './TOEICComponent';

const TypeQuestion = {
    SINGLE: 'Single',
    GROUP: 'Group'
}

const THPTComponent: React.FC<{parts: ExamPartDTO[]}> = ({parts}) => {

    const onChange = (key: string) => {
        console.log(key);
    };

    console.log('parts tghpr', parts);
    let start = 1;
    const items: TabsProps['items'] = parts.map((item, index) => {
        const result = {
            key: index + 1 + '',
            label: `Part ${index + 1}`,
            children: <>
                {   item.questions.map(i => {
                        // item.questions[i].type == TypeQuestion.SINGLE ? 
                        // <MultiChoice prop={item.questions[i]} key={i} /> 
                        // : 
                        // <MultiChoiceGroup 
                        // content={item.questions[i].content} 
                        // questionChilds={item.questions[i].questionChilds || []} 
                        // key={i} />

                        if(i.type == TypeQuestionItem.SINGLE) {
                            start = start + 1;
                            return <MultiChoice prop={i} start={start - 1} /> 
                        } else {
                            start = start + i.questionChilds.length;
                            return <MultiChoiceGroup 
                                    content={i.content} 
                                    questionChilds={i.questionChilds || []} 
                                    start = {start - i.questionChilds.length}
                                    />
                        }
                    })} 
            </>
        }  
        return result;
    });

    return <div className="thpt-exam">
        <Tabs className="tab-list" defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
}


export default THPTComponent;