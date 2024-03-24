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


export class ExamHistoryDTO {
    historyId: number;
    implementer: string;
    createTime: Date;
    executeTime: number;
    json: string;
    examCode: string;
    result: string;
}