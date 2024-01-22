export interface LibraryItemDTO {
    title: string;
    summary: string;
    code: string;
    image: string;
    author: {
        fullname: string;
        role: string;
        avartar: string;
        createAt: string;
    };
    content: string;
}