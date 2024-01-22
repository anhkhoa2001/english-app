import { Avatar, Checkbox, CheckboxProps, Collapse, CollapseProps, Image, Pagination } from "antd";
import TitleComponent from "../TitleComponent";
import './css/LibraryComponent.scss';
import { Comment } from "@ant-design/compatible";
import { LibraryItemDTO } from "../../../entity/props/LibraryItemDTO";
import { useState } from "react";
import DetailDocComponent from "./DetailDocComponent";

const LibraryComponent: React.FC = () => {

    const onChangeTopic: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeSkill: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeCollapse = (key: string | string[]) => {
        console.log(key);
    };

    const topics = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeTopic}>TOEIC</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeTopic}>IELTS</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeTopic}>VSTEP</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeTopic}>THPT</Checkbox>
        </>
    ];

    const skills = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Reading</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Listening</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Speaking</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Writing</Checkbox>
        </>
    ];

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Topic',
            children: topics,
        },
        {
            key: '2',
            label: "Skills",
            children: skills,
        }
    ];

    const libraries: LibraryItemDTO[] = [
        {
            title: "Destination C1&C2 Upper Intermediate Student Book + Key",
            author: {
                fullname: "Dam Tam Khoa",
                role: "STUDENT",
                avartar: "https://avatars.githubusercontent.com/u/72397589?v=4",
                createAt: "26/03/2021"
            },
            summary: "You need to grasp these skills to improve your IELTS Reading score. Let's read the following article!",
            code: "BLOG001",
            image: "https://d20ohkaloyme4g.cloudfront.net/img/document_thumbnails/0412c2934214d85bf06dc42515ce5f29/thumb_300_425.webp",
            content: "https://download.tailieuvnu.com/uet/%C4%90%C3%A1p%20%C3%A1n%20tham%20kh%E1%BA%A3o%20N%E1%BB%99i%20dung%20%C3%B4n%20t%E1%BA%ADp%20K%E1%BB%B9%20Thu%E1%BA%ADt%20Hi%E1%BB%83n%20Th%E1%BB%8B%20M%C3%A1y%20T%C3%ADnh%20UET.pdf"
        },
        {
            title: "Destination C1&C2 Upper Intermediate Student Book + Key",
            author: {
                fullname: "Dam Tam Khoa",
                role: "STUDENT",
                avartar: "https://avatars.githubusercontent.com/u/72397589?v=4",
                createAt: "26/03/2021"
            },
            summary: "You need to grasp these skills to improve your IELTS Reading score. Let's read the following article!",
            code: "BLOG001",
            image: "https://d20ohkaloyme4g.cloudfront.net/img/document_thumbnails/ba3e01de8024c7ff3a5c1c58c157a20b/thumb_300_203.webp",
            content: "https://download.tailieuvnu.com/uet/%C4%90%C3%A1p%20%C3%A1n%20tham%20kh%E1%BA%A3o%20N%E1%BB%99i%20dung%20%C3%B4n%20t%E1%BA%ADp%20K%E1%BB%B9%20Thu%E1%BA%ADt%20Hi%E1%BB%83n%20Th%E1%BB%8B%20M%C3%A1y%20T%C3%ADnh%20UET.pdf"
        },
        {
            title: "Destination C1&C2 Upper Intermediate Student Book + Key",
            author: {
                fullname: "Dam Tam Khoa",
                role: "STUDENT",
                avartar: "https://avatars.githubusercontent.com/u/72397589?v=4",
                createAt: "26/03/2021"
            },
            summary: "You need to grasp these skills to improve your IELTS Reading score. Let's read the following article!",
            code: "BLOG001",
            image: "https://d20ohkaloyme4g.cloudfront.net/img/document_thumbnails/ba3e01de8024c7ff3a5c1c58c157a20b/thumb_300_203.webp",
            content: "https://download.tailieuvnu.com/uet/%C4%90%C3%A1p%20%C3%A1n%20tham%20kh%E1%BA%A3o%20N%E1%BB%99i%20dung%20%C3%B4n%20t%E1%BA%ADp%20K%E1%BB%B9%20Thu%E1%BA%ADt%20Hi%E1%BB%83n%20Th%E1%BB%8B%20M%C3%A1y%20T%C3%ADnh%20UET.pdf"
        }
    ];

    const onChangeContentDoc = (url_docs: string) => {
        console.log(url_docs);
        window.open(url_docs);
    }

    return <div className="udemy ">
        <TitleComponent type="Examination World" count_results={100} display={true} />
        <div className="library">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']}
                    onChange={onChangeCollapse} />
            </div>
            <div className="right">
                <>
                    {Array.from({ length: libraries.length }, (_, i) =>
                        <div className="library-item" key={i}>
                            <div style={{ textAlign: "center" }}>
                                <Image className="item-image"
                                    width={200}
                                    height={200}
                                    src={libraries[i].image}
                                />
                            </div>
                            <div className='item-detail' >
                                <h2 onClick={() => onChangeContentDoc(libraries[i].content)}>{libraries[i].title}</h2>
                                <p>{libraries[i].summary}</p>
                            </div>
                            <Comment
                                author={<a>{libraries[i].author.fullname}</a>}
                                avatar={
                                    <Avatar
                                        src={libraries[i].author.avartar}
                                        alt={libraries[i].author.fullname}
                                    />
                                }
                                content={''}
                            />
                        </div>
                    )}

                    <div className='paging'>
                        <Pagination
                            onChange={() => { console.log('123') }}
                            total={libraries.length / 3}
                            pageSize={3}
                        />
                    </div>
                </>
            </div>
        </div>
    </div>
}


export default LibraryComponent;