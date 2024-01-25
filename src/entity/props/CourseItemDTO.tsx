export interface CourseItemDTO {
    title: string;
    rating?: number;
    summary?: string;
    code: string;
    instructor?: string;
    total_hours?: number;
    lectures?: number;
    level?: string;
    image?: string;
    type?: number;
}