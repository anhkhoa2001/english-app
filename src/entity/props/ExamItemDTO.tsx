export interface ExamItemDTO {
    title: string;
    author?: {
        fullname: string;
        role: string;
        avartar: string;
    };
    summary?: string;
    code: string;
    image?: string;
    type?: number;
}