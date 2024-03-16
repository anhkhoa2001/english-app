import { SectionItemDTO } from "./SectionDTO";

export class CourseItemDTO {
    code: string;
    lectures?: number;
    type?: number;
    courseName: string;
    description: string;
    level: string;
    status: true;
    summary: string;
    thumbnail: string;
    createBy: string;
    createAt: Date;
    public: true;
    totalSub: number;
    rate?: number;
    sections: SectionItemDTO[];

    constructor() {
        this.sections = []
    }
}