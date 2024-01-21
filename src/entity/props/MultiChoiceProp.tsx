import { Answer } from "./Answer";

export interface MultiChoiceProp {
    index: number;
    hint: string;
    answers: Answer[]; 
    content: React.ReactNode;
    type: number,
    questionChilds?: MultiChoiceProp[]
}