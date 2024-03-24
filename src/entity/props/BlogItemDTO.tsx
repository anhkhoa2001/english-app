
export interface BlogItemDTO {
    title: string;
    author: {
        fullname: string;
        role: string;
        avartar: string;
        createAt: string;
    };
    summary: string;
    code: string;
    image: string;
    content: React.ReactNode
}


export interface BlogDTO {
    title: string;
    summary: string;
    blogId: number;
    image: string;
    content: string;
    createAt: Date;
    createBy: string;
    thumbnail: string;
    status: boolean;
    skill: string;
    englishBasic: string;
    englishFor: string;
    author: {
        fullname: string;
        avatar: string;
    };
}