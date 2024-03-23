import { ExamPartDTO } from "./ExamDTO";


export interface LessonDTO {
    lesson_id: number;
    lessionName: string;
    status: boolean;
    description: string,
    url_video: string,
    thumbnail: string,
    createBy: string,
    createAt: Date,
    type: string,
    examModel: ExamPartDTO,
    section_id: number;
}