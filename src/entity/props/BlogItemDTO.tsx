
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