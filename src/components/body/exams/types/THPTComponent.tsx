import { Tabs, TabsProps } from 'antd';
import '../css/THPTComponent.scss'
import { MultiChoiceProp } from '../../../../entity/props/MultiChoiceProp';
import MultiChoice from '../questions/MultiChoice';
import MultiChoiceGroup from '../questions/MultiChoiceGroup';

const TypeQuestion = {
    SINGLE: 0,
    GROUP: 1
}

const THPTComponent: React.FC<{questions: {
    type: number,
    data: MultiChoiceProp[]
}[]}> = ({questions}) => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = questions.map((item, index) => {
        const result = {
            key: index + 1 + '',
            label: `Part ${index + 1}`,
            children: <>
                {Array.from({ length: item.data.length }, (_, i) => (
                     item.data[i].type == TypeQuestion.SINGLE ? 
                     <MultiChoice prop={item.data[i]} key={i}/> 
                     : 
                     <MultiChoiceGroup   
                     content={item.data[i].content} 
                     questionChilds={item.data[i].questionChilds || []} 
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