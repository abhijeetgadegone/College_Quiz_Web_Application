export interface Test {
    id: number;
    title: string;
    description: string;
    time: number;
    published: boolean;
  }
  
  export interface Question {
    id: number;
    questionText: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: string;
  }
  