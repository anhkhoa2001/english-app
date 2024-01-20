import { CourseItemDTO } from '../../../entity/props/CourseItemDTO';
import './CourseComponent.scss';
import CourseItemComponent from './CourseItemComponent';
import { Checkbox, Collapse, Pagination, Radio, Space } from 'antd';
import { Link } from 'react-router-dom';
import type { CheckboxProps, CollapseProps } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import TitleComponent from '../TitleComponent';

const CourseComponent: React.FC = () => {

    let data: CourseItemDTO[] = [
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS101",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS102",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS103",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS104",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        },
        {
            title: "Introduction to Programming",
            rating: 4.5,
            summary: "Unlock TOEIC Success: Master the fundamentals of the TOEIC Test fast with this course: achieve your target score!",
            code: "CS105",
            instructor: "John Doe",
            total_hours: 20,
            lectures: 10,
            level: "Beginner",
            image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/how-to-make-a-thumbnail-for-youtube_P4b_720x400?$pjpeg$&jpegSize=200&wid=720"
        }
    ];
    const onChangeVideo: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeLevel: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };


    const video_durations = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>0 - 1 Hours</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>2 - 4 Hours</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeVideo}>5 - 8 Hours</Checkbox>
        </>
    ];

    const levels = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>All Level</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>Beginner</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>Intermediate</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeLevel}>Expert</Checkbox>
        </>
    ];

    const [value, setValue] = useState(5);

    const onChangeRate = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const rating = [
        <>
            <Radio.Group onChange={onChangeRate} value={value}>
                <Space direction="vertical">
                    <Radio value={5}>
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                    </Radio>
                    <Radio value={4}>
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                    </Radio>
                    <Radio value={3}>
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'yellow' }} />
                        <IoIosStar style={{ color: 'white' }} />
                        <IoIosStar style={{ color: 'gray' }} />
                    </Radio>
                </Space>
            </Radio.Group>
        </>
    ];

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Video Durations',
            children: video_durations,
        },
        {
            key: '2',
            label: 'Level',
            children: levels,
        },
        {
            key: '3',
            label: 'Rating',
            children: rating,
        }
    ];

    return <>
        <TitleComponent type="All Courses" count_results={100} />
        <div className="course">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']} />
            </div>
            {/* <div className="left">
            <ToggleSearch
                type_select='checkbox'
                title_header='Video Durations'
                select_contents={['0 - 1 Hours', '2 - 4 Hours', '5 - 8 Hours']}
                include_icon={false}
                count_icon={[]}
                type_icon={<IoIosStar />}
            />

            <ToggleSearch
                type_select='radio'
                title_header='Ratings'
                select_contents={['5.0', '4.0', '3.0']}
                include_icon={true}
                count_icon={[5, 4, 3]}
                type_icon={<IoIosStar />}
            />

            <ToggleSearch
                type_select='checkbox'
                title_header='Level'
                select_contents={['All Level', 'Beginner', 'Intermediate', 'Expert']}
                include_icon={false}
                count_icon={[]}
                type_icon={<IoIosStar />}
            />
        </div> */}
            <div className="right">
                {Array.from({ length: data.length }, (_, i) =>
                (
                    <Link to={`/learning/course/${data[i].code}?title=${data[i].title}`} ><CourseItemComponent data={data[i]} key={data[i].code} /></Link>
                ))}
                <div className='paging'>
                    <Pagination
                        onChange={() => { console.log('123') }}
                        total={data.length}
                        pageSize={2}
                    />
                </div>
            </div>
        </div>
    </>
}


export default CourseComponent;