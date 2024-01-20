import { Answer } from "./Answer";

export interface MultiChoiceProp {
    index: number;
    hint: string;
    answers: Answer[]; 
    content: string;
    containImage: boolean,
    type: number,
    questionChilds?: MultiChoiceProp[]
}