


export class CommentDTO {
    hasChild: boolean;
    commentId: number;
    childrens: CommentDTO[];
    content: string;
    refId: number;
    entityRef: string;
    name: string;
    avatar: string;
    sendTime: Date;
    parentId: number;
}

