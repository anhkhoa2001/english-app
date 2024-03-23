
export class ExamDTO {
    examCode: string;
    examName: string;
    description: string;
    summary: string;
    skill: boolean;
    type: string;
    thumbnail: string;
    createBy: string;
    createAt: Date;
    status: boolean;
    parts: ExamPartDTO[];
    attendences: number;
    countdown: number;
    author: UserDTO;
    totalQuestion: number;

    constructor(parts: ExamPartDTO[]) {
        this.parts = parts;    
    }  

}

export class UserDTO {
    userId: string;
    createAt: Date;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    type: string;
    roleCode: string;
}

export class ExamPartDTO {
    id: number;
    partId: number;
    questions: QuestionDTO[];
    examCode?: string;

    constructor() {
        this.questions = [];
    }
}

export class QuestionDTO {
    questionId: number;
    type: string;
    content: string;
    questionChilds: QuestionItemDTO[];

    constructor() {
        this.questionChilds = [];
        this.questionId = 0;
    }
}

export interface QuestionItemDTO {
    item_id: number;
    hint: string;
    index: number;
    content: string;
    solution: string;
    type: string;
    answer: AnswerAttributeDTO[];
    output: string;
}


export interface AnswerAttributeDTO {
    key: number;
    value: string;
    id?: number;
}