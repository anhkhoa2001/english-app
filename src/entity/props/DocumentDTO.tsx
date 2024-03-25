

export interface DocumentDTO {
    summary: string;
    documentId: number;
    documentName: string;
    createAt: Date;
    createBy: string;
    thumbnail: string;
    status: boolean;
    skill: string;
    topic: string;
    type: string;
    link: string;
    author: {
        fullname: string;
        avatar: string;
    };
}