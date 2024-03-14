
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

    constructor(parts: ExamPartDTO[]) {
        this.parts = parts;    
    }  

}

export class ExamPartDTO {
    id: number;
    partId: number;
    questions: QuestionDTO[];

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
}


export interface AnswerAttributeDTO {
    key: number;
    value: string;
    id?: number;
}