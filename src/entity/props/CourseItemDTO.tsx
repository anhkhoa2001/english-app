import { SectionItemDTO } from "./SectionDTO";

export interface CourseItemDTO {
    code: string;
    lectures?: number;
    type?: number;
    courseName: string,
    description: string,
    level: string,
    status: true,
    summary: string,
    thumbnail: string,
    createBy: string,
    createAt: Date,
    public: true,
    totalSub: number,
    rate?: number,
    sections: SectionItemDTO[]
}