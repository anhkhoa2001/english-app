export class SectionItemDTO {
    sectionName: string;
    description: string;
    status: boolean;
    lessons: LessonDTO[];
    section_id: number;

    constructor() {
        this.lessons = [];
    }
}

export class LessonDTO {
    lesson_id: number;
    lessionName: string;
    status: boolean;
    thumbnail: string;
    url_video: string;
    description: string;
    create_by: string;
    create_at: Date;
}


export interface SectionDTO {
    courseCode: string;
    description: string;
    status: boolean;
    sectionName: number;
}