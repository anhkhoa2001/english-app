export interface SectionItemDTO {
    sectionName: string;
    description: string;
    status: boolean;
    lessons: any[];
    section_id: number;
}


export interface SectionDTO {
    courseCode: string;
    description: string;
    status: boolean;
    sectionName: number;
}