import { Avatar, Checkbox, CheckboxProps, Collapse, CollapseProps, Pagination } from 'antd';
import TitleComponent from '../TitleComponent';
import './css/BlogComponent.scss'
import { Comment } from '@ant-design/compatible';
import { BlogDTO, BlogItemDTO } from '../../../entity/props/BlogItemDTO';
import { useEffect, useRef, useState } from 'react';
import BlogItemComponent from './BlogItemComponent';
import { DataResponse, MessageResponse } from '../../../entity/response/MessageResponse';
import BlogService from '../../../service/BlogService';
import moment from 'moment';


const BlogComponent: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogDTO[]>([]);
    const totalRecord = useRef<number>(0);
    const pagination = useRef({
        page: 1,
        pageSize: 10
    });

    const onChangeSkill: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeEnglishBasic: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeEnglishFor: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeCollapse = (key: string | string[]) => {
        console.log(key);
    };

    const skills = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Listening</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Writing</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Reading</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeSkill}>Speaking</Checkbox>
        </>
    ];

    const englishBasic = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeEnglishBasic}>Pronunciation</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeEnglishBasic}>Grammary</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeEnglishBasic}>Vocabulary</Checkbox>
        </>
    ];

    const englishFor = [
        <>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeEnglishFor}>For NewBie</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeEnglishFor}>For Oversea Student</Checkbox>
            <Checkbox style={{ fontSize: '110%' }} onChange={onChangeEnglishFor}>For Working People</Checkbox>
        </>
    ];

    const getByCondition: (data: MessageResponse<DataResponse<BlogDTO[]>> | null) => void = (data) => {
        try {
            setBlogs(data?.data.data || []);
            totalRecord.current = data?.data.totalRecord || 0;
            console.log('data blogs', data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        BlogService.getByCondition(pagination.current, getByCondition);
    }, []);


    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Skill',
            children: skills,
        },
        {
            key: '2',
            label: "English Basic",
            children: englishBasic,
        },
        {
            key: '3',
            label: "English For",
            children: englishFor
        }
    ];

    // const blogs: BlogItemDTO[] = [
    //     {
    //         title: "Describe a time you wore a uniform for work or school - Bài mẫu IELTS Speaking",
    //         author: {
    //             fullname: "Dam Tam Khoa ",
    //             role: "STUDENT",
    //             avartar: "https://avatars.githubusercontent.com/u/72397589?v=4",
    //             createAt: "11/11/2024"
    //         },
    //         summary: "Hãy tham khảo bài mẫu 8.0+ chủ đề “Describe a time you wore a uniform for work or school” cho IELTS Speaking Part 2 và 3 nhé!",
    //         code: "BLOG001",
    //         image: "https://study4.com/media/examprep/Post/files/2024/01/18/Topic_Visual_Images_83.png",
    //         content: <>

    //             <div
    //                 id="post-content"
    //                 className="post-content md-content js-toc-content"
    //             >
    //                 <h1 style={{ textAlign: "center" }} id="">
    //                     <img
    //                         alt="các kỹ năng ielts reading"
    //                         src="https://lh7-us.googleusercontent.com/mQjgldxY9ci7dNfPqRhpXIbJoJU3LgDCJLZqIwUlAID8hshfvlIEjAtlhY8oRshztRoZquO1_RqQGwPqvM2FKA8QTTqLsIVPnkLYm1hY7qRiRaMm1a_l9oenPZNroCmrLQlvRfyxbG_jahh64F0nroA"
    //                         style={{ height: 351, width: 624 }}
    //                     />
    //                 </h1>
    //                 <p>
    //                     IELTS Reading là một trong bốn kỹ năng trong bài thi IELTS bên cạnh
    //                     Listening (Nghe), Writing (Viết) và Speaking (Nói). Để đạt được điểm cao
    //                     trong phần IELTS Reading, bạn không chỉ cần có kiến thức tiếng Anh vững vàng
    //                     mà còn cần áp dụng những chiến thuật làm bài thông minh. Dưới đây, STUDY4 sẽ
    //                     chia sẻ cho bạn những cách tăng band điểm nhanh nhất cho phần thi “tưởng dễ
    //                     mà khó” này.
    //                 </p>
    //                 <h2 id="i.-giới-thiệu-chung-về-ielts-reading">
    //                     <strong>I. Giới thiệu chung về IELTS Reading</strong>
    //                 </h2>
    //                 <p>
    //                     <strong>Phần thi IELTS Reading</strong> trong bài kiểm tra IELTS (bài kiểm
    //                     tra về khả năng sử dụng ngôn ngữ tiếng Anh) là phần thi được thiết kế để
    //                     đánh giá khả năng đọc hiểu và xử lý thông tin bằng tiếng Anh của thí sinh.
    //                 </p>
    //                 <p>
    //                     <strong>
    //                         <em>Xem thêm: </em>
    //                     </strong>
    //                     <a
    //                         href="https://study4.com/posts/298/cac-dang-bai-ielts-reading-cach-lam-va-tip-lam-bai-hieu-qua/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <em>
    //                                     <u>Các dạng bài IELTS Reading - Cách làm và tip làm bài hiệu quả</u>
    //                                 </em>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                 </p>
    //                 <p>
    //                     Ở phần thi này, thí sinh được yêu cầu đọc 3 văn bản (khoảng 700 - 1000 từ
    //                     mỗi đoạn) sau đó trả lời các câu hỏi liên quan, thường xoay quanh các lĩnh
    //                     vực học thuật và chuyên ngành.
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         alt="cách làm ielts reading"
    //                         src="https://lh7-us.googleusercontent.com/NENbRjfpeH35FtumNINpMch5hA9ZBROhyhh-PCFUHhsSxnNVB7rfBp2hdzMDCOBircrKoCWZB70cYJkDz-2anGAIl1a17lDBXip4yA1YFdIUWt2Omg5MaXZPAtchzn1qsph1K6u2DPydljdBuNp1udY"
    //                         style={{ height: 301, width: 602 }}
    //                     />
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <em>Cách làm IELTS Reading</em>
    //                 </p>
    //                 <p>
    //                     <strong>Đặc điểm chung cần lưu ý</strong>
    //                 </p>
    //                 <ul>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Thứ tự thi</strong>: Phần thi IELTS Reading diễn ra thứ hai, sau
    //                         phần thi IELTS Listening
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Số câu hỏi</strong>: Phần thi có 40 câu hỏi chia thành 3 đoạn văn
    //                         (3 passages) với độ khó tăng dần theo từng passage.
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Các dạng câu hỏi</strong>: Các dạng câu hỏi có thể xuất hiện bao
    //                         gồm Multiple choice, Sentence Completion, Matching headings, True/ False/
    //                         Not Given, v.v.&nbsp;
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Thời gian làm bài</strong>: Thí sinh có tổng cộng 60 phút để đọc
    //                         và làm bài cho cả ba đoạn văn. (Không có thời gian chuyển đáp án giống
    //                         phần thi Listening)
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Kiến thức và từ vựng</strong>: Yêu cầu thí sinh có vốn từ vựng
    //                         phong phú và khả năng xử lý thông tin trong nhiều lĩnh vực chuyên ngành
    //                         khác nhau.
    //                     </li>
    //                 </ul>
    //                 <h2 id="ii.-các-phương-pháp-làm-ielts-reading">
    //                     <strong>II. Các phương pháp làm IELTS Reading</strong>
    //                 </h2>
    //                 <p>
    //                     Bên cạnh nền tảng từ vựng và ngữ pháp vững chắc, bạn chắc chắn cũng cần
    //                     trang bị một số kỹ năng cần thiết khác nếu muốn đạt được band điểm tuyệt đối
    //                     trong bài thi IELTS Reading. Sau đây, STUDY4 sẽ gợi ý cho bạn một số cách
    //                     làm IELTS Reading để đạt band điểm cao nhé.&nbsp;
    //                 </p>
    //                 <h3 id="1.-kỹ-năng-skimming-đọc-lướt">
    //                     <span style={{ fontSize: 20 }}>
    //                         <strong>1. Kỹ năng Skimming (Đọc lướt)</strong>
    //                     </span>
    //                 </h3>
    //                 <p>
    //                     Trong quá trình làm bài thi IELTS Reading, một trong những kỹ năng quan
    //                     trọng và hữu ích&nbsp; thường xuyên được đề cập đến là<strong> </strong>
    //                     <a
    //                         href="https://study4.com/posts/263/ky-nang-skimming-va-scanning-bao-boi-cho-moi-de-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <u>kỹ năng Skimming</u>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                     .
    //                 </p>
    //                 <p>
    //                     <strong>Skimming </strong>là khả năng đọc nhanh và lướt nhằm nắm được tổng
    //                     quan nội dung của đoạn văn bằng cách tập trung vào tiêu đề, tiêu đề phụ, câu
    //                     chủ đề, câu đầu tiên và câu cuối cùng của đoạn văn.
    //                 </p>
    //                 <p>
    //                     Kỹ thuật này không chỉ giúp thí sinh hiểu rõ ý chính toàn bài mà còn rất hữu
    //                     ích trong việc hoàn thành những câu hỏi mang tính tổng quát thuộc các dạng
    //                     bài như{" "}
    //                     <a
    //                         href="https://study4.com/posts/331/dang-bai-matching-headings-meo-hay-dat-tron-diem-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <em>
    //                                     <u>Matching Headings</u>
    //                                 </em>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                     <em>, </em>
    //                     <a
    //                         href="https://study4.com/posts/329/dang-bai-multiple-choice-meo-lam-bai-dat-diem-cao-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <em>
    //                                     <u>Multiple Choice Questions - MCQs</u>
    //                                 </em>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                     <strong>
    //                         <em> </em>
    //                     </strong>
    //                     hay<strong> </strong>
    //                     <a
    //                         href="https://study4.com/posts/354/dang-bai-summary-completion-cach-xu-ly-cau-hoi-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <em>
    //                                     <u>Summary Completion</u>
    //                                 </em>
    //                             </strong>
    //                         </span>
    //                     </a>{" "}
    //                     một cách nhanh chóng và hiệu quả.&nbsp;
    //                 </p>
    //                 <p>
    //                     <strong>
    //                         <em>
    //                             Ví dụ: Dạng bài Matching Headings - một dạng bài được coi là “ác mộng”
    //                             của rất nhiều thí sinh.
    //                         </em>
    //                     </strong>
    //                     <em>&nbsp;</em>
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         alt="ví dụ ielts reading "
    //                         src="https://lh7-us.googleusercontent.com/-n5RUlx4jJKa-5yEyydNsH34409HilUFN6nRB8XxanDW1UQn34NqFrYYJv5300WZA_RiyWxq3pkFsw-SglXeXUyT5s_aCDXJxQ_duaCQ5rpArcg-nTPRQ1826sW3hphLklB-Zcn6EgE5pozveUSv7zM"
    //                         style={{ height: 409, width: 538 }}
    //                     />
    //                 </p>
    //                 <p>
    //                     Matching Headings yêu cầu thí sinh phải tìm được tiêu đề phù hợp cho từng
    //                     đoạn văn. Trong khoảng thời gian 20 phút (trung bình mỗi passage), nếu không
    //                     áp dụng phương pháp Skimming thì bạn sẽ khó có thể hoàn thành đúng hết bài
    //                     tập đó và gần như không có thời gian hoàn thành các dạng bài sau.&nbsp;
    //                 </p>
    //                 <p>
    //                     Tuy nhiên, nếu đã thành thạo trong việc sử dụng Skimming, tập trung đọc các
    //                     ý chính, tiêu đề có thể giúp thí sinh nhanh chóng nắm bắt được nội dung
    //                     chính, từ đó tìm tiêu đề phù hợp dễ dàng hơn.
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         alt="kỹ năng skimming ielts reading"
    //                         src="https://lh7-us.googleusercontent.com/qpSelIa5UdJxW0C_zRLLR00BRfuJ_Yckba-vIhV8rNJuAK2_szlVpVkkq8mZgCuCkmwLcwy_cp4_LUDQucKY31ofkIrJLomkYA2TT6kat5e8Yz74tuYoutBYp0hPco-i0mzBln2QpRRAPvCvEVRHPDY"
    //                         style={{ height: 384, width: 547 }}
    //                     />
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <em>Luyện tập Skimming trong IELTS Reading&nbsp;</em>
    //                 </p>
    //                 <p>
    //                     <strong>*Lưu ý</strong>: Skimming tập trung vào ý chính, nội dung tổng thể
    //                     của từng đoạn văn, nên đừng quá lưu tâm vào việc đọc và hiểu được từng câu
    //                     chữ trong đoạn văn.&nbsp;
    //                 </p>
    //                 <p>
    //                     Hơn nữa, ý chính có thể xuất hiện ở mọi vị trí: câu đầu tiên, giữa đoạn văn
    //                     hay ở cuối đoạn, nên hãy phân bổ thời gian đọc lướt hợp lý, đừng quá tập
    //                     trung vào một vị trí.
    //                 </p>
    //                 <h3 id="2.-kỹ-năng-scanning-đọc-tìm-thông-tin-chi-tiết">
    //                     <span style={{ fontSize: 20 }}>
    //                         <strong>2. Kỹ năng Scanning (Đọc tìm thông tin chi tiết)</strong>
    //                     </span>
    //                 </h3>
    //                 <p>
    //                     Một cách làm IELTS Reading tiếp theo cũng quan trọng không kém đó chính là
    //                     Scanning. Thay vì tập trung vào ý chính như kỹ năng Skimming,{" "}
    //                     <a
    //                         href="https://study4.com/posts/263/ky-nang-skimming-va-scanning-bao-boi-cho-moi-de-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <u>Scanning</u>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                     <strong> </strong>được sử dụng khi bạn muốn tìm kiếm thông tin chi tiết
    //                     trong bài.
    //                 </p>
    //                 <p>
    //                     Thông thường, sau khi sử dụng Skimming để hiểu và nắm được ý chính của đoạn
    //                     văn, bạn sẽ tiếp tục sử dụng Scanning để định vị nhanh chóng các thông tin
    //                     quan trọng trong văn bản, hỗ trợ trong việc trả lời các câu hỏi chi
    //                     tiết.&nbsp;
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         alt="kỹ năng scanning ielts reading"
    //                         src="https://lh7-us.googleusercontent.com/YYvTrueML-kUZ2Co6fRUP3gF-b5hFc7euYpHiALXfs0DVHZ33NOCybFpBpGKPMdv8EVrJBHpxnY0K8kKVKZIARJ3K8kDu00qOjQZjohSpG96lxRXUSGQUDV23gDubH1XkljbGrQVwLhkZh5Cn4LHuWs"
    //                         style={{ height: 286, width: 534 }}
    //                     />
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <em>Kỹ năng Scanning trong IELTS Reading&nbsp;</em>
    //                 </p>
    //                 <p>
    //                     Scanning được ứng dụng trong các dạng bài như{" "}
    //                     <a
    //                         href="https://study4.com/posts/329/dang-bai-multiple-choice-meo-lam-bai-dat-diem-cao-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <em>
    //                                     <u>Multiple Choice Questions - MCQs</u>
    //                                 </em>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                     <em>, </em>
    //                     <a
    //                         href="https://study4.com/posts/449/dang-bai-short-answer-questions-cach-lay-tron-diem-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <u>Short Answer Question</u>
    //                             </strong>
    //                         </span>
    //                     </a>{" "}
    //                     hay{" "}
    //                     <a
    //                         href="https://study4.com/posts/330/dang-bai-true-false-not-given-va-yes-no-not-given-tip-chi-tiet-chiem-tron-diem-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <u>Yes/No/Not Given (Y/N/NG) hoặc True/False/Not Given (T/F/NG)</u>
    //                             </strong>
    //                         </span>
    //                     </a>{" "}
    //                     bởi Scanning rất hữu ích khi muốn nhanh chóng xác định và trích thông tin
    //                     chi tiết từ văn bản, giúp thí sinh nắm bắt các từ ngữ mấu chốt một cách hiệu
    //                     quả.
    //                 </p>
    //                 <p>
    //                     <strong>
    //                         <em>Xem thêm: </em>
    //                     </strong>
    //                     <a
    //                         href="https://study4.com/posts/263/ky-nang-skimming-va-scanning-bao-boi-cho-moi-de-ielts-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <em>
    //                                     <u>
    //                                         Kỹ năng Skimming và Scanning - Bảo bối cho mọi đề IELTS Reading
    //                                     </u>
    //                                 </em>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                 </p>
    //                 <p>
    //                     <strong>
    //                         <em>
    //                             Ví dụ: Dạng bài Yes/No/Not Given (Y/N/NG) hoặc True/False/Not Given
    //                             (T/F/NG)
    //                         </em>
    //                     </strong>
    //                 </p>
    //                 <p>
    //                     <em>
    //                         Đối với dạng bài True/False/Not Given, tính đúng/ sai của các câu đôi khi
    //                         chỉ được xác định bằng một từ ngữ duy nhất. Nếu chỉ tập trung vào việc đọc
    //                         lướt tìm hiểu ý chính đoạn văn, bạn sẽ có thể bỏ lỡ những từ ngữ then chốt
    //                         để xác định tính chính xác của câu. Vì vậy, ứng dụng Scanning sẽ giúp bạn
    //                         nhanh chóng tìm ra được câu trả lời mà không tốn quá nhiều thời
    //                         gian.&nbsp;
    //                     </em>
    //                 </p>
    //                 <h3 id="3.-kỹ-năng-đoán-từ-guess-unknown-words">
    //                     <span style={{ fontSize: 20 }}>
    //                         <strong>3. Kỹ năng đoán từ (Guess unknown words)</strong>
    //                     </span>
    //                 </h3>
    //                 <p>
    //                     Chắc chắn, bạn khó có thể hiểu hết hoàn toàn các từ vựng xuất hiện trong bài
    //                     thi IELTS dù sở hữu vốn từ vựng đa dạng. Trong tình huống này, một mẹo quan
    //                     trọng bạn có thể thử sử dụng đó là kỹ năng "đoán từ" dựa trên ngữ
    //                     nghĩa.&nbsp;
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         alt="cách đoán từ ielts reading"
    //                         src="https://lh7-us.googleusercontent.com/ckKgfdC0e-FvCBNPCLvq_9-AfTivoYn2rl4uKPxELL0XzBkxbf4S-n4Rt_6dbhhuiqxWhNpa4l8bFV3_H6lQHK0PZ6my8D6gEJsYpyFIs5WmIm8AvqxeU9R2TC6u97ofaGCUzLBdpUlC-CzenYXsZEc"
    //                         style={{ height: 337, width: 602 }}
    //                     />
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <em>Cách đoán từ trong IELTS Reading&nbsp;</em>
    //                 </p>
    //                 <p>
    //                     <strong>
    //                         Quy trình này có thể thực hiện qua hai bước chi tiết dựa vào 2 kỹ năng
    //                         trên:
    //                     </strong>
    //                 </p>
    //                 <p>
    //                     <strong>Bước 1 - Skimming</strong>: Xác định chủ đề của đoạn văn bằng cách
    //                     quan sát câu đầu và câu cuối. Nếu đoạn văn đề cập đến những sự sai lầm, thì
    //                     có thể dự đoán rằng các từ trong đoạn có thể mang tính tiêu cực. Hoặc nếu
    //                     đoạn văn có nhắc đến nhiều thành tựu, có thể các từ trong đoạn mang sắc thái
    //                     tự hào, vui vẻ, chúc mừng.&nbsp;
    //                 </p>
    //                 <p>
    //                     <strong>Bước 2 - Scanning</strong>: Sau đó, hãy quan sát kỹ các từ xung
    //                     quanh để dự đoán ý nghĩa của từ vựng đó, có thể dựa vào chủ đề chung hay ngữ
    //                     cảnh của bài đọc hoặc riêng đoạn văn đó.&nbsp;
    //                 </p>
    //                 <p>
    //                     Ghi nhớ, đừng vội bỏ qua, cũng đừng đoán mò nếu gặp một từ vựng lạ. Bạn hãy
    //                     vận dụng các kiến thức và kỹ năng của bản thân để đoán nghĩa của chúng, tăng
    //                     thêm cơ hội đạt điểm cao trong phần thi IELTS Reading.&nbsp;
    //                 </p>
    //                 <h3 id="4.-kỹ-năng-paraphrase-bằng-từ-đồng-nghĩa-synonyms-và-từ-trái-nghĩa-antonyms">
    //                     <span style={{ fontSize: 20 }}>
    //                         <strong>
    //                             4. Kỹ năng paraphrase bằng từ đồng nghĩa (Synonyms) và từ trái nghĩa
    //                             (Antonyms)
    //                         </strong>
    //                     </span>
    //                 </h3>
    //                 <p>
    //                     <a
    //                         href="https://study4.com/posts/688/paraphrase-la-gi-5-cach-paraphrase-sau-trong-ielts/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <u>Kỹ năng paraphrase</u>
    //                             </strong>
    //                         </span>
    //                     </a>{" "}
    //                     là kỹ năng quan trọng tiếp theo cần có nếu bạn muốn đạt điểm cao trong bài
    //                     thi IELTS Reading.
    //                 </p>
    //                 <p>
    //                     <strong>Paraphrase </strong>yêu cầu thí sinh có khả năng hiểu ngữ nghĩa và
    //                     sở hữu vốn từ vựng phong phú để tìm kiếm các từ đồng nghĩa hoặc trái nghĩa.
    //                     Đặc điểm chính của phương pháp này là nắm bắt cách tác giả "paraphrase"
    //                     thông tin, tức là diễn đạt lại ý nghĩa bằng các từ ngữ khác nhau. Kỹ năng
    //                     này giúp thí sinh dễ dàng đối chiếu thông tin giữa câu hỏi và đoạn văn.
    //                 </p>
    //                 <p>
    //                     <strong>
    //                         <em>Xem thêm: </em>
    //                     </strong>
    //                     <a
    //                         href="https://study4.com/posts/688/paraphrase-la-gi-5-cach-paraphrase-sau-trong-ielts/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <em>
    //                                     <u>Paraphrase là gì? 5 cách Paraphrase sau trong IELTS</u>
    //                                 </em>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         alt="kỹ năng paraphrase ielts"
    //                         src="https://lh7-us.googleusercontent.com/3cHBJtGwGhJOsaaGfefOCNngWK-RVPSraHpegV6Dyi7cvcSuUFIUMSTBmB-xsbcwz3o-L0GFM-l2D6mhnPdfx4FQY7hcMJ0kGcIma3RAvhY5x1ZJej6bx-nxQGa12G6Q0h6RFBF823M7v5uOZ_Wc0Ek"
    //                         style={{ height: 348, width: 500 }}
    //                     />
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <em>Kỹ năng Paraphrase trong Reading</em>
    //                 </p>
    //                 <p>
    //                     Khi đã hiểu rõ cách paraphrase mà tác giả đã áp dụng, thí sinh có thể dễ
    //                     dàng nhận biết đề bài đã được biến đổi thông tin như nào, sử dụng từ đồng
    //                     nghĩa hay từ trái nghĩa.
    //                 </p>
    //                 <p>
    //                     Mặc dù điều này có thể tương đối khó khăn khi không phải lúc nào thông tin
    //                     cũng được viết lại giống hoàn toàn với câu trong đoạn văn, tuy nhiên điều
    //                     này có thể được cải thiện thông qua luyện tập và rèn luyện các kỹ năng
    //                     thường xuyên.
    //                 </p>
    //                 <h3 id="5.-kỹ-năng-đọc-kỹ-từng-chi-tiết-read-in-details">
    //                     <span style={{ fontSize: 20 }}>
    //                         <strong>5. Kỹ năng đọc kỹ từng chi tiết (Read in details)</strong>
    //                     </span>
    //                 </h3>
    //                 <p>
    //                     Sau khi áp dụng tất cả các kỹ năng trên, kỹ năng Read in details đã trở
    //                     thành chìa khóa then chốt đối với những bạn có mong muốn đạt band điểm
    //                     Reading tuyệt đối.
    //                 </p>
    //                 <p>
    //                     <strong>Trình tự làm bài IELTS Reading sẽ diễn ra như sau:</strong>
    //                 </p>
    //                 <p>
    //                     <strong>Skimming </strong>để hiểu ý chính toàn bài/ từng đoạn →{" "}
    //                     <strong>Scanning </strong>để xác định vùng thông tin/ các từ vựng chi tiết →{" "}
    //                     <strong>Guess unknown words</strong> + <strong>Paraphrase </strong>để nắm
    //                     bắt chính xác thông tin hơn → <strong>Read in details</strong> để đọc hiểu
    //                     rõ ý nghĩa mà tác giả muốn truyền đạt qua đoạn văn đó.&nbsp;
    //                 </p>
    //                 <p>
    //                     Nếu thí sinh có kiến thức từ vựng phong phú, họ có thể dịch câu văn sang
    //                     tiếng Việt để hiểu sâu hơn về ý nghĩa của câu đó, tuy nhiên STUDY4 không quá
    //                     khuyến khích bạn làm vậy trừ khi bạn có khả năng đọc hiểu và dịch nghĩa
    //                     nhanh chóng.&nbsp;
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         src="https://lh7-us.googleusercontent.com/mGUTgFXjFOfNo6AoNAQjortKo_qOgtr-J37aqE_vDlhyyNh45qiwL-cGF8nd6o4kjP704Tmwq7ZD_dTCOPgK4N1NHieZ5KkTMewl0y7aCVcSJrdh8zlW3a_hk8ET644nur5OjuRMEDxcVGGCWyPRsZE"
    //                         style={{ height: 344, width: 585 }}
    //                     />
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <em>Đọc chi tiết bài đọc IELTS</em>
    //                 </p>
    //                 <p>
    //                     Kỹ năng này thường được đánh giá cao vì nó được áp dụng trong tất cả các
    //                     dạng bài phổ biến trong IELTS Reading. Để áp dụng{" "}
    //                     <strong>Read in details</strong> một cách hiệu quả, thí sinh cần có vốn từ
    //                     vựng và ngữ pháp đa dạng và chính xác, điều mà chỉ có thể đạt được thông qua
    //                     rèn luyện chăm chỉ và kiên trì.&nbsp;
    //                 </p>
    //                 <h2 id="iii.-mẹo-làm-ielts-reading-đạt-điểm-cao">
    //                     <strong>III. Mẹo làm IELTS Reading đạt điểm cao</strong>
    //                 </h2>
    //                 <p>
    //                     Để đạt được điểm cao trong phần IELTS Reading, việc rèn luyện các kỹ năng
    //                     thường xuyên đóng vai trò rất quan trọng. Một số tips làm IELTS Reading bạn
    //                     có thể thử áp dụng để tăng band điểm của mình gồm:
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <img
    //                         src="https://lh7-us.googleusercontent.com/OgD0kGdEvg4EjG2EW2aQZSiNy27j1EJi4LRL54Fl76Lze6Y1sEJ20rtgLWVBH3XNuWNwJPVVUJs2Ix2r98jnz6GBOwBxkIj8XQKDyaSO8zLvin-u4CiVW0bs7hm4LbOCBnFasNYlp9pEwe16j0a7Tsc"
    //                         style={{ height: 313, width: 557 }}
    //                     />
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <em>Tips làm bài IELTS Reading&nbsp;</em>
    //                 </p>
    //                 <ul>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Mở rộng vốn từ vựng</strong>: Học từ vựng trong các chủ đề chuyên
    //                         sâu và chủ đề thường gặp trong bài thi IELTS. Đặc biệt, hãy chú ý cả đến
    //                         các từ ngữ đồng nghĩa và trái nghĩa.
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Luyện kỹ năng Skimming</strong>: Thực hành đọc nhanh để có cái
    //                         nhìn tổng quan về nội dung của đoạn văn. Tập trung vào việc tìm hiểu vị
    //                         trí của các chi tiết chính và cấu trúc của đoạn văn.
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Luyện kỹ năng Scanning</strong>: Làm nhiều bài tập thường xuyên để
    //                         giúp bạn “scan” nhanh thông tin và xác định vị trí cụ thể của chúng.
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Thực hành kỹ năng Paraphrasing</strong>: Tập trung vào việc diễn
    //                         đạt lại ý nghĩa của các câu và đoạn văn bằng cách sử dụng từ đồng nghĩa,
    //                         trái nghĩa hoặc câu bị động.&nbsp;
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Thực hành kỹ năng đoán từ</strong>: Luyện tập đoán nghĩa của từ
    //                         không quen thông qua ngữ cảnh và các từ xung quanh, sau đó kiểm tra nghĩa
    //                         đúng và học từ.&nbsp;
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Đọc nhiều thể loại văn bản</strong>: Tham khảo và đọc nhiều loại
    //                         văn bản, từ bài phân tích học thuật đến bài báo hàng ngày để làm quen với
    //                         cách biểu đạt thông tin trong từng ngữ cảnh khác nhau.
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Thực hiện các bài test IELTS Reading</strong>: Hiện nay trên
    //                         STUDY4 đang cung cấp rất nhiều các bộ đề ôn luyện IELTS Reading uy tín như
    //                         bộ IELTS Cambridge 7 - 18, IELTS Trainer, IELTS Plus,... với giao diện thi
    //                         sát với kỳ thi IELTS thực tế. Đặc biệt, các bài thi thử trên STUDY4 đều
    //                         được cung cấp miễn phí.
    //                     </li>
    //                     <li style={{ listStyleType: "disc" }}>
    //                         <strong>Giữ lịch trình ôn luyện đều đặn</strong>: Phân chia thời gian ôn
    //                         tập thành các phần nhỏ để duy trì sự tập trung và giữ động lực.
    //                     </li>
    //                 </ul>
    //                 <p>
    //                     Ngoài ra, bạn cũng có thể lựa chọn<strong> </strong>
    //                     <a
    //                         href="https://study4.com/courses/22/ielts-intensive-vocabulary-reading/"
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <span style={{ color: "#1155cc" }}>
    //                             <strong>
    //                                 <u>khóa học IELTS Intensive Reading</u>
    //                             </strong>
    //                         </span>
    //                     </a>
    //                     <strong> của STUDY4</strong> để có một lộ trình học cụ thể và hiệu quả nhất.
    //                 </p>
    //                 <p>
    //                     <strong>
    //                         Khóa học này sẽ giúp bạn xây dựng một phương pháp làm bài hợp lý, cung cấp
    //                         từ vựng và paraphrase dựa trên bộ sách IELTS Cambridge 7 - 18 uy tín. Tất
    //                         cả các bài học đều được xây dựng một cách bài bản và khoa học, đảm bảo các
    //                         sĩ tử IELTS có thể đạt được tối thiểu 7.0+ IELTS Reading.
    //                     </strong>
    //                 </p>
    //                 <p>
    //                     <span style={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}>🎯</span>
    //                     <em>Dành cho các bạn từ band 4.0 trở lên target 7.0+ IELTS Reading</em>
    //                     <br />
    //                     <span style={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}>💡</span>
    //                     <em>
    //                         10 giờ học video bài giảng và 200h clip chữa đề chi tiết các bộ đề thi
    //                     </em>
    //                     <br />
    //                     <span style={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}>📝</span>
    //                     <em>
    //                         Nắm trọn 4000 từ vựng có xác suất 99% sẽ xuất hiện trong phần thi IELTS
    //                         Reading và Listening tổng hợp từ đề thi thật
    //                     </em>
    //                 </p>
    //                 <p>
    //                     <a
    //                         href="https://study4.com/courses/22/ielts-intensive-vocabulary-reading/"
    //                         style={{
    //                             boxSizing: "border-box",
    //                             color: "rgb(33, 50, 97)",
    //                             textDecoration: "none",
    //                             backgroundColor: "rgb(255, 255, 255)",
    //                             cursor: "pointer",
    //                             fontFamily: "Roboto, Arial, sans-serif",
    //                             fontSize: 16,
    //                             fontStyle: "normal",
    //                             fontVariantLigatures: "normal",
    //                             fontVariantCaps: "normal",
    //                             fontWeight: 400,
    //                             letterSpacing: "normal",
    //                             orphans: 2,
    //                             textIndent: 0,
    //                             textTransform: "none",
    //                             widows: 2,
    //                             wordSpacing: 0,
    //                             WebkitTextStrokeWidth: 0,
    //                             whiteSpace: "normal",
    //                             textAlign: "center"
    //                         }}
    //                     >
    //                         <img
    //                             src="https://study4.com/media/uploads/editor/hangbm.study4/2024/01/08/study4-4.gif"
    //                             style={{
    //                                 borderStyle: "none",
    //                                 boxSizing: "border-box",
    //                                 display: "block",
    //                                 height: 84,
    //                                 margin: "1rem auto",
    //                                 maxWidth: "100%",
    //                                 verticalAlign: "middle",
    //                                 width: 600
    //                             }}
    //                         />
    //                     </a>
    //                 </p>
    //                 <p style={{ textAlign: "center" }}>
    //                     <iframe
    //                         frameBorder={0}
    //                         height={315}
    //                         src="https://www.youtube.com/embed/JprBzg6V2go?si=BU79wgyMJbUauA1k"
    //                         style={{
    //                             boxSizing: "border-box",
    //                             color: "rgb(26, 26, 26)",
    //                             fontFamily: "Roboto, Arial, sans-serif",
    //                             fontSize: 16,
    //                             fontStyle: "normal",
    //                             fontVariantLigatures: "normal",
    //                             fontVariantCaps: "normal",
    //                             fontWeight: 400,
    //                             letterSpacing: "normal",
    //                             orphans: 2,
    //                             textAlign: "center",
    //                             textIndent: 0,
    //                             textTransform: "none",
    //                             widows: 2,
    //                             wordSpacing: 0,
    //                             WebkitTextStrokeWidth: 0,
    //                             whiteSpace: "normal",
    //                             backgroundColor: "rgb(255, 255, 255)",
    //                             textDecorationThickness: "initial",
    //                             textDecorationStyle: "initial",
    //                             textDecorationColor: "initial"
    //                         }}
    //                         title="YouTube video player"
    //                         width={560}
    //                     />
    //                 </p>
    //                 <h2 id="lời-kết">
    //                     <strong>Lời kết</strong>
    //                 </h2>
    //                 <p>
    //                     Trên đây, STUDY4 đã chia sẻ cho bạn Các phương pháp làm IELTS Reading và các
    //                     mẹo cần nhớ để đạt band điểm cao rồi đó.&nbsp;
    //                 </p>
    //                 <p>
    //                     Nếu bạn có bất kỳ thắc mắc hay câu hỏi nào, hãy bình luận bên dưới để STUDY4
    //                     giải đáp cho bạn nhé!
    //                 </p>
    //             </div>

    //         </>

    //     }
    // ];


    const [displayContent, setDisplayContent] = useState(false);
    const [indexBlog, setIndexBlog] = useState(0);

    const onChangeClickToItem = (code: number, index: number) => {
        setDisplayContent(true);
        setIndexBlog(index);
    }

    return <div className="udemy ">
        <TitleComponent type="All Blogs" count_results={100} display={false} />
        <div className="blog">
            <div className="left">
                <Collapse items={items}
                    bordered={false}
                    defaultActiveKey={['1']}
                    onChange={onChangeCollapse} />
            </div>
            <div className="right">
                {displayContent ?
                    <BlogItemComponent blog={blogs[indexBlog]} />
                    :
                    <>
                        {Array.from({ length: blogs.length }, (_, i) =>
                            <div className="blog-item" onClick={() => onChangeClickToItem(blogs[i].blogId, i)} key={i}>
                                <img className="item-image" src={blogs[i].thumbnail} alt="" />
                                <div className='item-detail'>
                                    <h2>{blogs[i].title}</h2>
                                    <p>{blogs[i].summary}</p>
                                    <Comment
                                        author={<a>{blogs[i].author.fullname}</a>}
                                        avatar={
                                            <Avatar
                                                src={blogs[i].author.avatar}
                                                alt={blogs[i].author.fullname}
                                            />
                                        }
                                        content={moment(blogs[i].createAt, 'x').format('DD-MM-YYYY')}
                                    />
                                </div>
                            </div>
                        )}

                        <div className='paging'>
                            <Pagination
                                onChange={() => { console.log('123') }}
                                total={totalRecord.current}
                                pageSize={10}
                            />
                        </div>
                    </>}
            </div>
        </div>
    </div>

}


export default BlogComponent;